export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _vercel (Vercel internals)
     * - static (static files)
     * - favicon.ico, sitemap.xml, robots.txt (public files)
     * - images and assets
     */
    '/((?!api|_vercel|static|favicon.ico|sitemap.xml|robots.txt|.*\\.(?:png|jpg|jpeg|svg|webp|css|js)$).*)',
  ],
};

export default async function middleware(request) {
  // 1. Get the country from Vercel's geo header
  const country = request.headers.get('x-vercel-ip-country') || 'IN'; 
  const ip = request.headers.get('x-real-ip') || request.headers.get('x-forwarded-for');
  
  // List of Asian country codes (ISO 3166-1 alpha-2)
  const asianCountries = [
    'IN', 'AF', 'AM', 'AZ', 'BH', 'BD', 'BT', 'BN', 'KH', 'CN', 'CY', 'GE', 'ID', 'IR', 'IQ', 'IL', 'JP', 'JO', 'KZ', 'KP', 'KR', 'KW', 'KG', 'LA', 'LB', 'MY', 'MV', 'MN', 'MM', 'NP', 'OM', 'PK', 'PS', 'PH', 'QA', 'SA', 'SG', 'LK', 'SY', 'TW', 'TJ', 'TH', 'TL', 'TR', 'TM', 'AE', 'UZ', 'VN', 'YE'
  ];

  let isVPN = false;
  let isBlockedRegion = !asianCountries.includes(country);

  // 2. Active VPN Detection via Blackbox API (Free, fast IP reputation)
  if (ip) {
    try {
      // Use AbortController so we don't slow down the site if the API is slow
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 800); // 800ms max latency
      
      const res = await fetch(`https://blackbox.ipinfo.app/lookup/${ip}`, {
        signal: controller.signal
      });
      clearTimeout(timeoutId);
      
      const text = await res.text();
      if (text.trim() === 'Y') {
        isVPN = true;
      }
    } catch (e) {
      // If API times out, fallback to Geo-blocking and header checks
    }
  }

  // 3. Check for obvious Proxy/VPN headers
  const via = request.headers.get('via');
  if (via && (via.toLowerCase().includes('proxy') || via.toLowerCase().includes('vpn'))) {
    isVPN = true;
  }

  // 4. Block if VPN is detected OR region is outside Asia
  if (isBlockedRegion || isVPN) {
    return new Response(
      `<!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Access Restricted | BiovaCo Nexus</title>
          <link rel="preconnect" href="https://fonts.googleapis.com">
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
          <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600&family=Inter:wght@400;500&display=swap" rel="stylesheet">
          <style>
            :root {
              --navy: #032E63;
              --navy-deep: #021f43;
              --green: #08A04B;
              --background: #ffffff;
              --foreground: #032E63;
              --muted: #64748b;
              --border: #e2e8f0;
            }
            body { 
              background-color: var(--background); 
              color: var(--foreground); 
              font-family: 'Inter', sans-serif; 
              display: flex; 
              flex-direction: column;
              align-items: center; 
              justify-content: center; 
              height: 100vh; 
              margin: 0; 
              text-align: center; 
            }
            .nav {
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              padding: 2rem 5%;
              display: flex;
              align-items: center;
              box-sizing: border-box;
            }
            .logo {
              height: 40px;
            }
            .container { 
              padding: 3rem; 
              max-width: 650px;
              animation: fadeUp 0.8s cubic-bezier(0.21, 0.47, 0.32, 0.98);
            }
            @keyframes fadeUp {
              from { opacity: 0; transform: translateY(20px); }
              to { opacity: 1; transform: translateY(0); }
            }
            .eyebrow {
              color: var(--green);
              text-transform: uppercase;
              letter-spacing: 0.15em;
              font-size: 0.875rem;
              font-weight: 600;
              margin-bottom: 1.5rem;
              display: flex;
              align-items: center;
              justify-content: center;
              gap: 0.5rem;
            }
            .dot {
              width: 6px;
              height: 6px;
              background-color: var(--green);
              border-radius: 50%;
            }
            h1 { 
              font-family: 'Outfit', sans-serif;
              color: var(--foreground); 
              font-size: 3.5rem; 
              line-height: 1.1;
              margin-bottom: 1.5rem; 
              font-weight: 500;
              letter-spacing: -0.03em;
            }
            .italic-green {
              font-style: italic;
              font-weight: 300;
              color: var(--green);
            }
            p { 
              font-size: 1.125rem; 
              color: var(--muted); 
              line-height: 1.7; 
              margin: 0 auto 2rem auto; 
            }
            .button {
              display: inline-flex;
              align-items: center;
              justify-content: center;
              background-color: var(--navy);
              color: #ffffff;
              padding: 1rem 2.5rem;
              border-radius: 9999px;
              font-weight: 500;
              text-decoration: none;
              transition: all 0.3s ease;
              border: none;
              cursor: pointer;
              font-size: 1rem;
            }
            .button:hover {
              background-color: var(--navy-deep);
              transform: translateY(-2px);
              box-shadow: 0 10px 20px -10px rgba(3, 46, 99, 0.5);
            }
          </style>
        </head>
        <body>
          <div class="nav">
            <svg class="logo" viewBox="0 0 200 60" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M28 20C28 15.5817 31.5817 12 36 12C40.4183 12 44 15.5817 44 20C44 24.4183 40.4183 28 36 28C31.5817 28 28 24.4183 28 20Z" fill="#08A04B" fill-opacity="0.8"/>
              <path d="M22 36C22 28.268 28.268 22 36 22C43.732 22 50 28.268 50 36C50 43.732 43.732 50 36 50C28.268 50 22 43.732 22 36Z" stroke="#032E63" stroke-width="4"/>
              <text x="65" y="34" font-family="Outfit" font-size="24" font-weight="600" fill="#032E63" letter-spacing="0.1em">BIOVACO</text>
              <text x="65" y="48" font-family="Outfit" font-size="11" font-weight="500" fill="#08A04B" letter-spacing="0.2em">NEXUS</text>
            </svg>
          </div>
          <div class="container">
            <div class="eyebrow"><div class="dot"></div> Security Protocol</div>
            <h1>Access <span class="italic-green">Restricted.</span></h1>
            <p>Our security systems have detected an active VPN, Proxy, or access from a restricted region.</p>
            <p>BiovaCo Nexus digital operations are currently limited to India and the Asian subcontinent to ensure data integrity and compliance.</p>
            <button class="button" onclick="window.location.reload()">Disable VPN & Try Again</button>
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
