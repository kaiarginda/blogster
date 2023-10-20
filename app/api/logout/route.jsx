import { connectMongoDB } from "@/mongo";
import { cookies } from "next/headers";
import { verify } from "jsonwebtoken";
export async function GET() {
  // await connectMongoDB();
  const cookieStore = cookies();
  const token = cookieStore.get("OutSideJWT");

  if (!token) {
    return new Response("You Are Not Logged In");
  } else {
    const user = verify(token.value, "secret");

    cookieStore.delete("OutSideJWT");
    return new Response("You Were Logged In");
  }
}
