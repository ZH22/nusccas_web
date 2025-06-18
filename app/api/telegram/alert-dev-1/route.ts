export async function POST(request: Request) {
  const body = await request.json();
  const { text } = body;

  const response = await fetch(`https://api.telegram.org/bot${process.env.TELE_BOT_ID}/sendMessage`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      chat_id: process.env.DEV_1_ID,
      text: text
    })
  })
  return response
}