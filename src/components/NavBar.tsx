import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
  const nav = useNavigate();
  return (
    <nav className="flex justify-end p-4 mb-6 bg-navy shadow-md">
      <div className="space-x-4 mr-2">
        <button
          onClick={() => nav("/")}
          className="text-bone font-medium font-serif hover:text-white hover:cursor-pointer"
        >
          Home
        </button>
        <button
          onClick={() => nav("/events")}
          className="text-bone font-medium font-serif hover:text-white hover:cursor-pointer"
        >
          Events
        </button>
        <button className="text-bone font-medium font-serif hover:text-white hover:cursor-pointer">
          About
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
