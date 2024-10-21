import { AuthorizationCode } from 'simple-oauth2';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get('code');

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
      redirect_uri: `https://decap-pythonforall.vercel.app/api/callback`,
    };

    const accessToken = await client.getToken(tokenParams);
    console.log('Access Token:', accessToken.token);

    // Set the access token in a cookie and redirect to the /admin page
    return new Response(null, {
      status: 301,
      headers: {
        'Set-Cookie': `access_token=${accessToken.token.access_token}; Path=/; HttpOnly; Secure; SameSite=Strict`,
        'Location': '/admin#/collections/pages',  // Redirect to the admin dashboard or your preferred route
      },
    });
  } catch (error) {
    console.error('Access Token Error:', error.message);
    return new Response(JSON.stringify({ error: 'Access Token Error' }), { status: 500 });
  }
}
