"use client";

import prismadb from "@/lib/prismadb";
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import {
  Check,
  ChevronsUpDown,
  PlusCircle,
  PlusIcon,
  Store as StoreIcon,
} from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "./ui/command";
import { cn } from "@/lib/utils";
import { Store } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";
import { CommandSeparator } from "cmdk";
import { useStoreModal } from "@/hooks/use-store-modal";

type PopoverTriggerProps = React.ComponentPropsWithRef<typeof PopoverTrigger>;

interface StoreSwitcherProps extends PopoverTriggerProps {
  items: Store[];
}

export default function StoreSwitcher({
  className,
  items = [],
}: StoreSwitcherProps) {
  const [open, setOpen] = useState(false);
  const params = useParams();
  const router = useRouter();
  const storeModal = useStoreModal();
  const formattedItems = items.map((item) => ({
    value: item.id,
    label: item.name,
  }));

  const currentStore = formattedItems.find(
    (item) => item.value === params.storeId
  );
  function onSelectedStore(store: { value: string; label: string }) {
    setOpen(false);
    router.push(`/${store.value}`);
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          size="sm"
          aria-expanded={open}
          aria-label="Select a store"
          className={cn("w-[150px] justify-between", className)}
        >
          <StoreIcon className="w-4 h-4 mr-2" />
          {currentStore?.label}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search store..." />
          <CommandEmpty>No store found.</CommandEmpty>
          <CommandGroup>
            {formattedItems.map((store) => (
              <CommandItem
                key={store.value}
                className="text-sm"
                onSelect={() => onSelectedStore(store)}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    currentStore?.value === store.value
                      ? "opacity-100"
                      : "opacity-0"
                  )}
                />
                {store.label}
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup>
            <CommandItem
              onSelect={() => {
                setOpen(false);
                storeModal.onOpen();
              }}
            >
              <PlusCircle className="w-4 h-4 mr-2" />
              New Store
            </CommandItem>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
