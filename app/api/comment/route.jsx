import { connectMongoDB } from "@/mongo";
import User from "@/app/models/User";
export async function PATCH(req) {
  const body = await req.json();
  const userId = body.userId;
  const postId = body.postId;
  const comment = body.comment;
  const name = body.name;
  const commentArray = body.commentArray;

  if (!commentArray[postId]) {
    commentArray[postId] = [];
  }
  const unique = userId + postId + commentArray[postId].length;

  commentArray[postId].push({
    text: comment,
    author: body.comAuthor.name,
    id: unique,
  });

  await User.findOneAndUpdate(
    { name },
    {
      postComments: commentArray,
    }
  );

  return new Response({ t: 23 });
}
