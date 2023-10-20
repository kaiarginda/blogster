"use client";

import { Metrophobic } from "next/font/google";
import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
// *119#
import Link from "next/link";
import User from "@/app/models/User";
import { connectMongoDB } from "@/mongo";
const Register = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState("");

  const [profession, setProfession] = useState("");

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
  const router = useRouter();
  const submitHandler = async (e) => {
    e.preventDefault();
    router.push(`/register/${name}`);

    await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ name, password, image, profession }),
    });

    setProfession("");
    setName("");
    setPassword("");
    router.refresh();
  };
  return (
    <div className="bg-red-300 min-h-screen flex items-center justify-center flex-col gap-3 ">
      <form
        action=""
        onSubmit={submitHandler}
        className="bg-red-300 p-6 rounded-md shadow-lg flex flex-col gap-4 justify-center items-center"
      >
        <h1 className="text-4xl font-bold text-white bg-red-300 py-2 px-4 rounded-md">
          Register
        </h1>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter Your Name"
          className="border-2 border-red-600 px-4 py-2 rounded-md focus:outline-none"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter Your Password"
          className="border-2 border-red-600 px-4 py-2 rounded-md focus:outline-none"
        />
        <input
          className="border-2 border-red-600 px-4 py-2 rounded-md focus:outline-none"
          placeholder="Enter Your Profession"
          type="text"
          value={profession}
          onChange={(e) => setProfession(e.target.value)}
        />
        <div className="flex flex-col items-center">
          <h1 className="text-lg text-white font-semibold mb-2">
            Upload Image: (optional)
          </h1>
          <input
            type="file"
            onChange={covertTo64}
            accept="image/*"
            className="mb-2"
          />
          {image ? (
            <p className="text-red-700 font-semibold">
              Image Attached: {image.name}
            </p>
          ) : (
            <p className="text-red-700 font-semibold">No Image Attached</p>
          )}
        </div>
        <button
          type="submit"
          className="border-2 rounded-md border-red-900 py-2 px-6 bg-red-600 hover:bg-red-700 text-white font-semibold transition duration-300 ease-in-out"
        >
          Register
        </button>
        <Link href="/login" className="text-red-700 hover:underline">
          Have An Account? Login Now!
        </Link>
      </form>
    </div>
  );
};

export default Register;
