// src/components/Navbar.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useLogoutMutation } from "../hooks/useAuthMutations";
import ConfirmationModal from "./ConfirmationModal";
import UserIcon from "./icons/UserIcon";
import LogoutIcon from "./icons/LogoutIcon";

const Navbar: React.FC = () => {
  const nav = useNavigate();
  const { authLoading, memberLoading, member } = useAuth();
  const loading = authLoading || memberLoading;
  const { mutate: logout } = useLogoutMutation();
  const [showLogoutModal, setShowLogoutModal] = React.useState(false);

  const handleLogout = () => {
    logout();
    setShowLogoutModal(false);
    nav("/");
  };

  return (
    <>
      <nav
        className="
          w-screen flex items-center justify-between
          bg-navy shadow-md overflow-x-auto
          px-6 sm:px-8 md:px-10 py-1
        "
        style={{
          paddingLeft: "calc(2.75rem + env(safe-area-inset-left))",
          paddingRight: "calc(2.75rem + env(safe-area-inset-right))",
        }}
      >
        {/* Logo */}
        <img
          src="/images/cadence-club.png"
          alt="Cadence Club logo"
          className="flex-shrink-0 w-16 h-16 cursor-pointer filter invert brightness-0"
          onClick={() => nav("/")}
        />

        {/* Links */}
        <div className="flex flex-shrink-0 space-x-8 items-center">
          <button
            onClick={() => nav("/events")}
            className="text-bone text-sm sm:text-base font-medium font-serif hover:text-beige transition"
          >
            Events
          </button>

          {loading ? (
            <span className="text-bone text-sm sm:text-base font-medium font-serif">
              …
            </span>
          ) : member ? (
            <div className="flex items-center space-x-1">
              {/* Profile link */}
              <button
                onClick={() => nav("/profile")}
                className="
                  flex items-center space-x-1
                  text-bone text-sm sm:text-base
                  font-medium font-serif
                  hover:text-beige focus:outline-none transition
                "
              >
                <UserIcon className="w-4 h-4 fill-current" />
                <span>
                  {member.firstName} {member.lastName}
                </span>
              </button>

              {/* Logout icon */}
              <button
                onClick={() => setShowLogoutModal(true)}
                className="
                  p-1 text-bone hover:text-beige
                  focus:outline-none transition
                "
              >
                <LogoutIcon className="w-4 h-4 fill-current" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => nav("/login")}
              className="text-bone text-sm sm:text-base font-medium font-serif hover:text-beige transition"
            >
              Login
            </button>
          )}
        </div>
      </nav>

      {showLogoutModal && (
        <ConfirmationModal
          message="Are you sure you want to log out?"
          onConfirm={handleLogout}
          onCancel={() => setShowLogoutModal(false)}
        />
      )}
    </>
  );
};

export default Navbar;
