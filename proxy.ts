import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { auth } from "./lib/auth";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/login") {
    const session = await auth.api.getSession({ headers: request.headers });

    if (session) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // if (pathname.startsWith("/admin")) {
  //   const session = await auth.api.getSession({ headers: request.headers });
  //   if (!session || session.user.role !== "ADMIN") {
  //     return NextResponse.redirect(new URL("/not-admin", request.url))
  //   }
  // }
}

export const config = {
  matcher: ["/admin/:path*", "/login"],
};
