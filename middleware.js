export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _vercel (Vercel internals)
     * - static (static files)
     * - favicon.ico, sitemap.xml, robots.txt (public files)
     * - .png, .jpg, .jpeg, .svg, .webp (images)
     */
    '/((?!api|_vercel|static|favicon.ico|sitemap.xml|robots.txt|.*\\.(?:png|jpg|jpeg|svg|webp|css|js)$).*)',
  ],
};

export default function middleware(request) {
  // Get the country from Vercel's geo header
  const country = request.headers.get('x-vercel-ip-country') || 'IN'; // Default to IN for local dev
  
  // List of Asian country codes (ISO 3166-1 alpha-2)
  const asianCountries = [
    'IN', 'AF', 'AM', 'AZ', 'BH', 'BD', 'BT', 'BN', 'KH', 'CN', 'CY', 'GE', 'ID', 'IR', 'IQ', 'IL', 'JP', 'JO', 'KZ', 'KP', 'KR', 'KW', 'KG', 'LA', 'LB', 'MY', 'MV', 'MN', 'MM', 'NP', 'OM', 'PK', 'PS', 'PH', 'QA', 'SA', 'SG', 'LK', 'SY', 'TW', 'TJ', 'TH', 'TL', 'TR', 'TM', 'AE', 'UZ', 'VN', 'YE'
  ];

  // If the user's country is not in Asia, block them
  if (!asianCountries.includes(country)) {
    return new Response(
      `<!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Access Denied - VPN/Region Blocked</title>
          <style>
            body { 
              background-color: #030712; 
              color: #f9fafb; 
              font-family: system-ui, -apple-system, sans-serif; 
              display: flex; 
              align-items: center; 
              justify-content: center; 
              height: 100vh; 
              margin: 0; 
              text-align: center; 
            }
            h1 { color: #ef4444; font-size: 2.5rem; margin-bottom: 1rem; }
            p { font-size: 1.1rem; color: #9ca3af; max-width: 500px; line-height: 1.6; margin: 0 auto 1.5rem auto; }
            .container { 
              border: 1px solid #1f2937; 
              padding: 3rem; 
              border-radius: 1.5rem; 
              background: #111827; 
              box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
            }
            .icon {
              font-size: 4rem;
              margin-bottom: 1rem;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="icon">🛡️</div>
            <h1>VPN / Proxy Detected</h1>
            <p>Our security systems have detected that you are using a VPN, Proxy, or accessing from a restricted region.</p>
            <p>BiovaCo Nexus operations and web services are strictly limited to India and the Asian subcontinent.</p>
            <p style="color: #6b7280; font-size: 0.9rem; margin-top: 2rem;">Please disable your VPN and refresh the page to continue.</p>
          </div>
        </body>
      </html>`,
      {
        status: 403,
        headers: {
          'content-type': 'text/html; charset=utf-8',
        },
      }
    );
  }

  // Allow request to proceed
  return new Response(null, {
    headers: {
      'x-middleware-next': '1'
    }
  });
}
