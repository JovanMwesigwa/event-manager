import React, { ReactNode } from "react";
import ReactQueryProvider from "@/context/react-query-provider";
import Header from "../(link)/[event]/header";
import Footer from "../(link)/[event]/footer";

const EventLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-100 to-gray-50 relative">
      <Header />
      <main className="mt-12 flex flex-1 flex-col ">
        <div className="max-w-[999px] mx-auto flex  flex-1 flex-col w-full lg:flex-grow py-8 gap-2 md:px-0 px-4">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default EventLayout;
