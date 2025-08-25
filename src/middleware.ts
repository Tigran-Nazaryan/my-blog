import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const pathname = request.nextUrl.pathname;

  // Разрешить доступ без токена к страницам логина и регистрации
  if (pathname === "/auth/login" || pathname === "/auth/registration") {
    if (token) {
      // Уже залогинен? Отправь на главную
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next(); // Пускаем
  }

  // Все остальные страницы требуют токен
  if (!token) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  return NextResponse.next();
}


export const config = {
  matcher: ["/((?!_next|api|static|favicon.ico).*)"],
};



