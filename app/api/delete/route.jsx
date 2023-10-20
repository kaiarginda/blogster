import User from "@/app/models/User";
import { connectMongoDB } from "@/mongo";
export async function PATCH(req) {
  // await connectMongoDB();
  const body = await req.json();
  const user = body.user;
  const id = body.id;
  const newPosts = user.posts.filter((post, i) => {
    return id != i + 1;
  });
  const newDescription = user.description.filter((post, i) => {
    return id != i + 1;
  });

  const newDates = user.postDate.filter((post, i) => {
    return id != i + 1;
  });

  const newPostComments = user.postComments.filter((post, i) => {
    return id != i + 1;
  });

  const newPostTopics = user.postTopics.filter((post, i) => {
    return id != i + 1;
  });

  const newImage = user.image.filter((post, i) => {
    return id != i + 1;
  });
  const updatedUser = await User.findOneAndUpdate(
    { name: user.name },
    {
      posts: newPosts,
      description: newDescription,
      postDate: newDates,
      postComments: newPostComments,
      postTopics: newPostTopics,
      image: newImage,
    }
  );
  //   console.log(updatedUser, "FROM SOMEWHERE");
  return new Response(
    JSON.stringify({
      status: 200,
    })
  );
}
