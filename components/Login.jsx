"use client";

import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
const Login = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const submitHandler = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ name, password }),
      });

      // router.redirect("/dashboard");
      // setLoading(true);

      router.push(`/login/dashboard/${name}`);
    } catch (error) {
      console.log(error.message);
    }

    setName("");
    setPassword("");
    router.refresh();
  };
  return (
    <div className="bg-red-300 p-6 rounded-md shadow-lg h-[100vh]">
      <h1 className="text-3xl text-white font-bold mb-4">Login</h1>
      {!loading ? (
        <form
          action=""
          onSubmit={submitHandler}
          className="flex flex-col gap-4 justify-center items-center animate__animated animate__fadeIn animate__fast"
        >
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter Your Name"
            className="border-2 border-red-600 px-4 py-2 rounded-md placeholder-text-gray-600 focus:outline-none"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Your Password"
            className="border-2 border-red-600 px-4 py-2 rounded-md placeholder-text-gray-600 focus:outline-none"
          />

          <button
            className="border-2 rounded-md border-yellow-500 py-2 px-6 bg-red-600 hover:bg-red-700 text-white font-semibold transform hover:scale-105 transition-all duration-300 ease-in-out focus:outline-none"
            type="submit"
          >
            Submit
          </button>

          <Link href="/register" className="text-red-700 hover:underline">
            Don't Have An Account? Register Now!
          </Link>
        </form>
      ) : (
        // <p>loading</p>
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
      )}
    </div>
  );
};

export default Login;