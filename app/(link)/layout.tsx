import { ReactNode } from "react";
import Footer from "./[eventId]/[event]/footer";
import Header from "./[eventId]/[event]/header";

const EventLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-100 to-gray-50 relative">
      <Header />
      <main className="mt-12 flex flex-1 flex-col ">{children}</main>
      <Footer />
    </div>
  );
};

export default EventLayout;
