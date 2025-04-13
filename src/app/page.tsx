import Link from "next/link";
import React from "react";

function Home() {
  return (
    <div className="h-screen flex items-center justify-center">
      <Link
        href="/dashboard"
        className="p-4 bg-purple-400 rounded-sm text-2xl animate-bounce"
      >
        Let's Review
      </Link>
    </div>
  );
}

export default Home;
