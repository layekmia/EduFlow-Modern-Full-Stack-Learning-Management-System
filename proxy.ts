import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { auth } from "./lib/auth";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/login") {
    const sessionCookie = await auth.api.getSession({ headers: request.headers });

    if (sessionCookie) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  if (pathname.startsWith("/admin")) {
    const session = await auth.api.getSession({ headers: request.headers });

    if (!session) { return NextResponse.redirect(new URL("/login", request.url)) }

    if (session.user.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/not-admin", request.url))
    }
  }
}

export const config = {
  matcher: ["/admin/:path*", "/login"],
};
