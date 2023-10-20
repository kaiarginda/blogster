import { connectMongoDB } from "../../../mongo";
import bcrypt from "bcrypt";
import User from "@/app/models/User";
export async function POST(req) {
  await connectMongoDB();
  try {
    // await connectMongoDB();
    const body = await req.json();

    const exists = await User.findOne({ name: body.name });

    if (exists) {
      return;
    }

    const saltRounds = 10;
    const myPlaintextPassword = body.password;
    const base64 = body.image;
    if (body.image) {
      bcrypt.genSalt(saltRounds, async function (err, salt) {
        bcrypt.hash(myPlaintextPassword, salt, async function (err, hash) {
          const user = await User.create({
            name: body.name,
            password: hash,
            profilePic: body.image,
            profession: body.profession,
          });
          // Store hash in your password DB.
        });
      });
      return "as";
    } else {
      bcrypt.genSalt(saltRounds, async function (err, salt) {
        bcrypt.hash(myPlaintextPassword, salt, async function (err, hash) {
          const user = await User.create({
            name: body.name,
            password: hash,
            profession: body.profession,
          });
          // Store hash in your password DB.
        });
      });
      return "as";
    }
  } catch (err) {
    return new Response({ err });
  }
}
