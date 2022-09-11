import { NextResponse } from "next/server";
import { verify } from 'jsonwebtoken';
import { serialize } from "cookie";
const secret = "bestSecretKey69";
export function middleware(req) {
    const { pathname, origin } = req.nextUrl;
    const { cookies } = req;
    const jwt = req.cookies.get("OursiteJWT");
    const url = req.url;
    if (url.includes('/manage')) {
        if (jwt === undefined) {
            return NextResponse.redirect(`${origin}/login`);
        }
      try {
          verify(jwt,secret);
          return NextResponse.redirect(`${origin}/login/manage`);
        } catch (e) {
            return NextResponse.redirect(`${origin}/login`);
        }
  } 
  if (url.includes('/login')) {
    if (jwt === undefined) {
        return NextResponse.redirect(`${origin}/login`);
    }
  try {
      console.log(verify(jwt,secret));
      verify(jwt,secret);
      return NextResponse.redirect(`${origin}/login/manage`);
    } catch (e) {
        return NextResponse.redirect(`${origin}/login`);
    }
} 
    return NextResponse.next();
}