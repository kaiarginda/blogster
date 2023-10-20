"use client";

// import React from "react";
// import { useState, useEffect } from "react";
// const page = () => {
//   const [name, setName] = useState("");
//   const [password, setPassword] = useState("");
//   const submitHandler = async (e) => {
//     e.preventDefault();

//     const user = await fetch("");
//   };
//   return (
//     <div>
//       <form action="" onSubmit={submitHandler}>
//         <input
//           type="text"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//         />
//         <input
//           type="text"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />

//         <button type="submit">LOGIN</button>
//       </form>
//     </div>
//   );
// };

// export default page;

import React from "react";
import Login from "@/components/Login";
const page = () => {
  return (
    <div>
      <Login />
    </div>
  );
};

export default page;
