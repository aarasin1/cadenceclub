import React from "react";
import Navbar from "../components/NavBar";
import Hero from "../components/Hero";
import EventCarousel from "../components/EventCarousel";

const Home: React.FC = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <EventCarousel />
    </div>
  );
};

export default Home;
