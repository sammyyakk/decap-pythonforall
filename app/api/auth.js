import { AuthorizationCode } from 'simple-oauth2';

export async function GET(req) {
  const { host } = req.headers;

  // Set CORS headers
  const headers = new Headers();
  headers.set('Access-Control-Allow-Origin', '*');
  headers.set('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS');
  headers.set('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight request (for CORS)
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,  // No Content
      headers: headers
    });
  }

  // Proceed with OAuth flow
  const client = new AuthorizationCode({
    client: {
      id: process.env.OAUTH_CLIENT_ID,
      secret: process.env.OAUTH_CLIENT_SECRET,
    },
    auth: {
      tokenHost: 'https://github.com',
      tokenPath: '/login/oauth/access_token',
      authorizePath: '/login/oauth/authorize',
    },
  });

  const authorizationUri = client.authorizeURL({
    redirect_uri: `https://${host}/api/callback`,
    scope: 'repo,user',
    state: 'randomstring',
  });

  // Add CORS headers to the redirect response
  headers.set('Location', authorizationUri);

  return new Response(null, {
    status: 301,
    headers: headers,
  });
}
