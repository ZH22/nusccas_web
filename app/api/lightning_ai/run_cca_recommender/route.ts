import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // const url = "https://8000-01jyc5f4xnnk2wrzcmybg4vbgr.cloudspaces.litng.ai/predict"
        const url = process.env.NEXT_PUBLIC_LIT_SERVER_API_URL as string;
        const LIT_SERVER_AUTHORIZATION = process.env.NEXT_PUBLIC_LIT_SERVER_AUTHORIZATION as string;
        
        const LIT_SERVER_API_KEY = process.env.NEXT_PUBLIC_LIT_SERVER_API_KEY;
        if (!LIT_SERVER_API_KEY) {
            return NextResponse.json({ error: "LIT_SERVER_API_KEY is not defined in .env.local" }, { status: 500 });
            // needed so that options don't kpkb
        }

        const options = {
            method: "POST",
            headers: {
                "X-API-Key": LIT_SERVER_API_KEY,
                "Authorization": LIT_SERVER_AUTHORIZATION,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        };

        console.log(url)
        console.log(options)
        fetch(url, options); // no response expected
        return NextResponse.json({ success: true });
    } catch (error: unknown) {
        console.error(error);
        return NextResponse.json({ error: "Internal server error", details: error instanceof Error ? error.message : "Unexpected error occurred" }, { status: 500 });
    }
}