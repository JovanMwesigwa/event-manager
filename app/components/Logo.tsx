import Image from "next/image";
import React from "react";

const Logo = () => {
  return (
    <div className=" flex items-center  ">
      <Image src="/timeflow.svg" width={150} height={100} alt="Mascot" />
    </div>
  );
};

export default Logo;
