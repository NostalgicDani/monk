import { NextRequest, NextResponse } from "next/server";

// Monk is archived and no longer maintained.
// Only the marketing pages stay reachable. Sign-in, the app itself, and
// all API routes are dead. Nothing here should ever hit Clerk or the DB.
const isAllowedRoute = (pathname: string) =>
  ["/", "/tos", "/policy", "/about"].includes(pathname);

export default function middleware(req: NextRequest) {
  if (isAllowedRoute(req.nextUrl.pathname)) {
    return NextResponse.next();
  }
  return NextResponse.redirect(new URL("/", req.url));
}

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
