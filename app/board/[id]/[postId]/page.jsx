import React from "react";
import User from "@/app/models/User";
import { connectMongoDB } from "@/mongo";
import Link from "next/link";
import { cookies } from "next/headers";
import { verify } from "jsonwebtoken";
import Comment from "@/components/Comment";
const page = async ({ params }) => {
  // await connectMongoDB();
  const { id, postId } = params;
  // console.log(postId, "from post fucking id");
  const user = await User.findOne({ _id: id });
  // const users = await User.find();
  // console.log(user, "this is the real user fr");
  //
  {
    if (!user.postComments[postId]) {
      user.postComments[postId] = [];
    }
  }
  const cookieStore = cookies();
  const token = cookieStore.get("OutSideJWT");
  if (!token) {
    return (
      <div className="flex flex-col items-center justify-center">
        <div className="p-4 lg:w-4/5 xl:w-3/5 mx-auto">
          <img
            src={user.profilePic}
            alt=""
            className="rounded-full h-16 lg:h-20 xl:h-24 mx-auto"
          />
          <p className="font-bold text-xl text-center">{user.name}</p>
          <p className="pt-2 text-center">
            Posted On: {user.postDate[postId].newDate.getDay()}/
            {user.postDate[postId].newDate.getMonth()}/
            {user.postDate[postId].newDate.getFullYear()}
          </p>
          <div className="flex gap-2 text-xl font-bold font-mono text-slate-700 text-center justify-center items-center">
            <p>{user.postTopics[postId].newTopic}</p>
          </div>
          <span className="text-3xl text-center block">
            {user.posts[postId].newPost}
          </span>
          <img
            src={user.image[postId].newImage}
            alt=""
            className="w-full lg:w-4/5 mx-auto"
          />
          <div className="py-4 text-gray-600 text-lg text-center">
            <span className="max-w-full lg:max-w-4/5 mx-auto">
              {user.description[postId].newDescription}
            </span>
          </div>
        </div>
        <h1 className="p-4 text-3xl">No Comments to this post</h1>
        <Link
          href="/"
          className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded inline-flex items-center mt-4"
        >
          Go Back To Dashboard
        </Link>
        {/* Rest of your code */}
      </div>
    );
  } else {
    const loggedUser = verify(token.value, "secret");
    if (loggedUser) {
      return (
        <div className="flex flex-col items-center justify-center">
          <div className="p-4 lg:w-4/5 xl:w-3/5 mx-auto">
            <img
              src={user.profilePic}
              alt=""
              className="rounded-full h-16 lg:h-20 xl:h-24 mx-auto"
            />
            <p className="font-bold text-xl text-center">{user.name}</p>
            <p className="pt-2 text-center">
              Posted On: {user.postDate[postId].newDate.getDay()}/
              {user.postDate[postId].newDate.getMonth()}/
              {user.postDate[postId].newDate.getFullYear()}
            </p>
            <div className="flex gap-2 text-xl font-bold font-mono text-slate-700 text-center justify-center items-center">
              <p>{user.postTopics[postId].newTopic}</p>
            </div>
            <span className="text-3xl text-center block">
              {user.posts[postId].newPost}
            </span>
            <img
              src={user.image[postId].newImage}
              alt=""
              className="w-full lg:w-4/5 mx-auto"
            />
            <div className="py-4 text-gray-600 text-lg text-center">
              <span className="max-w-full lg:max-w-4/5 mx-auto">
                {user.description[postId].newDescription}
              </span>
            </div>
          </div>
          {/* Rest of your code */}

          <Link
            href="/"
            className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded inline-flex items-center mt-4"
          >
            Go Back To Dashboard
          </Link>
          <h1 className="p-4 text-3xl">Share Your Opinion On This Post:</h1>
          <Comment
            user={loggedUser}
            postId={postId}
            userId={id}
            author={user}
          />

          {/* 
        <h1 className="p-4 text-3xl">
          Read What Other People Think About This Post
        </h1> */}
          {user.postComments[postId].length == 0 ? (
            <h1 className="p-4 text-3xl">No Comments to this post</h1>
          ) : (
            <h1 className="p-4 text-3xl">
              Read What Other People Think About This Post
            </h1>
          )}

          <div className="flex justify-start flex-col items-start pt-4">
            {user.postComments[postId].map((com) => {
              return (
                <div
                  className="w-11/12 bg-white rounded-lg p-4 shadow-md mb-4 max-w-[400px]"
                  style={{ wordWrap: "break-word" }}
                >
                  <div className="flex justify-start items-center mb-2">
                    <h1 className="text-lg font-semibold text-gray-800">
                      {com.author}
                    </h1>
                  </div>
                  <p className="text-gray-600">{com.text}</p>
                </div>
              );
            })}
          </div>

          {/* <div className="">
          <ul
            className=" gap-3
            justify-center items-center
         "
          ></ul>
        </div> */}
        </div>
      );
    }
  }
};

export default page;
