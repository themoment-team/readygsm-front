import { NextRequest, NextResponse } from 'next/server';

const PUBLIC_PATHS = ['/login', '/oauth/callback'];

export const middleware = async (request: NextRequest) => {
  const { pathname } = request.nextUrl;

  if (PUBLIC_PATHS.includes(pathname)) {
    return NextResponse.next();
  }

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/user/me`, {
      headers: { Cookie: request.headers.get('cookie') ?? '' },
      cache: 'no-store',
    });

    if (res.ok) {
      const json = await res.json();
      const role = json?.data?.role as string | undefined;
      if (role === 'ADMIN' || role === 'ROOT') {
        return NextResponse.next();
      }
      return NextResponse.rewrite(new URL('/not-found', request.url));
    }
  } catch {}

  const loginUrl = new URL('/login', request.url);
  loginUrl.searchParams.set('returnUrl', pathname);
  return NextResponse.redirect(loginUrl);
};

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|not-found).*)'],
};
