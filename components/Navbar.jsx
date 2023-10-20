import React from "react";
import Link from "next/link";
import { cookies } from "next/headers";
import { verify } from "jsonwebtoken";
import Logout from "./Logout";
const Navbar = () => {
  const cookieStore = cookies();
  const token = cookieStore.get("OutSideJWT");

  if (!token) {
    return (
      <div className="flex items-center justify-between px-10 mb-10 shadow-lg bg-red-300">
        <div className="flex items-center">
          <div>
            <img
              className="h-[200px] w-[250px]"
              src="https://blog.hubspot.com/hubfs/assets/hubspot.com/web-team/WBZ/Blog%202021/Images/Icons/Sprocket.svg"
              alt="profile-image"
            />
          </div>
          <ul className=" flex justify-between items-center gap-10 text-1xl ">
            <li className="cursor-pointer font-bold hover:font-normal transition-all transition">
              <Link href="about-us">ABOUT US</Link>
            </li>
          </ul>
        </div>
        <div className="flex items-center gap-10">
          <Link
            href="/register"
            className="text-white border-2 border-blue-700  bg-blue-700 px-4 py-2 rounded-lg"
          >
            REGISTER
          </Link>
          <Link href="/login" className=" rounded-lg">
            LOGIN
          </Link>
        </div>
      </div>
    );
  } else {
    const user = verify(token.value, "secret");
    if (user) {
      return (
        <div className="flex items-center justify-between px-10 mb-10 shadow-lg bg-red-300">
          <div className="flex items-center">
            <div>
              <img
                className="h-[200px] w-[250px]"
                src="https://blog.hubspot.com/hubfs/assets/hubspot.com/web-team/WBZ/Blog%202021/Images/Icons/Sprocket.svg"
                alt=""
              />
            </div>
            <ul className=" flex justify-between items-center gap-10 text-1xl ">
              <li className="cursor-pointer font-bold hover:font-normal transition-all transition">
                <Link href={`/myprofile`}>YOUR PROFILE</Link>
              </li>
              <li className="cursor-pointer font-bold hover:font-normal transition-all transition">
                <Link href={`/about-us`}>ABOUT US</Link>
              </li>
              <li className="cursor-pointer font-bold hover:font-normal transition-all transition">
                <Link href={`/login/dashboard/${user.name}`}>CREATE POST</Link>
              </li>
            </ul>
          </div>
          <div className="flex items-center gap-10">
            <Logout />
          
          </div>
        </div>
      );
    }
  }
};


export default Navbar;
