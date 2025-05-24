import {
  BookOpen,
  Home,
  MessageSquare,
  Upload,
  BrainCircuit,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

// Menu items.
const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },

  {
    title: "Chat History",
    url: "/chat-history",
    icon: MessageSquare,
  },
  {
    title: "Upload",
    url: "/upload",
    icon: Upload,
  },

  {
    title: "Models",
    url: "#",
    icon: BrainCircuit,
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <div className="flex items-center gap-2 mb-4">
            <SidebarGroupLabel className="text-lg font-bold">
              Ai Pdf Reader
            </SidebarGroupLabel>
            <BookOpen className="w-6 h-6 text-blue-500 font-bold" />
          </div>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
