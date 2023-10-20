// import React from "react";
// import User from "@/app/models/User";
// import { connectMongoDB } from "@/mongo";
// const page = async ({ params }) => {
//   await connectMongoDB();
//   const { id } = params;
//   const exists = await User.findOne({ name: id });
//   if (exists) {
//     return <div>user with that name alreay exists</div>;
//   } else {
//     return <div>user created sucesfully</div>;
//   }
// };

// export default page;
import React from "react";
import User from "@/app/models/User";
import { connectMongoDB } from "@/mongo";
import Link from "next/link";

const page = async ({ params }) => {
  await connectMongoDB();
  const { id } = params;
  const exists = await User.findOne({ name: id });
  return (
    <div className="bg-blue-100 p-4 rounded-lg shadow-md text-center">
      {exists ? (
        <>
          <p className="text-2xl text-red-500">
            Oops! This name is already taken.
          </p>
          <p className="text-gray-600 mt-2">Please choose a different name.</p>
          {/* <Link href="/register">register with other name</Link> */}
          <Link href="/register" className="text-blue-500 hover:underline">
            Register with another name
          </Link>
        </>
      ) : (
        <>
          <p className="text-2xl text-green-500">
            Hooray! User created successfully.
          </p>
          <p className="text-gray-600 mt-2">Welcome to our platform.</p>
          <Link href="/login" className="text-blue-500 hover:underline">
            Start Scrolling!
          </Link>
        </>
      )}
    </div>
  );
};

export default page;
