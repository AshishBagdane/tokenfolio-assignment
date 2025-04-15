"use client";

import * as React from "react";
import {
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
  type UniqueIdentifier,
} from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
  SortableContext,
  arrayMove,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  IconChevronLeft,
  IconChevronRight,
  IconChevronsLeft,
  IconChevronsRight,
} from "@tabler/icons-react";
import {
  ColumnDef,
  ColumnFiltersState,
  Row,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CryptoInfo, MarketInfo } from "@/types/crypto-info";
import CryptoDetails from "./crypto/crypto-details";
import { formatNumber, formatPercentage, PriceDisplay } from "@/lib/utils";
import { API_CONFIG } from "@/config/api.config";
import { useQuery } from "@tanstack/react-query";
import { fetchExchangeRate, latestMarketData } from "@/services/api.service";
import { Input } from "./ui/input";
import { ArrowsUpDownIcon } from "@heroicons/react/24/solid";
import NoData from "./shared/no-data";
import { useRecentlyViewedStore } from "@/store/use-recently-viewed-store";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { Card, CardContent } from "./ui/card";
import { toast } from "sonner";
import EmptyState from "./shared/empty-state";

function DraggableRow({ row }: { row: Row<CryptoInfo> }) {
  const { transform, transition, setNodeRef, isDragging } = useSortable({
    id: row.original.id,
  });

  return (
    <TableRow
      data-state={row.getIsSelected() && "selected"}
      data-dragging={isDragging}
      ref={setNodeRef}
      className="relative z-0 data-[dragging=true]:z-10 data-[dragging=true]:opacity-80"
      style={{
        transform: CSS.Transform.toString(transform),
        transition: transition,
      }}
    >
      {row.getVisibleCells().map((cell) => (
        <TableCell key={cell.id}>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableCell>
      ))}
    </TableRow>
  );
}

