import Image from "next/image";
import React from "react";

const Logo = () => {
  return (
    <div className=" flex items-center  ">
      <div className="size-16 flex items-center justify-center mb-1 overflow-hidden relative ">
        <Image src="/timeflow.svg" fill alt="Mascot" />
      </div>
      <h1 className="text-lg font-extrabold tracking-wide">TimeFlow</h1>
    </div>
  );
};

export default Logo;
