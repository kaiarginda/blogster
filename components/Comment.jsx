"use client";
import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
const Comment = ({ user, userId, postId, author }) => {
  console.log("post id of:", userId, postId, user);
  const router = useRouter();
  const [comment, setComment] = useState("");
  const onSubmit = async (e) => {
    e.preventDefault();
    // http://localhost:3000/api/comment
    await fetch("/api/comment", {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        comment,
        postId,
        userId,
        name: author.name,
        comAuthor: user,
        commentArray: author.postComments,
      }),
    });
    setComment("");
    router.refresh();
  };
  return (
    <div className="pt-4">
      <form action="" onSubmit={onSubmit}>
        <input
          type="text"
          value={comment}
          placeholder="Comment"
          onChange={(e) => {
            setComment(e.target.value);
          }}
          className="w-full p-3 rounded border border-gray-300 shadow"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-3 rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </form>

      {/* {author.postComments.map((com) => {
        return <h1>{com.text}</h1>;
      })} */}
    </div>
  );
};

export default Comment;
