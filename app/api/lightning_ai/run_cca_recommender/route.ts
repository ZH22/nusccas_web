import { NextResponse } from "next/server";

// Allows CORS during production -> Localhost may not show the same problem
const ALLOWED_ORIGIN = process.env.NODE_ENV === 'production'
  ? 'https://nusccas-web.vercel.app/'
  : '*';

// Allow all Request Options for CORS  Preflight Request 
export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': ALLOWED_ORIGIN,
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Allow-Credentials': 'true',
    },
  });
}


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
                "Access-Control-Allow-Origin": ALLOWED_ORIGIN
            },
            body: JSON.stringify(body),
        };

        console.log(url)
        console.log(options)
        const res = await fetch(url, options); // no response expected
        const resData = await res.json()
        return NextResponse.json(resData);
        // return NextResponse.json({ success: true });
    } catch (error: unknown) {
        console.error(error);
        return NextResponse.json({ error: "Internal server error", details: error instanceof Error ? error.message : "Unexpected error occurred" }, { status: 500 });
    }
}