import User from "@/app/models/User";

export async function PATCH(req) {
  const body = await req.json();
  // const bodi = body;
  const name = body.shit.split("/")[5];
  // console.log(name, body.post, "gfdgfdg");
  const user = await User.findOne({ name: name.split("%20").join(" ") });
  const updatedUser = await User.findOneAndUpdate(
    { name: name.split("%20").join(" ") },
    {
      image: [...user.image, { newImage: body.image }],
      posts: [...user.posts, { newPost: body.post }],
      description: [...user.description, { newDescription: body.description }],
      postDate: [...user.postDate, { newDate: new Date() }],
      postTopics: [...user.postTopics, { newTopic: body.topic }],
    }
  );

  return new Response(JSON.stringify({ toko: "toko" }));
}
