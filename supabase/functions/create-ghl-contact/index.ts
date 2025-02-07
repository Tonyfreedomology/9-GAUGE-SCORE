
import { serve } from "https://deno.fresh.run/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.0";

serve(async (req) => {
  try {
    // Handle CORS
    if (req.method === 'OPTIONS') {
      return new Response('ok', {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        }
      });
    }

    const { firstName, email, source } = await req.json();
    
    // Create Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    );

    // Get GHL API key from Supabase secrets
    const { data: { value: GHL_API_KEY }, error: secretError } = await supabaseClient
      .from('secrets')
      .select('value')
      .eq('name', 'GHL_API_KEY')
      .single();

    if (secretError || !GHL_API_KEY) {
      throw new Error('Unable to retrieve GHL API key');
    }

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

    // Update the waitlist entry to mark it as processed
    const { error: updateError } = await supabaseClient
      .from('waitlist_entries')
      .update({ processed: true })
      .eq('email', email);

    if (updateError) {
      console.error('Error updating waitlist entry:', updateError);
    }

    return new Response(JSON.stringify({ success: true, data: ghlData }), {
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });

  } catch (error) {
    console.error('Error in create-ghl-contact function:', error);
    return new Response(
      JSON.stringify({ error: error.message }), 
      { 
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      }
    );
  }
});
