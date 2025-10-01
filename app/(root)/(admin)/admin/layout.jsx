import ModeProvider from "@/components/custom/admin/modeProvider";
import { SidebarProvider } from "@/components/ui/sidebar";
import SideBar from "@/components/custom/admin/sidebar";
import TopBar from "@/components/custom/admin/topbar";

const layout = ({ children }) => {
  return (
    <ModeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <SidebarProvider>
        <SideBar />
        <main className="md:w-[calc(100vw-16rem)] w-full">
          <TopBar />
          <div className="px-4 pt-16 min-h-[calc(100vh-4rem)]">{children}</div>
          <div className="px-4 border-t h-16 flex justify-center items-center text-sm dark:bg-background">
            © 2025 Hattah, Inc., and any associated logos are trademarks,
            service marks, and/or registered trademarks of Hattah, Inc.
          </div>
        </main>
      </SidebarProvider>
    </ModeProvider>
  );
};

export default layout;
