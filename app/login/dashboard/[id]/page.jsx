// import Post from "./layout";
// import User from "@/app/models/User";
// import React from "react";
// import { cookies } from "next/headers";
// import { verify } from "jsonwebtoken";
// const page = () => {
//   const posts = getUser();
//   const handler = () => {};
//   return (
//     <div>
//       {/* <Post /> */}
//       <h2 onClick={handler}>Handler</h2>
//     </div>
//   );
// };

// const getUser = async () => {
//   const cookieStore = cookies();
//   const token = cookieStore.get("OutSideJWT");
//   const user = verify(token.value, "secret");
//   console.log("verified user: from postlist", user.name);
//   const useri = await User.findOne({ name: user.name });
//   console.log(useri.posts);
//   return useri.posts;
// };

// export default page;
"use client";
import User from "@/app/models/User";
import React from "react";
import { useRouter } from "next/navigation";
import CreatePost from "@/components/CreatePost";
import { AiFillDelete } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import { serialize } from "cookie";
import Cookies from "cookies";
import { connectMongoDB } from "@/mongo";
import PrivatePage from "@/components/Img";
import { useState, useEffect } from "react";
import { Audio, Dna } from "react-loader-spinner";
import Link from "next/link";
const PAG = (user) => {
  const [send, setSend] = useState(false);
  const [title, setTitle] = useState("");
  const [index, setIndex] = useState("");
  const [loading, setLoading] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [loadingIndex, setLoadingIndex] = useState("");
  const posts = user.user.posts;
  const description = user.user.description;
  const images = user.user.image;
  const router = useRouter();
  const readMoreHandler = (i) => {
    router.push(`/dashboard/${i}`);
  };

  const handler = async () => {
    await fetch("/api/logout");

    router.push("/");
  };

  const deleteHandler = async (id) => {
    // setLoading(!loading);
    setDeleteLoading(true);
    setLoadingIndex(id);

    await fetch("/api/delete", {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ user: user.user, id }),
    });
    setDeleteLoading(false);
    setLoadingIndex("");

    window.location.reload();
  };

  const editHandler = async (id) => {
    setEditLoading(true);
    setLoadingIndex(id);
    setIndex(id);
    await fetch("/api/edit", {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ user: user.user, id, newTitle: title }),
    });
    setTitle("");
    // router.refresh();
    window.location.reload();
    setLoadingIndex("");

    setEditLoading(false);
  };
  if (!user.user) {
    return <h1>No user Found</h1>;
  }
  return (
    <div className="flex flex-col justify-center p-4">
      <div className="bg-red-300 rounded-lg p-4 shadow-md text-center">
        <img
          src={user.user.profilePic}
          className="w-32 h-32 mx-auto rounded-full object-cover"
          alt=""
        />
        <p className="text-xl font-semibold mt-4">{user.user.name}</p>
        <p className="text-gray-600 text-lg">{user.user.profession}</p>
      </div>

      <CreatePost />

      <div className="flex flex-col justify-center items-center py-10 gap-5">
        <h2 className="text-2xl font-bold text-slate-950">Your Posts:</h2>
        {posts.map((post, i) => {
          return (
            <div className="post-card border-2 border-slate-500 p-4 flex flex-col gap-3 transition duration-300 transform hover:scale-105">
              <h2 id={i + 1} className="text-3xl text-blue-600">
                {post.newPost}
              </h2>
              <div
                className="flex items-center gap-3"
                id={i + 1}
                // onClick={deleteHandler}
                // onClick={() => deleteHandler(i + 1)}
              >
                <div>
                  <AiFillDelete
                    className="text-4xl text-red-500 cursor-pointer hover:text-red-700"
                    id={i + 1}
                    onClick={() => deleteHandler(i + 1)}
                  />
                  {loadingIndex == i + 1 ? (
                    <Dna
                      visible={true}
                      height="80"
                      width="80"
                      ariaLabel="dna-loading"
                      wrapperStyle={{}}
                      wrapperClass="dna-wrapper"
                    />
                  ) : null}
                </div>
                <div>
                  <BiEdit
                    className={`text-4xl cursor-pointer ${
                      i + 1 === index
                        ? "text-green-500 hover:text-green-700"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                    id={i + 1}
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent the click event from propagating

                      if (index === i + 1) {
                        setIndex("");
                      } else {
                        setIndex(i + 1);
                      }
                    }}
                  />
                  {i + 1 === index ? (
                    <form
                      action=""
                      onSubmit={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        editHandler(i + 1);
                      }}
                      className="flex gap-3 items-center"
                    >
                      <input
                        type="text"
                        value={title}
                        placeholder="Update Title"
                        onChange={(e) => {
                          e.stopPropagation();
                          setTitle(e.target.value);
                        }}
                        className="border-2 border-slate-950 p-2 rounded-md"
                      />
                      <button
                        type="submit"
                        className="rounded-md bg-blue-500 text-white uppercase px-4 py-2 hover:bg-blue-700"
                      >
                        Submit
                      </button>
                    </form>
                  ) : null}
                </div>

                {/* <div className={` ${editLoading ? "animate-spin" : ""}`}>
                  {editLoading || index == i + 1 ? (
                    <div className="loader animate-spin rounded-full border-t-4 border-blue-500 border-4 h-12 w-12"></div>
                  ) : null}
                </div> */}

                <button
                  className="border-2 rounded-md border-red-500 py-2 px-6 bg-red-300 cursor-pointer hover:bg-red-400 hover:border-red-700 hover:text-white"
                  onClick={() => {
                    readMoreHandler(i);
                  }}
                  id={i}
                >
                  Read Article
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <h4 className="flex items-center justify-center p-4">
        <Link
          href="/"
          className="border-2 rounded-md border-red-950 py-2 px-6 bg-red-300 transition-transform hover:scale-105 hover:bg-red-500 hover:text-white hover:border-red-700"
        >
          Scroll Through Posts
        </Link>
      </h4>
      <h2
        className="flex justify-center items-center text-lg text-blue-700 cursor-pointer"
        onClick={handler}
      >
        <button className="border-2 rounded-md border-red-950 py-2 px-6 bg-red-300 transition-transform hover:scale-105 hover:bg-red-500 hover:text-white hover:border-red-700">
          LOG OUT
        </button>
      </h2>
    </div>
  );
};

export default PAG;
