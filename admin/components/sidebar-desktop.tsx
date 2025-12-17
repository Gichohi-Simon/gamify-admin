"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { sidebarItems } from "./sidebar-nav";

export function SidebarDesktop() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "bg-dark font-raleway hidden h-screen flex-col text-white transition-all duration-300 md:flex",
        collapsed ? "w-16" : "w-64",
      )}
    >
      <div className="flex h-14 items-center justify-center">
        {!collapsed && (
          <span className="font-semibold tracking-wider uppercase">
            Gamify General Supplies
          </span>
        )}
      </div>

      <ScrollArea className="flex-1 py-4">
        <nav className="flex flex-col gap-1 px-2">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium tracking-wider capitalize transition-colors",
                  active ? "bg-gray-600 text-white" : "hover:bg-accent",
                )}
              >
                <Icon className="text-primary h-5 w-5 shrink-0 hover:text-white" />
                {!collapsed && item.title}
              </Link>
            );
          })}
        </nav>
      </ScrollArea>

      <Separator />

      <button
        onClick={() => setCollapsed(!collapsed)}
        className="bg-primary m-2 cursor-pointer rounded-md border px-2 py-2 text-xs font-bold tracking-wider text-black capitalize"
      >
        {collapsed ? "open" : "close"}
      </button>
    </aside>
  );
}
