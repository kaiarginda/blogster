"use client";
import React from "react";
import Link from "next/link";
import { useState, useEffect } from "react";
import User from "@/app/models/User";
import PostList from "./PostList";
import PrivatePage from "./Img";
import { Audio, Dna } from "react-loader-spinner";

import { useRouter } from "next/navigation";
const CreatePost = ({ name }) => {
  const router = useRouter();
  const [post, setPost] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);

  function covertTo64(e) {
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      console.log(reader.result);
      setImage(reader.result);
    };
    reader.onerror = (error) => {
      console.log("error", error);
    };
    console.log(e);
  }

  const clickHandler = async (e) => {
    e.preventDefault();

    // Get the selected optio
    // document.getElementById("selectedValue").textContent = selectedValue;

    if (!post || !description || !image || !topic) {
      alert(
        "naming post, writing description and uploading image is required!"
      );
      return;
    }

    setLoading(true);
    // http://localhost:3000
    await fetch("/api/create", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        shit: window.location.href,
        post,
        description,
        image,
        topic,
      }),
    });
    setPost("");
    setDescription("");
    setImage("");
    setTopic("");
    setLoading(false);
    // router.refresh();
    window.location.reload();
    // Window.location.reload()
  };
  return (
    <div className="p-4 rounded-md shadow-md bg-red-300">
      <form
        onSubmit={clickHandler}
        className="p-4 flex flex-col gap-4 items-center"
      >
        <h2 className="text-2xl font-bold text-red-700 py-2 mb-5">
          Create Post:
        </h2>

        <input
          type="text"
          value={post}
          onChange={(e) => setPost(e.target.value)}
          placeholder="Title"
          className="border-2 border-transparent p-3 rounded-md w-full focus:outline-none focus:border-blue-400"
        />
        <textarea
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Write your story here..."
          className="border-2 border-transparent h-64 w-full px-3 py-2 rounded-md resize-none focus:outline-none focus:border-blue-400"
        />

        <div className="p-4 rounded-md bg-red-300">
          <h3 className="text-xl font-bold text-red-700 mb-2">
            Upload Image For The Post
          </h3>
          <label className="w-full flex items-center justify-center bg-red-300 text-white rounded-md cursor-pointer hover:bg-red-500 transition duration-300 ease-in-out">
            <input
              type="file"
              onChange={covertTo64}
              accept="image/*"
              className="hidden"
            />
            {image ? (
              <p className="py-2 px-4">Image Selected! </p>
            ) : (
              <span className="py-2 px-4">Choose Image</span>
            )}
          </label>
        </div>

        <div>
          <h1 className="text-red-700">Topic:</h1>
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="border-2 border-transparent p-3 rounded-md w-full focus:outline-none focus:border-blue-400"
          />
        </div>

        <button
          type="submit"
          className="rounded-md uppercase bg-red-700 text-white px-3 py-1 hover:bg-red-500 transform transition-transform hover:scale-105 duration-300 ease-in-out"
        >
          Submit
        </button>
      </form>

      <div className="flex justify-center items-center">
        {loading ? (
          <p className="flex flex-col items-center justify-center">
            <span> please wait until we submit the post... </span>
            <Dna
              visible={true}
              height="80"
              width="80"
              ariaLabel="dna-loading"
              wrapperStyle={{}}
              wrapperClass="dna-wrapper"
            />
          </p>
        ) : null}
      </div>
    </div>
  );
};

export default CreatePost;
