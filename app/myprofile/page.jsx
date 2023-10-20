import React from "react";
import { cookies } from "next/headers";
import { verify } from "jsonwebtoken";
import User from "../models/User";
import Link from "next/link";
const page = async () => {
  const cookieStore = cookies();

  const token = cookieStore.get("OutSideJWT");

  if (token.value) {
    const loggedUser = verify(token.value, "secret");
    if (loggedUser) {
      const user = await User.findOne({ name: loggedUser.name });
      return (
        <div className="bg-gray-100 min-h-screen flex flex-col justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-md w-96 text-center">
            <img
              src={user.profilePic}
              alt={user.name}
              className="w-32 h-32 mx-auto rounded-full mb-4"
            />
            <h1 className="text-2xl font-bold mb-4">{user.name}</h1>
            <div className="flex justify-between mb-2">
              <div className="flex items-center">
                {/* You can replace the empty div with a React icon component */}
                <div className="w-6 h-6 bg-gray-300 rounded-full mr-2"></div>
                <span>{user.posts.length} Posts</span>
              </div>
              <div className="flex items-center">
                {/* You can replace the empty div with a React icon component */}
                <div className="w-6 h-6 bg-green-300 rounded-full mr-2"></div>
                {/* <span>{userData.commentCount} Comments</span> */}
                Active Now
              </div>
            </div>
            {/* Add more information or buttons as needed */}
            <Link href="/" className="text-blue-500 hover:underline pt-8">
              Go Back To Dashboard
            </Link>
          </div>
        </div>
      );
    }
  } else {
    return <h1>You Aint Logged In Fam</h1>;
  }
};

export default page;
