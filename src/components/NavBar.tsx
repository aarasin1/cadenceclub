// src/components/Navbar.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Navbar: React.FC = () => {
  const nav = useNavigate();
  const { member, loading } = useAuth();

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
          cursor-pointer
        "
        onClick={() => nav("/")}
      />

      {/* Links */}
      <div className="flex flex-shrink-0 space-x-4 items-center">
        <button
          onClick={() => nav("/events")}
          className="text-bone text-sm sm:text-base font-medium font-serif hover:text-beige"
        >
          Events
        </button>

        {loading ? (
          <span className="text-bone text-sm sm:text-base font-medium font-serif">
            …
          </span>
        ) : member ? (
          <button
            onClick={() => nav("/profile")}
            className="
              flex items-center
              space-x-0.75
              text-bone text-sm sm:text-base
              font-medium font-serif
              hover:text-beige
              focus:outline-none
            "
          >
            {/* Inline SVG uses currentColor for its fill */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 fill-current"
              viewBox="0 0 24 24"
            >
              <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
            </svg>
            <span>
              {member.firstName} {member.lastName}
            </span>
          </button>
        ) : (
          <button
            onClick={() => nav("/login")}
            className="text-bone text-sm sm:text-base font-medium font-serif hover:text-beige"
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
