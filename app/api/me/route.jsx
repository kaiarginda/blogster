import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { verify } from "jsonwebtoken";
export async function GET() {
  const cookieStore = cookies();
  const token = cookieStore.get("OutSideJWT");

  if (!token) {
    return NextResponse(JSON.stringify({ error: "invalid" }));
  }

  const { value } = token;
  const useri = verify(value, "secret");

  if (useri) {
    const res = {
      message: "authenticated",
    };
    return new Response(JSON.stringify(res), {
      body: { a: "ds" },
      status: 201,
    });
  } else {
    return NextResponse.json({ message: err.message });
  }

  // return { useri };
}
