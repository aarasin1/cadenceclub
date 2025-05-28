// src/components/Navbar.tsx
import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
  const nav = useNavigate();

  return (
    <nav
      className="
        w-screen flex items-center justify-between
        bg-navy shadow-md overflow-x-auto
        px-6 sm:px-8 md:px-10 py-2
      "
      style={{
        paddingLeft: "calc(2.0rem + env(safe-area-inset-left))",
        paddingRight: "calc(2.0rem + env(safe-area-inset-right))",
      }}
    >
      {/* Logo */}
      <img
        src="/images/cadence-club.png"
        alt="Cadence Club logo"
        className="
          flex-shrink-0
          w-10 sm:w-12 md:w-16
          filter invert brightness-0
        "
        onClick={() => nav("/")}
      />

      {/* Links */}
      <div className="flex flex-shrink-0 space-x-4">
        <button
          onClick={() => nav("/events")}
          className="text-bone text-sm sm:text-base font-medium font-serif hover:text-beige"
        >
          Events
        </button>
        <button
          onClick={() => nav("/")}
          className="text-bone text-sm sm:text-base font-medium font-serif hover:text-beige"
        >
          Login
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
