import Link from "next/link";
import React from "react";

const PageNotFound = () => {
  return (
    <div className="flex flex-1 items-center h-screen justify-center flex-col">
      <h1 className="text-2xl font-extrabold text-neutral-400">
        Page Not Found
      </h1>

      <div className="flex flex-col gap-2 items-center justify-center">
        <h1 className="text-lg font-bold text-neutral-300">
          The page you are looking for does not exist.
        </h1>
        {/* Add a go back home page */}
        <Link href="/" className="text-lg font-bold text-neutral-800">
          Go back home
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;
