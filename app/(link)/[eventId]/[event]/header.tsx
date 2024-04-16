import { ClerkLoaded, ClerkLoading, UserButton } from "@clerk/nextjs";
import { Loader } from "lucide-react";
import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <header className="h-12 w-full hidden items-center justify-between fixed md:flex border-b top-0 px-4 z-20 bg-neutral-50">
      <div className="h-full lg:max-w-screen-lg mx-auto flex flex-1 items-center justify-between ">
        <Link href="/events">
          <div className=" pl-4 flex items-center gap-x-3">
            {/* <Image src="/mascot.svg" height={40} width={40} alt="Mascot" /> */}
            <div className="w-8 h-8 bg-neutral-300 rounded-full"></div>
            <h1 className=" tracking-wide font-extrabold">EventManager</h1>
          </div>
        </Link>

        <div className="p-4">
          <ClerkLoading>
            <Loader className="w-5 h-5 text-muted-foreground animate-spin" />
          </ClerkLoading>

          <ClerkLoaded>
            <UserButton afterSignOutUrl="/" />
          </ClerkLoaded>
        </div>
      </div>
    </header>
  );
};

export default Header;
