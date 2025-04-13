"use client";

import { DataTable } from "@/components/data-table";
import { SectionCards } from "@/components/section-cards";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import RecentActivity from "@/components/recent-activity";
import { useCombinedData } from "@/hooks/use-combined-data";

export default function Page() {
  const { data, isLoading, isError, error } = useCombinedData();

  if (isLoading) return <p>Loading...</p>;

  if (isError) return <p>Error: {error.message}</p>;

  if (!data || data.cryptos.length === 0) return <p>No data found.</p>;
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <SectionCards />
            </div>
            <div className="flex flex-col w-full gap-4 py-4 mx-auto md:flex-row md:gap-6 md:py-6">
              <div className="w-full md:w-3/4">
                {data.cryptos?.length > 0 && <DataTable data={data.cryptos} />}
              </div>
              <div className="w-full md:w-1/4">
                <RecentActivity />
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
