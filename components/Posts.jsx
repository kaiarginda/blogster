import User from "@/app/models/User";
import React from "react";
import { connectMongoDB } from "@/mongo";

import Link from "next/link";
const Posts = async () => {
  // await connectMongoDB();
  const users = await User.find();
  return (
    <div className="flex items-start justify-center p-10">
      <div className="flex justify-center items-center w-8/12">
        <ul className="flex flex-col gap-15 w-11/12">
          <h1 className="underline text-2xl text-amber-900">
            SEE WHAT OTHER PEOPLE THINK
          </h1>

          <div className="flex flex-col items-center justify-center gap-8 pt-4">
            {/* {users.map((user) => (

                  );
                })} */}

            {users ? (
              users.map((user) => {
                return (
                  <div
                    key={user._id}
                    className="flex flex-col justify-center items-center gap-8"
                  >
                    {user.posts.map((post, index) => {
                      return (
                        <div
                          key={`${user._id}-${index}`}
                          className="w-full bg-white rounded-md shadow-md overflow-hidden border border-slate-500 flex flex-col gap-10"
                        >
                          <div className="p-4">
                            <img
                              className="w-full rounded-[8%]"
                              src={user.image[index].newImage}
                              alt=""
                            />
                            <p className="pt-2">
                              Posted On: {new Date().getDate()}/
                              {new Date().getMonth()}/{new Date().getFullYear()}
                            </p>
                            <div className="flex gap-2 text-xl font-bold font-mono text-slate-700">
                              <p>{user.postTopics[index].newTopic}</p>
                            </div>
                            <h1 className="text-3xl font-bold py-2 text-slate-950">
                              {post.newPost}
                            </h1>
                            <div className="flex items-end">
                              <p className="text-slate-600 font-bold max-h-[48px] overflow-hidden">
                                {user.description[index].newDescription}
                              </p>
                              <span className="text-xl text-slate-950">
                                ...
                              </span>
                            </div>
                            <Link
                              href={`/board/${user._id}/${index}`}
                              className="block w-max mt-4 py-2 px-4 bg-red-300 text-white rounded-md hover:bg-red-500 transition duration-300 ease-in-out"
                            >
                              READ MORE
                            </Link>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              })
            ) : (
              <h1>no posts now</h1>
            )}

            {/* ))} */}
          </div>
        </ul>
      </div>
    </div>
  );
};

export default Posts;
