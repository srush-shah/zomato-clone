import React from "react";
import { FaUserAlt } from "react-icons/fa";

const Navbar = () => {
  return (
    <>
      <nav className="p-4 flex items-center justify-between bg-white shadow-md">
        <div className="w-24">
          <img
            src="https://b.zmtcdn.com/web_assets/b40b97e677bc7b2ca77c58c61db266fe1603954218.png"
            alt="logo"
            className="w-full h-full"
          />
        </div>
        <div className="flex items-center gap-3">
          <button className="bg-zomatoPink-400 text-white py-2 px-3 rounded-full">
            Use App
          </button>
          <span className="border p-2 border-gray-300 text-zomatoPink-400 rounded-full">
            <FaUserAlt />
          </span>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
