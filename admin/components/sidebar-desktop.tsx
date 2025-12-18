"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { sidebarItems } from "./sidebar-nav";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";

export function SidebarDesktop() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "hidden min-h-screen flex-col bg-gray-900 text-white transition-all duration-300 md:flex",
        collapsed ? "w-16" : "w-64",
      )}
    >
      <div className="flex h-14 items-center px-4 pt-4">
        {!collapsed && (
          <span className="font-raleway text-primary font-bold tracking-wider capitalize">
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
                  "font-raleway flex items-center gap-3 rounded-md px-3 py-3 text-sm font-medium tracking-wider capitalize transition-colors",
                  active
                    ? "bg-gray-600 text-white"
                    : "hover:bg-accent hover:text-black",
                )}
              >
                <Icon className="text-primary h-5 w-5 shrink-0" />
                {!collapsed && item.title}
              </Link>
            );
          })}
        </nav>
      </ScrollArea>

      <button
        onClick={() => setCollapsed(!collapsed)}
        className="bg-primary m-2 cursor-pointer rounded-md px-2 py-2 text-center text-xs font-bold tracking-wider text-black capitalize"
      >
        {collapsed ? (
          <PanelLeftOpen className="h-4 w-4" />
        ) : (
          <PanelLeftClose className="h-4 w-4" />
        )}
      </button>
    </aside>
  );
}
