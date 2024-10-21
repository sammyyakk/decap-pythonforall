import { NextResponse } from 'next/server';

export async function middleware(request) {
  const res = NextResponse.next();

  // Set CORS headers manually
  res.headers.set('Access-Control-Allow-Origin', '*');
  res.headers.set('Access-Control-Allow-Methods', 'GET, HEAD');
  res.headers.set('Access-Control-Allow-Headers', 'Content-Type');

  return res;
}

export const config = {
  matcher: '/api/:path*',
};
