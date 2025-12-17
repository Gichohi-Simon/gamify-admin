"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { sidebarItems } from "./sidebar-nav";
import { cn } from "@/lib/utils";

import * as VisuallyHidden from "@radix-ui/react-visually-hidden";

export function SidebarMobile() {
  const pathname = usePathname();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8 md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>

      <VisuallyHidden.Root>
        <SheetTitle>Sidebar navigation</SheetTitle>
      </VisuallyHidden.Root>

      <SheetContent
        side="left"
        className="bg-dark font-raleway w-64 p-0 text-white"
      >
        <div className="flex h-14 items-center px-4 font-semibold">
          Gamify Supplies
        </div>

        <nav className="flex flex-col gap-1 p-2">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium",
                  active
                    ? "bg-accent text-accent-foreground"
                    : "hover:bg-accent",
                )}
              >
                <Icon className="h-5 w-5" />
                {item.title}
              </Link>
            );
          })}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
