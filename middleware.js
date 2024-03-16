import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request) {
  const { pathname } = request.nextUrl;
  const isCookiesExits = !!request.cookies.get("user_token");
  const isLoginPage = pathname.startsWith("/login");

  if (isCookiesExits === false && !isLoginPage) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isCookiesExits && isLoginPage) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // FLOW 1 : jika cookies ada dan user sedang di halaman Login , maka ==> redirect "/"
  // FLOW 2 : jika cookies tidak ada dan user sedang  di halaman selain login, ==> redirect "/login"
  // return NextResponse.redirect(new URL("/home", request.url));
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/((?!api|_next/static|_next/image|favicon.ico).*)",
};
