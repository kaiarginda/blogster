import React from "react";
import Link from "next/link";
const page = () => {
  return (
    <div className="bg-gray-100 p-6 h-[100vh] flex flex-col items-center justify-center overflow-x-hidden">
      <div className="container mx-auto text-center py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">About Us</h1>
        <p className="text-lg text-gray-600 mb-8">
          Welcome to our blog! We are a passionate team of writers and content
          creators who are dedicated to bringing you insightful and engaging
          articles on a variety of topics.
        </p>
        <p className="text-lg text-gray-600 mb-8">
          Our mission is to inform, inspire, and entertain our readers. We cover
          a wide range of subjects, including technology, travel, lifestyle, and
          more. We believe in the power of words and strive to deliver content
          that resonates with you.
        </p>
        <p className="text-lg text-gray-600 mb-8">
          We are committed to delivering high-quality, well-researched, and
          thought-provoking articles. Our team is made up of talented writers,
          editors, and designers who work together to make this blog an
          enriching experience for our readers.
        </p>
        <p className="text-lg text-gray-600">
          Thank you for visiting our blog, and we hope you enjoy your time here.
          If you have any questions or suggestions, please feel free to reach
          out to us.
        </p>
      </div>
      <div className="bg-gray-100 flex justify-center items-center p-3 w-[100vw]">
        <Link
          href="/"
          className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded inline-flex items-center mt-4"
        >
          Go Back To Dashboard
        </Link>
      </div>
    </div>
  );
};

export default page;
