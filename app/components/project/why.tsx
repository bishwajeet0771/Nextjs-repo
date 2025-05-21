import Link from "next/link";
import React from "react";

export default function Why() {
  return (
    <>
      {/*
  // v0 by Vercel.
  // https://v0.dev/t/GSsKFphFM89
  */}
      <div className="max-w-[1920px] mx-auto px-6 py-8">
        <h2 className="text-2xl font-semibold">WHY BUY THIS PROJECT?</h2>
        <p className="mt-4 text-base text-gray-700">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis auteeeere irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
          <Link prefetch={false} rel="noopener noreferrer" href="/" className="text-blue-600 hover:underline">
            Read More
          </Link>
        </p>
      </div>
    </>
  );
}
