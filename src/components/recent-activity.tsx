"use client";

import { useEffect, useState } from "react";

import { getRecentlyViewed } from "@/lib/recently-viewed";
import { CryptoInfo } from "@/types/crypto-info";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function RecentActivity() {
  const [activity, setActivity] = useState(() => {
    const arr: CryptoInfo[] = [];
    return arr;
  });

  // Initialize activity state after component mounts (client-side only)
  useEffect(() => {
    setActivity(getRecentlyViewed());
  }, []);

  return (
    <>
      <div className="flex flex-1 flex-col rounded-b-lg">
        <div className="bg-white p-4 py-5 sm:px-6">
          <h3 className="text-base font-semibold text-gray-900">
            Recent Activity
          </h3>
        </div>
        {activity.length > 0 && (
          <ul role="list" className="space-y-6 p-4">
            {activity.map((activityItem, activityItemIdx) => (
              <li key={activityItem.id} className="relative flex gap-x-4">
                <div
                  className={classNames(
                    activityItemIdx === activity.length - 1
                      ? "h-6"
                      : "-bottom-6",
                    "absolute left-0 top-0 flex w-6 justify-center"
                  )}
                >
                  <div className="w-px bg-gray-200" />
                </div>
                <>
                  <div className="relative flex size-6 flex-none items-center justify-center bg-white">
                    <div className="size-1.5 rounded-full bg-gray-100 ring-1 ring-gray-300" />
                  </div>
                  <p className="flex-auto py-0.5 text-xs/5 text-gray-500">
                    <span className="font-medium text-gray-900">
                      {activityItem.name}
                    </span>{" "}
                    was viewed.
                  </p>
                </>
              </li>
            ))}
          </ul>
        )}

        {activity.length == 0 && (
          <div className="flex flex-1 items-center justify-center h-full">
            <span>No activity yet</span>
          </div>
        )}
      </div>
    </>
  );
}
