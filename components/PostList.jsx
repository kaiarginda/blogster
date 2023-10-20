"use client";
import React from "react";
import Link from "next/link";
import { useState, useEffect } from "react";
import User from "@/app/models/User";
import PostList from "./PostList";
import { useRouter } from "next/navigation";
import { connectMongoDB } from "@/mongo";
const CreatePost = ({ name }) => {
  return (
    <div>
      <h3>POSTLIST</h3>
    </div>
  );
};

export default CreatePost;
