import Link from "next/link";
import React from "react";

function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-12 px-6 lg:px-8">
      <div className="max-w-2xl w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-center text-3xl font-extrabold text-gray-900">
          Project Instructions
        </h1>

        {/* Important Note */}
        <section>
          <p className="text-red-600 text-center font-medium">
            🚨 Due to unforeseen circumstances, I’m submitting the assignment
            early.
          </p>
          <p className="text-gray-600 text-center text-sm mt-1">
            I may continue making improvements — please make sure to pull the
            latest changes before reviewing!
          </p>
        </section>

        {/* Implementation Approach */}
        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-2 mt-6">
            Implementation Approach
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>
              Used libraries like <strong>shadcn/ui</strong>,{" "}
              <strong>Axios</strong>, <strong>Tailwind CSS</strong>,{" "}
              <strong>Tanstack</strong> for faster development.
            </li>
            <li>
              Used{" "}
              <code className="bg-gray-100 px-1 rounded text-sm">
                npx shadcn@latest add dashboard-01
              </code>{" "}
              from{" "}
              <a
                href="https://ui.shadcn.com/blocks"
                target="_blank"
                className="text-blue-600 hover:underline"
              >
                shadcn UI blocks
              </a>{" "}
              for quick setup and minimal tweaking.
            </li>
            <li>Project is ready for review — you can start reviewing now!</li>
          </ul>
        </section>

        {/* Improvements */}
        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-2 mt-6">
            Possible Improvements
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>
              Trigger API data fetch on filter or search actions for better
              responsiveness.
            </li>
            <li>
              Enhance loading states and error handling to improve user
              experience.
            </li>
            <li>
              Stay tuned for ongoing changes — please ensure to pull the latest
              code!
            </li>
          </ul>
        </section>

        <Link
          href="/dashboard"
          className="flex items-center justify-center p-4 bg-purple-400 rounded-sm text-2xl"
        >
          Let's Review
        </Link>
        <p className="text-sm text-gray-500 text-center mt-8">
          🚀 Project is ready! Thank you for reviewing.
        </p>
      </div>
    </div>
  );
}

export default Home;
