import { NextResponse } from "next/server";
import { isLocale, localeCookie } from "@/lib/i18n";

export async function POST(request: Request) {
  const { locale } = await request.json();

  if (!isLocale(locale)) {
    return NextResponse.json({ error: "Invalid locale" }, { status: 400 });
  }

  const response = NextResponse.json({ locale });
  response.cookies.set(localeCookie, locale, {
    httpOnly: false,
    maxAge: 60 * 60 * 24 * 365,
    path: "/",
    sameSite: "lax",
  });

  return response;
}
