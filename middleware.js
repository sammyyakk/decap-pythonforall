import { NextResponse } from 'next/server';
import Cors from 'cors';

const cors = Cors({
  methods: ['GET', 'HEAD'],
});

function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

export async function middleware(request) {
  const res = NextResponse.next();
  await runMiddleware(request, res, cors);
  return res;
}

export const config = {
  matcher: '/api/:path*',
};