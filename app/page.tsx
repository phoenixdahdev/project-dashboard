import { AppSidebar } from "@/components/app-sidebar"
import { ProjectsContent } from "@/components/projects-content"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"

export default function Page() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <ProjectsContent />
      </SidebarInset>
    </SidebarProvider>
  )
}
