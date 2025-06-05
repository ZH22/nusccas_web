

## Project Overview
### Context
Part of Orbital NUS 2025, a self-driven programming summer experience, undertaken in the first year by Computer Science students in the National University of Singapore.

### Problem
Coming in as a freshman, the starting few weeks are usually pretty exciting and hectic, with many decisions surrounding Module Planning, Accommodation administration, Orientation Events, leaving CCAs (Co-Curricular Activities) as an afterthought. We’d argue that it may be due to the friction of sourcing, researching and applying for CCAs that deter many, potentially leaving CCAs obscured from potential interested parties.
### Aim
We hope to provide a One-Stop, Easy-to-Use and Personalised web application to help NUS students find CCAs and Student Life Events just for them.
### Technologies Used
#### Frontend
![Next.js Badge](https://img.shields.io/badge/Next.js-000?logo=nextdotjs&logoColor=fff&style=flat-square)
![Tailwind CSS Badge](https://img.shields.io/badge/Tailwind%20CSS-06B6D4?logo=tailwindcss&logoColor=fff&style=flat-square)
![Vercel Badge](https://img.shields.io/badge/Vercel-000?logo=vercel&logoColor=fff&style=flat-square)
![shadcn/ui Badge](https://img.shields.io/badge/shadcn%2Fui-000?logo=shadcnui&logoColor=fff&style=flat-square)
![Figma Badge](https://img.shields.io/badge/Figma-F24E1E?logo=figma&logoColor=fff&style=flat-square)

#### Backend
![Supabase Badge](https://img.shields.io/badge/Supabase-3FCF8E?logo=supabase&logoColor=fff&style=flat-square)
![Google Colab Badge](https://img.shields.io/badge/Google%20Colab-F9AB00?logo=googlecolab&logoColor=fff&style=flat-square)
![Selenium Badge](https://img.shields.io/badge/Selenium-43B02A?logo=selenium&logoColor=fff&style=flat-square)
![PostgreSQL Badge](https://img.shields.io/badge/PostgreSQL-4169E1?logo=postgresql&logoColor=fff&style=flat-square)


### Model View Controller Architecture
![GeneralWorkflow_06052925](https://github.com/user-attachments/assets/6dcbb779-51eb-4428-a4ad-3475872c2baa)




## Getting Started

### Setting up

- Clone the repository
- Add `.env.local` file in app's root directory
- Replace `<URL>` and `<KEY>` with Supabase api details

```
NEXT_PUBLIC_SUPABASE_URL=<URL>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<KEY>
```

### Running development server

```bash
pnpm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Backend Webscraper

- Add `.env` file in backend directory
- Replace `<URL>` and `<KEY>` with Supabase API details

```
SUPABASE_URL=<URL>
SUPABASE_KEY=<KEY>
```

- Install dependencies
- Run webscraper

```
pip install -r req.txt
python webscraper.py
```
