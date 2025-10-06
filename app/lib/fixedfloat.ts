import crypto from "crypto"

const API_KEY = 'kktMVEFcudogXebV46OHUd36VNtjGc3BhwlsWwyl'
const API_SECRET = 'Ynr2rhVxEooVkUcOstpfF5FCrBsqB9pPYirn1sDC'
const API_URL = "https://ff.io/api/v2"

export async function GET() {
  const signature = crypto.createHmac("sha256", API_SECRET)
    .update("{}")
    .digest("hex")

  const res = await fetch("https://ff.io/api/v2/ccies", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json; charset=UTF-8",
      "X-API-KEY": API_KEY,
      "X-API-SIGN": signature,
    },
    body: "{}",
  })

  if (!res.ok) {
    const error = await res.text()
    throw new Error(`FixedFloat API /ccies error: ${error}`)
  }

  const data = await res.json()
  return Response.json(data)
}