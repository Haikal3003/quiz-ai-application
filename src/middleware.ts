import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { auth } from '@/lib/nextauth';

export async function middleware(req: NextRequest) {
  const session = await auth();

  const url = req.nextUrl.clone();

  const { pathname } = req.nextUrl;

  const protectedRoutes = ['/dashboard'];

  if (session?.user && pathname === '/') {
    url.pathname = '/dashboard';
    return NextResponse.redirect(url);
  }

  if (!session?.user && protectedRoutes.includes(pathname)) {
    url.pathname = '/';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/dashboard'],
};
