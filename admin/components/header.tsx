"use client";

import { SidebarMobile } from "@/components/sidebar-mobile";
import { LogOutIcon } from "lucide-react";

export function Header() {
  return (
    <header className="bg-primary flex h-14 items-center justify-between border-b px-4">
      <div className="flex items-center gap-2">
        <SidebarMobile />
        <div className="hidden flex-col md:flex">
          <span className="text-sm font-bold tracking-wider">Silus Mululu</span>
          <span className="text-muted-foreground text-xs">Admin</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <span className="flex cursor-pointer items-center gap-2 rounded-sm bg-gray-900 px-3 py-2 text-white">
          <LogOutIcon className="h-3 w-3" />
          <p className="font-raleway text-[10px] md:text-xs">logout</p>
        </span>
      </div>
    </header>
  );
}
