
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  try {
    // Handle CORS
    if (req.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    const { firstName, email, source } = await req.json();
    
    // Get GHL API key directly from Edge Function secrets
    const GHL_API_KEY = Deno.env.get('GHL_API_KEY');

    if (!GHL_API_KEY) {
      throw new Error('GHL API key not configured');
    }

    console.log('Creating contact in GHL for email:', email);

    // Create contact in GHL
    const ghlResponse = await fetch('https://rest.gohighlevel.com/v1/contacts/', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GHL_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        firstName,
        email,
        tags: [source || 'Waitlist']
      })
    });

    if (!ghlResponse.ok) {
      const errorData = await ghlResponse.json();
      console.error('GHL API Error:', errorData);
      throw new Error(`GHL API error: ${ghlResponse.status}`);
    }

    const ghlData = await ghlResponse.json();
    console.log('Successfully created GHL contact:', ghlData);

    return new Response(
      JSON.stringify({ success: true, data: ghlData }), 
      { 
        headers: { 
          'Content-Type': 'application/json',
          ...corsHeaders
        }
      }
    );

  } catch (error) {
    console.error('Error in create-ghl-contact function:', error);
    return new Response(
      JSON.stringify({ error: error.message }), 
      { 
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders
        }
      }
    );
  }
});
