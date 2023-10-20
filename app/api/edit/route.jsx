import User from "@/app/models/User";
import { connectMongoDB } from "@/mongo";

export async function PATCH(req) {
  await connectMongoDB();

  const body = await req.json();
  const user = body.user;
  const newTitle = body.newTitle;
  const id = body.id;
  const newPosts = user.posts;

  newPosts[id - 1] = { newPost: newTitle };

  await User.findOneAndUpdate(
    { name: user.name },
    {
      posts: newPosts,
    }
  );

  return new Response({ code: 200 });
}
