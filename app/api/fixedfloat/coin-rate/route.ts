import { NextResponse } from "next/server";
const { parseStringPromise } = require("xml2js");

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type") === "fixed" ? "fixed" : "float";
    const url = `https://ff.io/rates/${type}.xml`;

    const xml = await (await fetch(url, { cache: "no-store" })).text();
    const parsed = await parseStringPromise(xml, { explicitArray: false, trim: true });

    const items = parsed?.rates?.item
      ? Array.isArray(parsed.rates.item) ? parsed.rates.item : [parsed.rates.item]
      : [];

    // Apply 2% commission to all rates
    const commission = 0.02; // 2% commission
    
    const rates = items.map((it: any) => {
      const originalIn = parseFloat(it.in);
      const originalOut = parseFloat(it.out);
      const originalAmount = parseFloat(it.amount ?? "0");
      
      // Apply commission to output amount (we give user 2% less)
      const finalOut = originalOut * (1 - commission);
      const finalAmount = originalAmount * (1 - commission);

      return {
        from: it.from,
        to: it.to,
        in: originalIn,
        out: finalOut, // After 2% commission
        originalOut: originalOut, // Original rate without commission
        amount: finalAmount, // After 2% commission
        originalAmount: originalAmount, // Original amount without commission
        commissionRate: commission, // 2% commission
        commissionAmount: originalOut - finalOut, // Commission deducted
        tofee: String(it.tofee ?? ""),
        minamount: parseFloat((it.minamount || "0").toString().split(" ")[0]),
        maxamount: parseFloat((it.maxamount || "0").toString().split(" ")[0]),
        type
      };
    });

    return NextResponse.json({ 
      ok: true, 
      rates,
      commissionApplied: commission,
      message: "All rates include 2% commission"
    });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e.message || "Failed" }, { status: 500 });
  }
}