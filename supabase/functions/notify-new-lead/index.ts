import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface LeadData {
  nombre: string;
  telefono: string;
  email: string;
  codigo_postal: string;
  cups?: string;
  factura_url?: string;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const leadData: LeadData = await req.json();

    const emailBody = `
      Nueva consulta recibida en Wasabi Energy:

      Nombre: ${leadData.nombre}
      Teléfono: ${leadData.telefono}
      Email: ${leadData.email}
      Código Postal: ${leadData.codigo_postal}
      ${leadData.cups ? `CUPS: ${leadData.cups}` : ''}
      ${leadData.factura_url ? `Factura: ${leadData.factura_url}` : 'Sin factura adjunta'}

      Fecha: ${new Date().toLocaleString('es-ES', { timeZone: 'Europe/Madrid' })}
    `;

    console.log('Nueva lead recibida:', emailBody);

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Notificación procesada correctamente',
      }),
      {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : 'Error desconocido',
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
});
