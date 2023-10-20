import User from "@/app/models/User";
import bcrypt from "bcrypt";
import { serialize } from "cookie";
import { sign } from "jsonwebtoken";

export async function POST(req) {
  const body = await req.json();
  if (!body.name || !body.password) {
    console.log("Insufficient credentials");
    return new Response("Insufficient credentials", { status: 400 });
  }

  const user = await User.findOne({ name: body.name });
  if (!user) {
    console.log("User does not exist");
    return new Response("User does not exist", { status: 401 });
  }

  const passwordMatch = await bcrypt.compare(body.password, user.password);
  if (!passwordMatch) {
    console.log("Password does not match");
    return new Response("Password does not match", { status: 401 });
  } else {
    const secret = "secret";
    const token = sign({ name: body.name }, secret, {
      expiresIn: 60 * 60 * 24 * 30,
    });

    const serialized = serialize("OutSideJWT", token, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
    });

    const response = {
      message: "authenticated",
    };
    return new Response(JSON.stringify(response), {
      status: 200,
      headers: { "Set-Cookie": serialized },
    });
  }
}
