import User from "@/app/models/User";
import { connectMongoDB } from "@/mongo";

export async function PATCH(req) {
  // await connectMongoDB();
  const body = await req.json();
  console.log(body);
  const curComments = await User.findOne({ name: body.name });
  const coms = curComments.postComments[body.id][body.i];

  //   const realComs = curComments.postComments[body.id];
  const allComs = curComments.postComments;

  allComs[body.id][body.i].replies = [
    ...coms.replies,
    { text: body.text, replies: [] },
  ];

  const updated = await User.findOneAndUpdate(
    { name: body.name },
    {
      postComments: allComs,
    }
  );
  return new Response(JSON.stringify(body));
}
