"use client";
import React, { useState } from "react";

type Props = {};

export default function Subscribe({}: Props) {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle subscription logic
    console.log("Subscribed with email:", email);
    setEmail("");
  };

  return (
    <form className="mt-4 flex flex-col sm:flex-row sm:max-w-md" onSubmit={handleSubmit}>
      <input
        type="email"
        name="email-address"
        id="email-address"
        autoComplete="email"
        required
        className="appearance-none min-w-0 w-full focus:text-[16px] bg-white border border-gray-300 rounded-md shadow-sm py-1.5 sm:py-2 px-3 text-xs sm:text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-white focus:border-white"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <div className="mt-2 sm:mt-0 sm:ml-3 sm:flex-shrink-0">
        <button
          type="submit"
          aria-label="Subscribe" name="Subscribe" title="Subscribe"
          className="w-full bg-blue-600 border border-transparent rounded-md py-1 px-2 sm:py-2 flex items-center justify-center text-xs sm:text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-blue-500"
        >
          Subscribe
        </button>
      </div>
    </form>
  );
}