import React from "react"; // adjust path based on your actual logo

const Hero: React.FC = () => {
  return (
    <section className="flex flex-col items-center justify-start h-[57vh] bg-bone text-center px-4 text-navy">
      {/* Logo */}
      <img
        src={"/images/cadence-club.png"}
        alt="Cadence Club logo"
        className="w-24 h-auto mb-2 self-start ml-8"
      />

      {/* Headline */}
      <h1 className="text-5xl font-serif font-bold mb-10">
        Welcome to Cadence Club
      </h1>

      {/* Subtext */}
      <p className="text-xl font-serif mb-10">
        Golf With No Waiting, Guaranteed.
      </p>

      {/* CTA Button */}
      <button className="bg-navy text-bone px-6 py-2 rounded-lg hover:bg-navy transition">
        Join Now
      </button>
    </section>
  );
};

export default Hero;
