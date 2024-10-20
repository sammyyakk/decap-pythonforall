import { AuthorizationCode } from 'simple-oauth2';

export async function GET(req) {
  const { query } = req;
  const code = query.code;

  const client = new AuthorizationCode({
    client: {
      id: process.env.OAUTH_CLIENT_ID,
      secret: process.env.OAUTH_CLIENT_SECRET,
    },
    auth: {
      tokenHost: 'https://github.com',
      tokenPath: '/login/oauth/access_token',
    },
  });

  try {
    const tokenParams = {
      code,
      redirect_uri: `https://${req.headers.host}/api/callback`,
    };

    const accessToken = await client.getToken(tokenParams);
    console.log('Access Token:', accessToken.token);

    return new Response(JSON.stringify(accessToken.token), { status: 200 });
  } catch (error) {
    console.error('Access Token Error:', error.message);
    return new Response(JSON.stringify({ error: 'Access Token Error' }), { status: 500 });
  }
}
