//import { createClient } from "@supabase/supabase-js";

//const supabase = createClient(
  //"https://qprdbpliztynjlayyniu.supabase.co",
  //"sb_publishable_wJK1F-b2e7oAuoZhX7JX9g_S9OEGoMb"
//);

export default async function handler(req, res) {
  try {
    let body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    const { phone_number, amount } = body;

    let phone = phone_number.replace(/\D/g, "");
    if (phone.startsWith("0")) phone = "254" + phone.substring(1);

    const reference = "INV-" + Date.now();

    // ✅ SAVE TO SUPABASE
//    await supabase.from("payments").insert([
  //    {
    //    reference,
      //  phone,
        //amount,
       // status: "PENDING"
     // }
   // ]);

    // ✅ PAYHERO REQUEST
    const AUTH_TOKEN = "QWpBeXNOMFpSWDZIalBBTVVXb206UkNmczh0UkN1RmRZTFdMdFBaaHU0UlkxQjVEODQ0ZWNqeHgzaml4WQ==";

    const response = await fetch("https://backend.payhero.co.ke/api/v2/payments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Basic ${AUTH_TOKEN}`
      },
      body: JSON.stringify({
        amount: amount,
        phone_number: phone_number,
        channel_id: 5284,
        provider: "m-pesa",
        external_reference: "INV-" + Date.now(),
        customer_name: "Test User",
        callback_url: "https://fulizaincrease-iota.vercel.app/api/callback"
      })
    });

    const data = await response.json();

    return res.status(200).json({
      success: true,
      reference
    });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
