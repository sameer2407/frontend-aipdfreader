import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function POST(request: Request) {
  console.log('=== API Route Hit ===');

  const headers = {
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
    'Access-Control-Allow-Headers': 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
    'Content-Type': 'application/json',
  };

  try {
    const body = await request.json();
    console.log('Received request body:', body);

    const { query } = body;
    console.log('Extracted query:', query);

    if (!query) {
      console.error('No query provided');
      return new NextResponse(JSON.stringify({ error: 'Query is required' }), {
        status: 400,
        headers,
      });
    }

    // Send request to upstream API
    console.log('Sending request to main server...');
    const response = await fetch("https://pdf-gateway-service.onrender.com/api/pdf/query", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: query }),
    });

    console.log('Main server response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Main server error:', errorText);
      return new NextResponse(
        JSON.stringify({ error: 'Main server error', details: errorText }),
        { status: 500, headers }
      );
    }

    const data = await response.json();
    return new NextResponse(JSON.stringify(data), { headers });
  } catch (error) {
    console.error('Error in proxy-pdf-stream:', error);
    return new NextResponse(
      JSON.stringify({
        error: 'Internal Server Error',
        message: error instanceof Error ? error.message : 'Unknown error'
      }),
      {
        status: 500,
        headers,
      }
    );
  }
}

// Handle OPTIONS request for CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
      'Access-Control-Allow-Headers': 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
    },
  });
} 