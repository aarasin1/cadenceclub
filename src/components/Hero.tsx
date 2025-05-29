import React from "react";
import { useNavigate } from "react-router-dom";

const Hero: React.FC = () => {
  const nav = useNavigate();
  return (
    <section
      className="
        relative 
        w-screen          /* span the full viewport width */
        flex items-center justify-center 
        text-center text-bone
        bg-[url('/images/test-hero.png')] bg-cover bg-center
        min-h-[60vh] sm:min-h-[70vh] lg:min-h-[70vh]
      "
    >
      {/* dark overlay for contrast */}
      <div className="absolute inset-0 bg-black/50" />

      {/* content */}
      <div className="relative z-10 w-full max-w-5xl px-4 py-20 sm:py-32 md:py-40">
        <h1 className="mx-auto max-w-2xl text-3xl sm:text-4xl md:text-5xl font-serif font-bold mb-4">
          Welcome to Cadence Club
        </h1>

        <p className="mx-auto max-w-xl text-lg sm:text-xl md:text-2xl font-serif mb-8">
          Golf With No Waiting, Guaranteed.
        </p>

        <button
          onClick={() => {
            nav("/join");
          }}
          className="inline-block bg-navy text-bone px-6 py-3 rounded-lg text-sm sm:text-base md:text-lg hover:bg-navy/90 transition"
        >
          Join Now
        </button>
      </div>
    </section>
  );
};

export default Hero;
