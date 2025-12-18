import { Header } from "@/components/header";
import { SidebarDesktop } from "@/components/sidebar-desktop";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <SidebarDesktop />
      <div className="flex-1">
        <Header />
        <div>{children}</div>
      </div>
    </div>
  );
}
