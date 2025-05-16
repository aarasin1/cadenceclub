import React from "react";

const Hero: React.FC = () => {
  return (
    <section className="flex flex-col items-center justify-center h-[60vh] bg-blue-50 text-center px-4">
      <h1 className="text-5xl font-bold mb-4">Welcome to Cadence Club</h1>
      <p className="text-xl text-gray-600 mb-6">
        Fast golf, good vibes, great people.
      </p>
      <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
        Join Now
      </button>
    </section>
  );
};

export default Hero;
