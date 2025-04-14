"use client";

import EmptyState from "./shared/empty-state";
import { useRecentlyViewedStore } from "@/store/use-recently-viewed-store";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function RecentActivity() {
  const activity = useRecentlyViewedStore((state) => state.recentlyViewed);

  return (
    <>
      <div className="flex flex-1 flex-col rounded-lg">
        <div className="bg-white py-5">
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
          <div className="relative block w-full rounded-lg p-12 text-center">
            <EmptyState />
            <span className="mt-2 text-sm font-semibold text-gray-500">
              No activity yet
            </span>
          </div>
        )}
      </div>
    </>
  );
}
