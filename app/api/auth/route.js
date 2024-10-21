import { AuthorizationCode } from 'simple-oauth2';

export async function GET() {
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
    redirect_uri: `https://decap-pythonforall.vercel.app/api/callback`,  // Ensure this matches your GitHub OAuth callback URL
    scope: 'repo,user',
    state: 'randomstring',
  });

  return new Response(null, {
    status: 301,
    headers: {
      Location: authorizationUri,
    },
  });
}
