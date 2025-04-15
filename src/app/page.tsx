import Link from "next/link";
import React from "react";

function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-12 px-6 lg:px-8">
      <div className="max-w-2xl w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-center text-3xl font-extrabold text-gray-900">
          Project Preface
        </h1>

        {/* Important Note */}
        <section>
          <p className="text-green-600 text-center font-medium">
            🙏🏻 Thank You for giving the extra time and feedback on the
            assignment! 🙏🏻
          </p>
          <p className="text-gray-600 text-center text-sm mt-1">
            Looking forward to the final evaluation remarks!
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
            <li>
              It took me almost 18(+8[Extra Time]) hours to complete this
              assignment.
            </li>
            <li>
              To view the details of the currency, you can click on crpto name
              from table.
            </li>
            <li>Project is ready for review — you can start reviewing now!</li>
          </ul>
        </section>

        {/* Improvements */}
        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-2 mt-6">
            New Improvements
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>
              Fixed the the number formats on the cards displayed at the top
            </li>
            <li>
              The sidepanel now, on opening fetches latest market data related
              to the crypto and displays. For details display, used{" "}
              <code className="bg-gray-100 px-1 rounded text-sm">
                accordion and card from shadcn/ui
              </code>
            </li>
            <li>
              Now, the recent activity functionality is dynamic and for this
              used{" "}
              <code className="bg-gray-100 px-1 rounded text-sm">zustand</code>.
            </li>
            <li>
              Improved loading state, empty state and visual feedback. Also,
              improved error-handling with use of{" "}
              <code className="bg-gray-100 px-1 rounded text-sm">sonner</code>{" "}
              from shadcn/ui. Made use of{" "}
              <code className="bg-gray-100 px-1 rounded text-sm">
                framer-motion
              </code>{" "}
              for loader.
            </li>
          </ul>
        </section>

        {/* Improvements */}
        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-2 mt-6">
            Possible Improvements
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>
              Overall UI/UX design with a proper{" "}
              <code className="bg-gray-100 px-1 rounded text-sm">
                design system
              </code>
            </li>
            <li>
              Functionality-wise, more relevant details can be displayed. Maybe
              with the use of proper charts/analytics.
            </li>
            <li>Use of subtle animations (if needed)</li>
          </ul>
        </section>

        <Link
          href="/dashboard"
          className="flex items-center justify-center p-4 bg-purple-400 rounded-sm text-2xl"
        >
          {"Let's Review"}
        </Link>
        <p className="text-sm text-gray-500 text-center mt-8">
          🚀 Project is ready! Thank you for reviewing.
        </p>
      </div>
    </div>
  );
}

export default Home;
