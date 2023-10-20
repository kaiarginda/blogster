"use client";
import React from "react";
import { useState } from "react";
const Img = () => {
  const [image, setImage] = useState("");

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
  return (
    <div>
      <input type="file" onChange={covertTo64} accept="image/*" />
      {image == "" || image == null ? (
        ""
      ) : (
        <img src={image} height={100} width={100} alt="" />
      )}
    </div>
  );
};

export default Img;
