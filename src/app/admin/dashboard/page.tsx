"use client";
import { useSession } from "next-auth/react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import React, { useState, useEffect } from 'react';
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface MangaSite {
  value: string;
  label: string;
}

const frameworks = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
]
const Dashboard = () => {
  const [mangaSite, setMangaSite] = useState<MangaSite[]>([]);
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")
  const { data: session, status } = useSession();
  useEffect(() => {
    fetch('/api/scraping/mangascraping')
      .then(response => response.json())
      .then(data => setMangaSite(data));
  }, []);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="h-[100%] w-[100%] rounded-lg border"
    >
      <ResizablePanel defaultSize={30} minSize={30} maxSize={50}>
        <div className="flex h-full items-center justify-center p-6">
          <span className="font-semibold">

            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="w-[200px] justify-between"
                >
                  {value
                    ? frameworks.find((framework) => framework.value === value)?.label
                    : "Select framework..."}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-0">
                <Command>
                  <CommandInput placeholder="Search framework..." />
                  <CommandList>
                    <CommandEmpty>No framework found.</CommandEmpty>
                    <CommandGroup>
                      {mangaSite.map((mangaSite) => (
                        <CommandItem
                          key={mangaSite.value}
                          value={mangaSite.value}
                          onSelect={(currentValue) => {
                            setValue(currentValue === value ? "" : currentValue)
                            setOpen(false)
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              value === mangaSite.value ? "opacity-100" : "opacity-0"
                            )}
                          />
                          {mangaSite.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </span>

        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={70} minSize={50} maxSize={70}>
        <div className="flex h-full items-center justify-center p-6">
          <span className="font-semibold">


          </span>

        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
};
export default Dashboard;
