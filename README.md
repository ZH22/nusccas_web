## Project Overview

### Context

nusCCAs is part of Orbital 2025, a self-driven programming summer experience, undertaken in the first year by Computer Science students in the National University of Singapore (NUS). This project is done by Ooi Zheng Hao and Ronith Saju.

It is publically available on: https://nusccas-web.vercel.app/

### Problem

Coming in as a freshman, the starting few weeks are usually pretty exciting and hectic, with many decisions surrounding Module Planning, Accommodation administration, Orientation Events, leaving CCAs (Co-Curricular Activities) as an afterthought. We’d argue that it may be due to the friction of sourcing, researching and applying for CCAs that deter many, potentially leaving CCAs obscured from potential interested parties. Currently, it is difficult for NUS students to find CCAs and events to join due to non-user friendly and decentralized sources of information.

### Aim

We hope to provide a One-Stop, Easy-to-Use and Personalised web application to help NUS students find CCAs and Student Life Events just for them.

### Main Features

1. Browse all NUS CCAs
2. Dashboard of Aggregated CCAs: User’s current CCAs + AI Recommended CCAs
3. User Authentication: login, register, profile
4. User Onboarding Process
5. CCA Recommendation System using Zero-Shot Text Classification
6. CCA Review Section
7. Browse NUS events
8. User Management extended: administrative control for admin and CCA leaders

### Technologies Used

#### Frontend

![Next.js Badge](https://img.shields.io/badge/Next.js-000?logo=nextdotjs&logoColor=fff&style=flat-square)
![Tailwind CSS Badge](https://img.shields.io/badge/Tailwind%20CSS-06B6D4?logo=tailwindcss&logoColor=fff&style=flat-square)
![Vercel Badge](https://img.shields.io/badge/Vercel-000?logo=vercel&logoColor=fff&style=flat-square)
![shadcn/ui Badge](https://img.shields.io/badge/shadcn%2Fui-000?logo=shadcnui&logoColor=fff&style=flat-square)
![Figma Badge](https://img.shields.io/badge/Figma-F24E1E?logo=figma&logoColor=fff&style=flat-square)

#### Backend

![Supabase Badge](https://img.shields.io/badge/Supabase-3FCF8E?logo=supabase&logoColor=fff&style=flat-square)
![Lightning AI Badge](https://img.shields.io/badge/Lightning%20AI-7434E0?logo=lightning&logoColor=fff&style=flat-square)
![Selenium Badge](https://img.shields.io/badge/Selenium-43B02A?logo=selenium&logoColor=fff&style=flat-square)
![PostgreSQL Badge](https://img.shields.io/badge/PostgreSQL-4169E1?logo=postgresql&logoColor=fff&style=flat-square)

### Model View Controller Architecture

![GeneralWorkflow_06052925](https://github.com/user-attachments/assets/4478674e-530d-4b17-bff3-73a2206fee02)

## Getting Started

### Setting up

- Clone the repository
- Add `.env.local` file in app's root directory
- Insert the Supabase API, Lightning AI API, Telegram Bot ID and Telegram Dev IDs details into the `.env.local` file

### Running development server

```bash
pnpm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
