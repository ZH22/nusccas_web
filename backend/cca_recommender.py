# Note: The below code is ran in a Lightning AI Studio (on GPU) when an API call is sent after a user completes/updates onboarding process
# (transformers and supabase libraries installed in Lightning AI Studio)

import litserve as ls
from transformers import pipeline
import os
import pandas as pd
from supabase import create_client
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware

class ModelAPI(ls.LitAPI):
    def setup(self, device):
        self.classifier = pipeline("zero-shot-classification", model="facebook/bart-large-mnli", device=device)

    def decode_request(self, request):
        return request["user_id"]

    def predict(self, x):
        url = os.getenv("SUPABASE_URL")
        #key = os.getenv("SUPABASE_KEY")
        key = os.getenv("SUPABASE_SERVICE_ROLE_KEY")        
        supabase = create_client(url, key)

        # Retrieving user data from Supabase
        response = (
            supabase.table("profiles")
            .select("race, religion, majors, minors, ccas, interests")
            .eq("id", x)
            .execute()
        )

        user_tags = []

        for item in response.data:
            for val in item.values():
                if not val or (val in ["Others", "Secret", "None"]):
                    continue
                elif isinstance(val, list):
                    user_tags.extend(val)
                elif isinstance(val, str):
                    user_tags.append(val)

        print("User tags: ", user_tags)

        # Retrieving CCA data from Supabase
        response = (
            supabase.table("cca_data")
            .select("name, description")
            .execute()
        )

        df = pd.DataFrame(response.data)
        df['combined_cca_data'] = ("Name: " + df['name'] + "." +
                                " Description: " + df['description'].str[:1000].str.replace("\n", " "))

        all_ccas_data = df["combined_cca_data"].tolist()
        # combining all combined CCA data to make zero shot classification task parallelizable for faster result using GPU

        print("Running model now")
        results = self.classifier(all_ccas_data, user_tags, multi_label=True)

        def get_scores(result):
            return dict(zip(result["labels"], result["scores"]))

        df["tag_scores"] = [get_scores(res) for res in results]

        def rank_ccas(df, user_tags):
            modified_tag_scores = []

            # storing the highest score for each tag across all CCAs
            best_per_tag = {tag: 0 for tag in user_tags}
            for index, row in df.iterrows():
                tag_scores = row["tag_scores"]
                for tag in user_tags:
                    best_per_tag[tag] = max(best_per_tag[tag], tag_scores.get(tag, 0))

            # modifying score
            for index, row in df.iterrows():
                tag_scores = row["tag_scores"]
                adjusted = {}
                for tag in user_tags:
                    score = tag_scores.get(tag, 0)

                    # reduce scores below 0.8 -> they do not mean much, kind of random scoring
                    if score < 0.8:
                        score /= 4
                    # boost the top CCA for each tag
                    elif score == best_per_tag[tag]:
                        score *= 2

                    adjusted[tag] = score
                modified_tag_scores.append(adjusted)

            df["modified_tag_scores"] = modified_tag_scores

            # calculating final score by adding up the modified scores of all the tags
            df["final_scores"] = df["modified_tag_scores"].apply(lambda x: sum(x.values()))

            # returing sorted final scores
            return df.sort_values("final_scores", ascending=False)

        top_ccas = rank_ccas(df, user_tags)

        # store top 10 CCAs in JSONB format
        top_10 = top_ccas[["name", "final_scores"]].head(10)
        print(top_10)

        recommendations = []
        rank = 1
        for id, row in top_10.iterrows():
            name = str(row["name"])
            score = float(row["final_scores"])
            recommendations.append({
                "rank": rank,
                "name": name,
                "score": round(score, 2)
            })
            rank += 1
        
        print("Recommendations: ", recommendations)

        # Storing top 10 recommended CCAs into Supabase
        response = (
            supabase.table("profiles")
            .update({"recommendations": recommendations})  # python list of dicts
            .eq("id", x)
            .execute()
        )

        return True

    def encode_response(self, output):
        return True

if __name__ == "__main__":
    api = ModelAPI()
    server = ls.LitServer(api)

    # add CORS middleware directly to FastAPI instance
    app: FastAPI = server.app

    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],  # should restrict to Vercel domain in production
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    # manually handle OPTIONS preflight requests
    @app.options("/{rest_of_path:path}")
    async def preflight_handler(request: Request, rest_of_path: str):
        return {}

    server.run(port=8000)