import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
  const nav = useNavigate();
  return (
    <nav className="flex justify-end p-4 mb-6 bg-navy shadow-md">
      <div className="space-x-4 mr-2">
        <button className="text-bone font-medium font-serif hover:text-white">
          Home
        </button>
        <button
          onClick={() => nav("/events")}
          className="text-bone font-medium font-serif hover:text-white"
        >
          Events
        </button>
        <button className="text-bone font-medium font-serif hover:text-white">
          About
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
