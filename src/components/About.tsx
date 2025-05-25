import React from "react";

const About: React.FC = () => {
  return (
    <section className="my-10 px-4 max-w-4xl mx-auto text-center">
      <h2 className="text-3xl font-bold mb-4">What is Cadence Club?</h2>
      <p className="text-gray-700 text-lg mx-6 mb-8">
        Cadence Club is a series of members-only golf events that allows you to
        play public courses without the 5-hour rounds! Cadence Club blocks off
        windows of tee times where only our members (all very quick players) are
        on the course. Additionally, Cadence staff act as starters and rangers
        to ensure a maximum 3.5-hour pace and facilitate "playing through" of
        our fastest groups. Cadence Club ensures that you’ll never be stuck
        behind slower groups. Never wait all-day behind a slow group again!
      </p>

      <h3 className="text-2xl font-semibold mb-4">How Cadence Club Works</h3>
      <div className="aspect-video w-full max-w-2xl mx-auto rounded-lg overflow-hidden shadow-lg">
        <iframe
          src="https://www.youtube.com/embed/YOUR_VIDEO_ID"
          title="What is Cadence Club?"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full"
        />
      </div>
    </section>
  );
};

export default About;
