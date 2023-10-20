// import User from "@/app/models/User";
// import React from "react";
// import { cookies } from "next/headers";
// import { verify } from "jsonwebtoken";

// const PAGES = () => {
//   return (
//     <div>
//       <h1>YOUR MOM</h1>
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

// export default PAGES;
