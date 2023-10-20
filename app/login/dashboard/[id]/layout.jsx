import React from "react";
import { cookies } from "next/headers";
import { verify } from "jsonwebtoken";
import User from "@/app/models/User";
import PAGES from "./page";
import { connectMongoDB } from "@/mongo";

import PAG from "./page";
const Post = async ({ params }) => {
  await connectMongoDB();
  const cookieStore = cookies();
  const token = cookieStore.get("OutSideJWT");
  const user = verify(token.value, "secret");
  console.log(user, "this is the token");
  const { id } = params;
  // console.log(id, user.name, "baraqa baraqa da yvelaferi");

  if (id.split("%20").join(" ") === user.name) {
    const loggedUser = await User.findOne({ name: id.split("%20").join(" ") });
    return (
      <div>
        {/* {id}{" "}
        <div>
          <CreatePost />
          {loggedUser.posts.map((post, i) => {
            return (
              <h3>
                {post.newPost} : {i}
              </h3>
            );
          })}
        </div> */}
        {/* <h2>hello world</h2> */}

        <PAG user={loggedUser} />
      </div>
    );
  } else {
    return <div>incorrect</div>;
  }
};

export default Post;
