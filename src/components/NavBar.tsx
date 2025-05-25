import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
  const nav = useNavigate();
  return (
    <nav
      className="
        w-screen flex items-center justify-between
        bg-navy shadow-md overflow-x-auto

        /* heavier padding: 1.5rem (px-6) on mobile, scaling up */
        px-8 sm:px-8 md:px-14
        py-2
      "
      style={{
        /* preserve safe‑area + our custom padding */
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
      />

      {/* Links */}
      <div className="flex flex-shrink-0 space-x-4">
        <button
          onClick={() => nav("/")}
          className="text-bone text-sm sm:text-base font-medium font-serif hover:text-white"
        >
          Home
        </button>
        <button
          onClick={() => nav("/events")}
          className="text-bone text-sm sm:text-base font-medium font-serif hover:text-white"
        >
          Events
        </button>
        <button
          onClick={() => nav("/about")}
          className="text-bone text-sm sm:text-base font-medium font-serif hover:text-white"
        >
          About
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
