import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const body = await request.json();

        const url = "https://8000-01jyc5f4xnnk2wrzcmybg4vbgr.cloudspaces.litng.ai/predict"

        const LIT_SERVER_API_KEY = process.env.NEXT_PUBLIC_LIT_SERVER_API_KEY;
        if (!LIT_SERVER_API_KEY) {
            return NextResponse.json({ error: "LIT_SERVER_API_KEY is not defined in .env.local" }, { status: 500 });
            // needed so that options don't kpkb
        }

        const options = {
            method: "POST",
            headers: {
                "X-API-Key": LIT_SERVER_API_KEY,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        };

        fetch(url, options); // no response expected
        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error(error);
        return NextResponse.json({ error: "Internal server error", details: error.toString() }, { status: 500 });
    }
}