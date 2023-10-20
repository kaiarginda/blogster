"use client";
import React from "react";
import { useRouter } from "next/navigation";
const Logout = () => {
  const router = useRouter();
  const deleteHandler = async () => {
    await fetch("/api/logout");
    router.refresh();
  };
  return (
    <div>
    
      <button
        className="text-3xl bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg border-2 border-red-700 transition-transform transform hover:scale-105"
        onClick={deleteHandler}
      >
        Logout
      </button>
    </div>
  );
};

export default Logout;
