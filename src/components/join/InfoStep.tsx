// src/components/join/InfoStep.tsx
import React from "react";

interface InfoStepProps {
  onContinue: () => void;
}

const InfoStep: React.FC<InfoStepProps> = ({ onContinue }) => (
  <section className="max-w-3xl mx-auto space-y-12 py-8 px-4">
    {/* Main Header */}
    <header className="text-center space-y-2">
      <h1 className="text-4xl font-serif font-bold text-navy">
        Info Before Joining
      </h1>
      <p className="text-gray-600">
        Please review the following so you know what to expect!
      </p>
    </header>

    {/* What is Cadence Club */}
    <section className="space-y-4">
      <h2 className="text-2xl font-semibold text-navy">
        What Is Cadence Club?
      </h2>
      <p className="text-gray-700">
        Cadence Club brings together golfers who love to play fast and hate to
        wait on other groups! We pre‑book exclusive tee blocks at rotating
        public courses and have staff on-site to monitor pace and facilitate
        play‑throughs. Enjoy golf without waiting and a pace of 3.5 hours or
        less!
      </p>
    </section>

    {/* Policies */}
    <section className="space-y-4">
      <h2 className="text-2xl font-semibold text-navy">
        Policies You Need to Know
      </h2>
      <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
        <li>
          <strong>Cancellation:</strong> You must cancel at least{" "}
          <strong>7 days</strong> before your tee time for a full refund. Late
          cancellations are non‑refundable, though you may transfer your spot to
          another member not already registered for the event.
        </li>
        <li>
          <strong>Pace‑of‑Play:</strong> Rounds must finish within{" "}
          <strong>3.5 hours</strong>. Groups exceeding 3h45m or causing delays
          will receive warnings, and repeat offenders may incur a $50 fine.
        </li>
      </ul>
    </section>

    {/* How It Works */}
    <section className="space-y-4">
      <h2 className="text-2xl font-semibold text-navy">How It Works</h2>
      <ol className="list-decimal list-inside space-y-4 text-gray-700 ml-4">
        <li>
          <strong>Join & Pay:</strong> Sign up and pay your annual membership
          fee.
        </li>
        <li>
          <strong>Register & Book:</strong> Browse events, register, and choose
          your tee time (event green fees are not included in membership fee).
        </li>
        <li>
          <strong>Check In:</strong> Arrive at the course and check in at the
          pro shop.
        </li>
        <li>
          <strong>Play Fast:</strong> Complete your round in 3.5 hours or
          less—and text our staff to request play‑throughs if you encounter
          slower groups.
        </li>
      </ol>
    </section>
  </section>
);

export default InfoStep;
