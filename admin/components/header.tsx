"use client";

import { SidebarMobile } from "@/components/sidebar-mobile";
import { LogOutIcon } from "lucide-react";
import { setLogout } from "@/store/features/authSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useRouter } from "next/navigation";
import { useSignOut } from "@/hooks/auth";
import { toast } from "sonner";

export function Header() {
  const user = useAppSelector((state) => state?.auth.userInfo);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { mutateAsync } = useSignOut();

  const handleLogout = async () => {
    try {
      await mutateAsync();
      dispatch(setLogout());
      toast.success("logout sucessfully");
      router.replace("/login");
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "failed logout";
      toast.error(message);
    }
  };

  return (
    <header className="bg-primary flex h-14 items-center justify-between border-b px-4">
      <div className="flex items-center gap-2">
        <SidebarMobile />
        <div className="hidden flex-col md:flex">
          <span className="font-raleway text-sm font-bold tracking-wider capitalize md:text-base">
            {user?.username}
          </span>
          <span className="font-raleway text-xs">{user?.email}</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <span
          className="flex cursor-pointer items-center gap-2 rounded-sm bg-gray-900 px-3 py-2 text-white"
          onClick={handleLogout}
        >
          <LogOutIcon className="h-3 w-3" />
          <p className="font-raleway text-[10px] md:text-xs">logout</p>
        </span>
      </div>
    </header>
  );
}
