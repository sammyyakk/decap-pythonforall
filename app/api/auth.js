// pages/api/auth.js
import { AuthorizationCode } from 'simple-oauth2';

export async function GET(req) {
  const { host } = req.headers;
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
    redirect_uri: `https://${host}/api/callback`,  // Ensure this matches your GitHub OAuth callback URL
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
