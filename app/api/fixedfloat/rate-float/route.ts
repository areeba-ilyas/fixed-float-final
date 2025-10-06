import { NextResponse } from "next/server"
import { parseStringPromise } from "xml2js"

export async function GET() {
  try {
    const response = await fetch("https://ff.io/rates/float.xml")

    if (!response.ok) {
      const errorText = await response.text()
      return NextResponse.json({ error: `Failed to fetch XML: ${errorText}` }, { status: response.status })
    }

    const xmlText = await response.text()
    const parsed = await parseStringPromise(xmlText, { explicitArray: false })

    // Apply 2% commission to all rates
    const commission = 0.02;
    
    if (parsed.rates && parsed.rates.item) {
      const items = Array.isArray(parsed.rates.item) ? parsed.rates.item : [parsed.rates.item];
      
      const ratesWithCommission = items.map((item: any) => {
        const originalIn = parseFloat(item.in);
        const originalOut = parseFloat(item.out);
        const originalAmount = parseFloat(item.amount || "0");
        
        // Apply 2% commission to output
        const finalOut = originalOut * (1 - commission);
        const finalAmount = originalAmount * (1 - commission);
        
        return {
          ...item,
          in: originalIn,
          out: finalOut, // After 2% commission
          originalOut: originalOut, // Original rate without commission
          amount: finalAmount, // After 2% commission
          originalAmount: originalAmount, // Original amount without commission
          commissionRate: commission,
          commissionAmount: originalOut - finalOut,
        };
      });

      parsed.rates.item = ratesWithCommission;
      parsed.commissionApplied = commission;
      parsed.message = "All rates include 2% commission";
    }

    return NextResponse.json(parsed)
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 })
  }
}