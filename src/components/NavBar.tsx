import React from "react";

const Navbar: React.FC = () => {
  return (
    <nav className="flex justify-end p-4 bg-white shadow-md">
      <div className="space-x-4">
        <button className="text-gray-700 hover:text-black">Home</button>
        <button className="text-gray-700 hover:text-black">Events</button>
        <button className="text-gray-700 hover:text-black">About</button>
      </div>
    </nav>
  );
};

export default Navbar;