export function DataTable({ data: initialData }: { data: CryptoInfo[] }) {
  const [data, setData] = React.useState(() => initialData);
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const sortableId = React.useId();
  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {})
  );
  const [currency, setCurrency] = React.useState(API_CONFIG.DEFAULT_CURRENCY);

  const { data: rate = 1, error } = useQuery({
    queryKey: ["exchangeRate", currency],
    queryFn: () => fetchExchangeRate(currency),
    staleTime: API_CONFIG.CACHE_TTL,
  });

  const dataIds = React.useMemo<UniqueIdentifier[]>(
    () => data?.map(({ id }) => id) || [],
    [data]
  );

  React.useEffect(() => {
    if (error) {
      toast.error("Unable to fetch exchange rate!");
    }
  }, [error]);

  const columns: ColumnDef<CryptoInfo>[] = [
    {
      id: "rank",
      accessorKey: "rank",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Rank
            <ArrowsUpDownIcon className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => <p>{row.original.rank}</p>,
      enableHiding: true,
    },
    {
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Name
            <ArrowsUpDownIcon className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        return (
          <TableCellViewer
            item={row.original}
            currency={currency}
            exchangeRate={rate}
          />
        );
      },
      enableHiding: false,
    },
    {
      accessorKey: "price",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Price
            <ArrowsUpDownIcon className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="text-right">
          <PriceDisplay
            amount={parseFloat(row.original.priceUsd) * rate}
            currency={currency.toUpperCase()}
            locale="en-US"
          />
        </div>
      ),
      enableHiding: false,
    },
    {
      accessorKey: "marketCapUsd",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Market Cap
            <ArrowsUpDownIcon className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) =>
        row.original.marketCapUsd && (
          <div className="text-right">
            <PriceDisplay
              amount={parseFloat(row.original.marketCapUsd) * rate}
              currency={currency.toUpperCase()}
              locale="en-US"
            />
          </div>
        ),
      enableHiding: true,
    },
    {
      accessorKey: "vwap24Hr",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            VWAP(24Hr)
            <ArrowsUpDownIcon className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) =>
        row.original.vwap24Hr && (
          <div className="text-right">
            <PriceDisplay
              amount={parseFloat(row.original.vwap24Hr) * rate}
              currency={currency.toUpperCase()}
              locale="en-US"
            />
          </div>
        ),
      enableHiding: true,
    },
    {
      accessorKey: "supply",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Supply
            <ArrowsUpDownIcon className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) =>
        row.original.supply && (
          <p className="text-right">
            {formatNumber({ value: +row.original.supply })}
          </p>
        ),
      enableHiding: true,
    },
    {
      accessorKey: "volumeUsd24Hr",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Volume(24Hr)
            <ArrowsUpDownIcon className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) =>
        row.original.volumeUsd24Hr && (
          <div className="text-right">
            <PriceDisplay
              amount={parseFloat(row.original.volumeUsd24Hr) * rate}
              currency={currency.toUpperCase()}
              locale="en-US"
            />
          </div>
        ),
      enableHiding: true,
    },
    {
      accessorKey: "changePercent24Hr",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Change(24Hr)
            <ArrowsUpDownIcon className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) =>
        row.original.changePercent24Hr && (
          <p className="text-right">
            <span className="text-right">
              {formatPercentage(+row.original.changePercent24Hr)}
            </span>
          </p>
        ),
      enableHiding: false,
    },
  ];

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      pagination,
    },
    getRowId: (row) => row.id.toString(),
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (active && over && active.id !== over.id) {
      setData((data) => {
        const oldIndex = dataIds.indexOf(active.id);
        const newIndex = dataIds.indexOf(over.id);
        return arrayMove(data, oldIndex, newIndex);
      });
    }
  }

  return (
    <>
      <div className="bg-white p-4 py-5 sm:px-6">
        <h3 className="text-base font-semibold text-gray-900">Market Data</h3>
      </div>
      <div className="flex flex-row">
        <div className="pl-4 pr-4 pb-4">
          <Select
            onValueChange={(value) => setCurrency(value)}
            defaultValue={API_CONFIG.DEFAULT_CURRENCY}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Currency" />
            </SelectTrigger>

            <SelectContent>
              {API_CONFIG.SUPPORTED_CURRENCIES.map((curr) => (
                <SelectItem key={curr} value={curr}>
                  {curr.toUpperCase()}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="pl-4 pr-4 pb-4">
          <Input
            placeholder="Filter crypto by name"
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("name")?.setFilterValue(event.target.value)
            }
            className="w-full"
          />
        </div>
      </div>
      <div className="overflow-hidden rounded-lg border ml-4 mr-4">
        <DndContext
          collisionDetection={closestCenter}
          modifiers={[restrictToVerticalAxis]}
          onDragEnd={handleDragEnd}
          sensors={sensors}
          id={sortableId}
        >
          <Table>
            <TableHeader className="bg-muted sticky top-0 z-10">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id} colSpan={header.colSpan}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody className="**:data-[slot=table-cell]:first:w-8">
              {table.getRowModel().rows?.length ? (
                <SortableContext
                  items={dataIds}
                  strategy={verticalListSortingStrategy}
                >
                  {table.getRowModel().rows.map((row) => (
                    <DraggableRow key={row.id} row={row} />
                  ))}
                </SortableContext>
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    <NoData />
                    <span className="mt-2 text-sm font-semibold text-gray-500">
                      No results
                    </span>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </DndContext>
      </div>
      <div className="flex items-center justify-between px-4 py-4">
        <div className="text-muted-foreground hidden flex-1 text-sm lg:flex"></div>
        <div className="flex w-full items-center gap-8 lg:w-fit">
          <div className="hidden items-center gap-2 lg:flex">
            <Label htmlFor="rows-per-page" className="text-sm font-medium">
              Rows per page
            </Label>
            <Select
              value={`${table.getState().pagination.pageSize}`}
              onValueChange={(value) => {
                table.setPageSize(Number(value));
              }}
            >
              <SelectTrigger size="sm" className="w-20" id="rows-per-page">
                <SelectValue
                  placeholder={table.getState().pagination.pageSize}
                />
              </SelectTrigger>
              <SelectContent side="top">
                {[10, 20, 30, 40, 50].map((pageSize) => (
                  <SelectItem key={pageSize} value={`${pageSize}`}>
                    {pageSize}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex w-fit items-center justify-center text-sm font-medium">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </div>
          <div className="ml-auto flex items-center gap-2 lg:ml-0">
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Go to first page</span>
              <IconChevronsLeft />
            </Button>
            <Button
              variant="outline"
              className="size-8"
              size="icon"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Go to previous page</span>
              <IconChevronLeft />
            </Button>
            <Button
              variant="outline"
              className="size-8"
              size="icon"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Go to next page</span>
              <IconChevronRight />
            </Button>
            <Button
              variant="outline"
              className="hidden size-8 lg:flex"
              size="icon"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Go to last page</span>
              <IconChevronsRight />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

function TableCellViewer({
  item,
  currency,
  exchangeRate,
}: {
  item: CryptoInfo;
  currency: string;
  exchangeRate: number;
}) {
  const isMobile = useIsMobile();
  const [open, setOpen] = React.useState(false);

  const addItem = useRecentlyViewedStore((state) => state.addItem);

  React.useEffect(() => {
    if (open) {
      addItem(item);
    }
  }, [open, addItem, item]);

  const { data, isLoading, error } = useQuery<MarketInfo[]>({
    queryKey: [item.name, item.id],
    queryFn: () => latestMarketData(item.id),
    enabled: open,
    staleTime: API_CONFIG.CACHE_TTL,
  });

  React.useEffect(() => {
    if (error) {
      toast.error("Unable to fetch market data!");
    }
  }, [error]);

  return (
    <Drawer
      direction={isMobile ? "bottom" : "right"}
      open={open}
      onOpenChange={setOpen}
    >
      <DrawerTrigger asChild>
        <Button variant="link" className="text-foreground w-fit px-0 text-left">
          {item.name}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="gap-1">
          <DrawerTitle>{item.name}</DrawerTitle>
          <DrawerDescription className="p-2 text-3xl">
            <PriceDisplay
              amount={parseFloat(item.priceUsd) * exchangeRate}
              currency={currency.toUpperCase()}
              locale="en-US"
              notation="standard"
            ></PriceDisplay>
          </DrawerDescription>
        </DrawerHeader>
        <div className="flex flex-col gap-4 overflow-y-auto px-4 text-sm">
          {
            <>
              <Separator />
              <div className="grid gap-2">
                <div className="text-muted-foreground">
                  <CryptoDetails
                    data={item}
                    currency={currency.toUpperCase()}
                    exchangeRate={exchangeRate}
                  />
                </div>
              </div>
              <Separator />
              <div className="bg-white">
                <h3 className="text-base font-semibold text-gray-900">
                  Market Data
                </h3>
              </div>
              {isLoading && <span>Loading...</span>}
              {error && (
                <>
                  <div className="relative block w-full rounded-lg p-12 text-center">
                    <EmptyState />
                    <span className="mt-2 text-sm font-semibold text-gray-500">
                      Oops, Something went wrong!
                    </span>
                  </div>
                </>
              )}

              <Accordion type="single" collapsible>
                {data?.length != 0 &&
                  data?.map((marketInfo, index) => (
                    <AccordionItem key={index} value={marketInfo.exchangeId}>
                      <AccordionTrigger>
                        {marketInfo.baseSymbol} / {marketInfo.quoteSymbol} —{" "}
                        {marketInfo.exchangeId}
                      </AccordionTrigger>
                      <AccordionContent>
                        <Card className="shadow-lg">
                          <CardContent className="pt-4 space-y-3">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">
                                Price (USD):
                              </span>
                              <span>
                                ${Number(marketInfo.priceUsd).toFixed(2)}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">
                                24h Volume (USD):
                              </span>
                              <span>
                                $
                                {Number(
                                  marketInfo.volumeUsd24Hr
                                ).toLocaleString()}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">
                                Volume %:
                              </span>
                              <span>
                                {Number(marketInfo.volumePercent).toFixed(2)}%
                              </span>
                            </div>
                          </CardContent>
                        </Card>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
              </Accordion>
            </>
          }
        </div>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">Done</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
