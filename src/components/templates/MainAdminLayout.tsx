import { AdminSidebar } from "../organisms/AdminSidebar"
import { SidebarProvider } from "@/components/ui/sidebar"
import { Toaster } from "../ui/sonner"

export const MainAdminLayout = ({ children }: { children: any }) => {
  return (
    <SidebarProvider>
      <AdminSidebar />
      <Toaster />

      {/* <SidebarTrigger /> */}
      {children}
    </SidebarProvider>
  )
}
