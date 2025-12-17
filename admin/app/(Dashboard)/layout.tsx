import { SidebarDesktop } from "@/components/sidebar-desktop";
import { SidebarMobile } from "@/components/sidebar-mobile";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <SidebarDesktop />
      <div className="flex-1">
        <header className="flex h-14 items-center gap-2 px-4">
          <SidebarMobile />
          <div className="font-raleway text-2xl font-semibold tracking-wider">
            Dashboard
          </div>
        </header>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}
