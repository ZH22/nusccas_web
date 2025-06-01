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
