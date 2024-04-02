import React from "react";

const Footer = () => {
  return (
    <footer className="hidden lg:block h-20 w-full border-t border-slate-200 p-2">
      <div className="max-w-screen-lg mx-auto flex h-full items-center justify-center">
        <div className="flex items-center gap-x-3">
          <p className="text-sm text-neutral-500">© 2021 Manager</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
