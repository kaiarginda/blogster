import React from "react";
import { connectMongoDB } from "@/mongo";
import { cookies } from "next/headers";
import { verify } from "jsonwebtoken";
import User from "@/app/models/User";
import Link from "next/link";
import "../../def.css";
import Comment from "@/components/Comment";

const page = async ({ params }) => {
  await connectMongoDB();
  const cookieStore = cookies();
  const token = cookieStore.get("OutSideJWT");

  if (token) {
    const user = verify(token.value, "secret");
    const { id } = params;
    const name = user.name;
    const realUser = await User.findOne({ name });

    return (
      <div className="flex flex-col items-center justify-center space-y-6 py-6 bg-gray-100 min-h-screen">
        {/* <div className="text-center">
          <h1 className="text-4xl font-bold text-slate-900">
            Your Post About: {realUser.postTopics[id].newTopic}
          </h1>
        </div> */}

        <div className="flex items-center space-x-4">
          <img
            className="w-12 h-12 rounded-full border-2 border-slate-900"
            src={realUser.profilePic}
            alt={realUser.name}
          />
          <div className="text-left">
            <h2 className="text-lg font-medium text-gray-700">
              {realUser.name}
            </h2>
            <p className="text-sm text-gray-500">{realUser.profession}</p>
          </div>
        </div>

        <h1 className="text-3xl font-bold text-slate-900">
          {realUser.posts[id].newPost}
        </h1>

        <img
          className="w-full rounded-md"
          src={realUser.image[id].newImage}
          alt=""
        />

        <div className="text-center">
          <p className="text-gray-500 text-sm">
            Posted On:{" "}
            {`${realUser.postDate[id].newDate.getDate()}/${
              realUser.postDate[id].newDate.getMonth() + 1
            }/${realUser.postDate[
              id
            ].newDate.getFullYear()} ${realUser.postDate[
              id
            ].newDate.toLocaleTimeString()}`}
          </p>
        </div>

        <div>
          <p className="text-2xl text-slate-700 uppercase">
            {realUser.postTopics[id].newTopic}
          </p>
        </div>

        <div className="w-full">
          <p className="text-justify text-base text-slate-600 font-medium p-8">
            {realUser.description[id].newDescription}
          </p>
        </div>

        {/* <Parent user={realUser} id={id} /> */}
        {/* <Comment user={realUser} /> */}
        {/* <Link href={`/login/dashboard/${realUser.name}`}>
          Go Back To Your Dashboard
        </Link> */}

        <Link
          href={`/login/dashboard/${realUser.name}`}
          className="block mt-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition duration-300 ease-in-out"
        >
          Go Back To Your Dashboard
        </Link>
      </div>
    );
  } else {
    return <h1>INVALID CREDEWNTIALS</h1>;
  }
};

export default page;

