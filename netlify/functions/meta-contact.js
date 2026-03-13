exports.handler = async function (event, context) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const PIXEL_ID = process.env.META_PIXEL_ID;
  const ACCESS_TOKEN = process.env.META_ACCESS_TOKEN;

  let body;
  try {
    body = JSON.parse(event.body);
  } catch (e) {
    return { statusCode: 400, body: "Invalid JSON" };
  }

  const { eventSourceUrl, clientUserAgent, fbp, fbc } = body;

  // Capturar IP real desde headers de Netlify
  const clientIp = event.headers["x-forwarded-for"]?.split(",")[0].trim() 
    || event.headers["client-ip"] 
    || null;

  const payload = {
    data: [
      {
        event_name: "Contact",
        event_time: Math.floor(Date.now() / 1000),
        action_source: "website",
        event_source_url: eventSourceUrl || "https://wasabienergia.es",
        user_data: {
          client_ip_address: clientIp,
          client_user_agent: clientUserAgent || null,
          fbp: fbp || null,
          fbc: fbc || null,
        },
      },
    ],
  };

  try {
    const response = await fetch(
      `https://graph.facebook.com/v19.0/${PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      console.error("Meta API error:", result);
      return { statusCode: 500, body: JSON.stringify(result) };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, result }),
    };
  } catch (err) {
    console.error("Fetch error:", err);
    return { statusCode: 500, body: "Internal Server Error" };
  }
};
