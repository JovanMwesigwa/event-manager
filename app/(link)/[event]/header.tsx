import React from "react";

const Header = () => {
  return (
    <header className="h-12 w-full hidden fixed md:block border-b top-0 px-4 ">
      <div className="h-full lg:max-w-screen-lg mx-auto flex items-center">
        <div className=" pl-4 flex items-center gap-x-3">
          {/* <Image src="/mascot.svg" height={40} width={40} alt="Mascot" /> */}
          <div className="w-8 h-8 bg-neutral-300 rounded-full"></div>
          <h1 className=" tracking-wide font-extrabold">EventManager</h1>
        </div>
      </div>
    </header>
  );
};

export default Header;
