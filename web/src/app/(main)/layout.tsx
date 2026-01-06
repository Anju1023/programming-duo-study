import { Sidebar } from "@/components/layout/sidebar";
import { BottomNav } from "@/components/layout/bottom-nav";
import { MobileHeader } from "@/components/layout/mobile-header";


export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen w-full flex-col lg:flex-row bg-background">
      {/* Desktop Sidebar (Hidden on Mobile) */}
      <Sidebar className="hidden lg:flex w-72" />

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Mobile Header (Hidden on Desktop) */}
        <MobileHeader />

        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
          <div className="mx-auto max-w-5xl h-full">
            {children}
          </div>
        </main>

        {/* Mobile Bottom Nav (Hidden on Desktop) */}
        <div className="lg:hidden">
          <BottomNav />
        </div>
      </div>
    </div>
  );
}
