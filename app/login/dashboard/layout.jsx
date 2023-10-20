

// export default layout;
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function DashboardLayout({ children }) {
  const [isSuccess, setIsSuccess] = useState(false);
  const { push } = useRouter();
  const [fail, setFail] = useState(false);
  useEffect(() => {
    (async () => {
      const { user, error } = await getUser();
      // console.log("user:", JSON.stringify(user), "error:", error);
      // if the error did not happen, if everything is alright
      if (!user) {
        // push("/");
        setFail(true);
        return;
      }

      setIsSuccess(true);
    })();
  }, [push]);

  if (!isSuccess) {
    // return <p>Loading...</p>;
    if (fail) {
      return (
     
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold">Oops!</strong>
          <span className="block sm:inline mr-4">
            {" "}
            Incorrect username or password.
          </span>
          <Link
            href="/login"
            className="mt-2 mr-4 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
          >
            Try Again
          </Link>
        </div>
      );
    }
    return (
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
    );
  }

  return (
    <main>
      {/* <header>
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/dashboard/settings">Settings</Link>
      </header> */}
      {children}
    </main>
  );
}

async function getUser() {
  const data = await fetch("/api/me");
  // console.log(data, "real fetched data fr");

  if (!data.ok) {
    return {
      user: null,
      error: "invalid.",
    };
  } else {
    return {
      user: data,
      error: null,
    };
  }
}
