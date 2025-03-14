// @deno-types="https://deno.land/std@0.177.0/http/server.ts"
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
    
    console.log(`Attempting to create GHL contact for ${email} with source tag: "${source}"`);
    
    // Get GHL API key directly from Edge Function secrets
    const GHL_API_KEY = Deno.env.get('GHL_API_KEY');

    if (!GHL_API_KEY) {
      console.error('GHL API key not found in environment variables');
      throw new Error('GHL API key not configured');
    }

    // Prepare the request payload
    const payload = {
      firstName,
      email,
      tags: [source || 'Waitlist']
    };
    
    console.log(`Sending request to GHL API with payload:`, payload);
    
    // Make the API request with timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
    
    try {
      const ghlResponse = await fetch('https://rest.gohighlevel.com/v1/contacts/', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${GHL_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload),
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      // Get the response text first to handle potential JSON parsing errors
      const responseText = await ghlResponse.text();
      let errorData;
      
      try {
        errorData = JSON.parse(responseText);
      } catch (e) {
        console.error('Failed to parse GHL response as JSON:', responseText);
        errorData = { rawResponse: responseText };
      }
      
      console.log(`GHL API response status: ${ghlResponse.status}`);
      
      if (!ghlResponse.ok) {
        console.error('GHL API Error:', errorData);
        throw new Error(`GHL API error: ${ghlResponse.status} - ${JSON.stringify(errorData)}`);
      }
      
      console.log('Successfully created GHL contact:', errorData);

      return new Response(
        JSON.stringify({ 
          success: true, 
          data: errorData,
          message: `Successfully created contact for ${email} with tag: ${source}`
        }), 
        { 
          headers: { 
            'Content-Type': 'application/json',
            ...corsHeaders
          }
        }
      );
    } catch (fetchError) {
      clearTimeout(timeoutId);
      // Add type guard for fetchError
      if (fetchError && typeof fetchError === 'object' && 'name' in fetchError && fetchError.name === 'AbortError') {
        console.error('GHL API request timed out after 10 seconds');
        throw new Error('GHL API request timed out');
      }
      throw fetchError;
    }
  } catch (error) {
    // Add type guard and handle error properties safely
    const errorMessage = error && typeof error === 'object' && 'message' in error ? 
      error.message as string : 'Unknown error';
    
    const errorStack = error && typeof error === 'object' && 'stack' in error ? 
      error.stack as string : undefined;
    
    console.error('Error in create-ghl-contact function:', errorMessage, errorStack);
    
    return new Response(
      JSON.stringify({ 
        success: false,
        error: errorMessage,
        timestamp: new Date().toISOString(),
        details: errorStack || 'No stack trace available'
      }), 
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
