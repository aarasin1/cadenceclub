import React from "react";
import Navbar from "../components/NavBar";
import Hero from "../components/Hero";
import EventCarousel from "../components/EventCarousel";
import About from "../components/About";

const Home: React.FC = () => {
  return (
    <div className="bg-bone text-navy">
      <Navbar />
      <Hero />
      <About />
      <EventCarousel />
    </div>
  );
};

export default Home;