{
  /* 
 <li className="  flex flex-col  justify-center items-center text-left  border-slate-500 p-4 w-[600px]">
          <h3 className="text-slate-950 flex items-center gap-2">
            {" "}
            <img
              className="h-10 w-10 rounded-[50%] border-2 border-slate-950 "
              src={realUser.profilePic}
              // src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAIkAoQMBIgACEQEDEQH/xAAbAAACAwEBAQAAAAAAAAAAAAADBAIFBgABB//EADkQAAICAgECBAQCCAQHAAAAAAECAAMEESEFEgYxQVETImFxFDIjM1JigZGh0RVCcrEHFjVDgsHw/8QAGQEAAwEBAQAAAAAAAAAAAAAAAQIDAAQF/8QAHhEBAQACAwEBAQEAAAAAAAAAAAECEQMhMUESMlH/2gAMAwEAAhEDEQA/AMkqwiicqwirKo7SQRhF3I1pDqszOCxO/JTusqJG+3iWBHapPsJj772fJdvLfABi5+Hw9aDOUW0kpojjf14lQfi0kqz6UjyYcf8A31lp0dzcvZbvkaJjGdWij4difZlGj/aR2pZWSvLd+iOfpPfw7BO48CW3wMRfmSzusB5BHO/9pX5z978Aj39I2wKHQOpAyZEgRzCzyWvTOsW4zqlzF6Sed+ayrnkIVvq3S2tXrYMrDYIkbBKfw3nL8L8G/DLypJ85cuI87Ts0VcQDeUacecWcQsA8E0K8E0DIzp08mE8oh0WQVYetYxBK1h1EiiwyrNpgMr5cW0jz7TMtj0/EsQIu2c6595r7k7qLFPqpEpvD1I/xCtDz2Hf2kuS6ivFNt50TpFGLg1oUDMVHcSPOedQ8P12qfgqe0/5d8CXWEn6JftG/h7HJInN269PmWZ4TtL/LwNwX/J1lp2z6+mp9IuoUcnmJXaU8DiLcrDzHGsBZ4arq0Nb+plXm9HFe98fwm/zAD6Sm6iiup7ppndtcMdMDbQUYj2i5HMt85Qrt7SqfzM6ca5cpofpZK9QxyP2xNrYOTMX0kb6jjj9+bewSmPiOZR4rYNmOWCKWHXlGAtZ5wDGGsOzF3gF53T2QnTMu0WHrGjIKIZBHTFUQyiCQQ6iBnEAqRKXw5Xa3XrEALBWOz7cy87eJHwsi1dS6kdfN3A7+klzfyvwf02+IQFAMaLbHEyOR4mx8ctXRu11Oj2jgGRp8cYNTgZCuu/Mgb1OaSuu2baPJ71PMTZu/zhMbrnT+pVd2Lcrj29RI96KTxEyh8fCOXUOwnjcy/VbtBlG+fOXnV+pUYwPxHVT7EzHdT6zjMCK/nJ9hDjjbQzzkis6i+9yrcbjN+R8Uk60D6RYnc6ZHLldnvD6FurU/TZ/pNnZMn4ZAHU+5iAqoeTNdZ5SuPiOfpO2J3RyyKXQgTsi7w9sXfcAobnTyeTC0yCHRYNBDoIySaCEAniiTAmZIcRnDpVOq2FBo244BA8tg63/WL64ljhJvqFDn1x+fv3SHP8dPB9L9RwaMLDINItew/k7QdmUHXcG/A+CpShBaqsFVO46O98ng60N8es+kPj13L2ugYMNHj0i+Z0qg4wXbaU7Vd8A/QSWN/wBWym/GP6B09qsofowGKKzFV7e3Y9fSaTq5GN05rtcgbk8DCOMXcj8x9fOB8SOP8HvGvJTJX1aPk+dmW52Y72knk8ewljndL/A4uLZWys1yhuFDAee+fpxx9ZTVN22bHnuazBsXIxglh7teQnRv8ufX6Ze3uL9l6DnyYjREUZOxiJf9QwFS0solNkrqyNLsuWOi6k6IB1vzm5wHL9Ox2Y7JrExmHT8fISry72Am7Fa11rWn5VGhHxRzLWRS6OWesUujlI2iALdqkRi6KWeUAvPiD2nQc9mFq6xGEEEkOsZFNYQSKiEAmF2uI708suVjNr5WDLv6jWv/AHFAJ58V67sYg/KtwJ/jxJ8mO8VeLLWTcUa7RJWKCRvygMR+5FjDnicjt0Rym7W0B5yo69W7dJv481Mseq/iVpNmIqPZxw/kPrKbr3UcjG6FYuYqLYwI1Wdg+xET6p5HyazaWEexl30rIIHaDKPl2PdvZMs+nr8Mczoy8c+Hq3zSDXsnnUzGU3dYTLbNyf0ZXfOpSOdkzYQOS9n/AA/SLuqVBvJdt/KbJhxK3oXS6sSpcjbNa6+vpLRxoToxnTlyu6Tt9YpaNxy3zMStJ9I1CE7RzF7ANQ9p5i1jcQGgfaJ0j3fWdALYViHUQSQyxkU1hVEgsIswpRfNQtj2Bfza2PuIyJxUHgjia9tvXbRdJt+Li1WA8MgP9IbLylpUlzr6Sg8P5QrqfDc/PQ2l/wBPp/Tj+EssoDJTtBBPp9JwZzVejx3cV+Z1HJzCUxUcKN86lW1XU7M2unIqd6ShKlhsAmW9nSshatNm3WoeWC6XX95VZWDkb7FyrVqO99p1/OCRWTbGda6bdjZbudHR50RFRa4Q7BBEf65jJQ5WlrCfUkwOG9NeJYLgSx8t+kr8RymslbZcz73B49fx8mupeS7ASLnkkS78JYbXZhyyPkq4HHmTxK4xz5VrK1CIAvAHAEhdDaAEBcNyrnJWnmLWDjmM3DURuciYwNiA7idqgWD2h7LGEUtYk7MwxPSfSdF9n3nsA6bVBCgSNcJHRSWFWDWEEApgT0zhJamFW59V1bpl4Y/TVeaj/OvtLjo2fXl0hkb5t/Mp8wfrM74l6v8A4ciU0MPj2Ef+K+80OT0prAM3Ab4WSQCeOLPv/ec3NNuvgtk7W7fEdCEbR9DM11XpXVbrWc2V9pPA3DU+JFx8n8Lm1mm0efcOP4GSzvEOJ2bFqlmEhJY6dys1mdLtrpY33L3a1rXnM1lqayw3wfSXvV+sJcrBH3qZa69rOJXCX6jyWfAydnU+g9EqSrpWMKwBtATr1Jnz9R6+svPDXV2xskYl7bpsOlJP5DLRz5zcbBjAWtDMRvmKWNsyiQFplfkj1j9sQyD8pmNCVhizmHsaLOYBRnsjudAOm4Q8Qq8wSwiyiIohFggdefGveL3dXwKDqzKrBHoDswCsVifWOpV9Mw2ubRc8Vp7n+0o87xUASuBXv99x/sJns3Oyc+0WZVneyjSjWgB9otyiuPHb6DmZN2Te997dzsdkmfa+i3rldOx7VO1etTx9p8Pfyn0f/h31QWdP/B2N89R+X7SGXbonVaLq/S8fM2bKUc/vKCJnsrwzgOrN+H7HHPyk6mzJ2PeJZyt8JuzW9aEmZ8j6viU4+Q1dO9CVi186mj6r026q+xrCWYne9SoSvRO/SVlTs7KsuoHkNxsfaNONkwDLzCGm06X1Fc3BRiR8VR2uPXcKz/WYNWZG2rFT7g6lhjdYyatLY3xE/e8/5yn6RuDSW2RDIfgiDr6hTevDdrfsmDuff2h2EmgrGi7mEcwDGY0dudI7nQC1mT1bExeHtDN+ynJlVk+Jb3HbjVrWPduTKKcPKC5U048YZvzsrI/XZFjfTu4i/E89JwibPNPfsZIakTPVmPHWeW5YeHc84HUUfu0GOjK+z8pnlX6yv7za2F9fbsDLXJx1dSDsTsm0BTuVPhf/AKav2EfyfyyVMzHXrO5CqjbGZTIx2pr7nGixms6h+tP8ZS9e/wCzNGsUjUkdpI4Ji2UAtrAenEtb/wBTV/qEqcr9dZ9zKQhY+c8nes6Mm7cNVkWJ69w9jAiewxtbODIRx56aeExT1h0/KIQqc6RnTA//2Q=="
              alt=""
            />
            <div className="flex   flex-col">
              <h1 className="font-normal font-normal text-lg text-gray-600">
                {realUser.profession}
              </h1>
              <p className="text-md font-thin text-gray-500">
                {" "}
                {realUser.name}
              </p>
            </div>
          </h3>{" "}
          <h1 className="text-left flex justify-start text-3xl pb-4  py-2 text-black font-bold text-center">
            {realUser.posts[id].newPost}
          </h1>
          <img
            className="w-[100%] rounded-[8%]"
            src={realUser.image[id].newImage}
            alt=""
          />
          <div className="flex flex-col items-center w-[100%] justify-center">
            <p className="pt-2">
              
              Posted On: {realUser.postDate[id].newDate.getDay()}/
              {realUser.postDate[id].newDate.getMonth()}/
              {realUser.postDate[id].newDate.getFullYear()}/
              {realUser.postDate[id].newDate.getSeconds()}
            </p>
            <div className="flex gap-2 text-xl font-bold font-mono text-slate-700 ">
       
              <p className="uppercase">{realUser.postTopics[id].newTopic} </p>
            </div>

            <div className="flex items-end justify-center box-border">
              <p className="text-gray-600 font-normal text-lg  w-[40%] box-border">
                {realUser.description[id].newDescription}
              </p>
            </div>

            <p className="text-left  py-2 text-stone-500"> </p>
          </div>
        </li>

real
real
real
  <div className="flex justify-center  flex-col items-center ">
        <h1 className="text text-7xl">
          Your Post About: {realUser.postTopics[id].newTopic}
        </h1>
      
        <div className="text-slate-950 flex items-center gap-2">
          {" "}
          <img
            className="h-10 w-10 rounded-[50%] border-2 border-slate-950 "
            src={realUser.profilePic}
            // src="data:image/jpeg;base64,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"
            alt=""
          />
          <div className="flex   flex-col">
            <h1 className="font-normal font-normal text-lg text-gray-600">
              {realUser.profession}
            </h1>
            <p className="text-md font-thin text-gray-500"> {realUser.name}</p>
          </div>
        </div>{" "}
        <h1 className="text-left flex justify-start text-3xl pb-4  py-2 text-black font-bold text-center">
          {realUser.posts[id].newPost}
        </h1>
        <img
          className="w-[50%] rounded-[8%]"
          src={realUser.image[id].newImage}
          alt=""
        />
        <div className="overflow-hidden flex flex-col items-center justify-center gap-3">
          <p className="pt-2">
            Posted On: {realUser.postDate[id].newDate.getDay()}/
            {realUser.postDate[id].newDate.getMonth()}/
            {realUser.postDate[id].newDate.getFullYear()}/
            {realUser.postDate[id].newDate.getSeconds()}
          </p>
          <div className="">
            <p className="uppercase text-4xl text-slate-700">
              {realUser.postTopics[id].newTopic}{" "}
            </p>
          </div>

          <div className="">
          
            <p className="w-[674.5px] text-center overflow-wrap-break-word text-slate-600 font-medium">
              {realUser.description[id].newDescription}
            </p>
          </div>

        
        </div>
      </div>


*/
}
