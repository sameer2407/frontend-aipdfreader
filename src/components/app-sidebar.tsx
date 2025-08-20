import {
  BookOpen,
  Home,
  Upload,
  Github,
  Linkedin,
  Twitter,
  User,
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
  SidebarSeparator,
} from "@/components/ui/sidebar";

// Menu items.
const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Upload",
    url: "/upload",
    icon: Upload,
  },
  {
    title: "About Me",
    url: "/about",
    icon: User,
  },
];

// Social media links
const socialLinks = [
  {
    title: "GitHub",
    url: "https://github.com/sameer2407",
    icon: Github,
  },
  {
    title: "LinkedIn",
    url: "https://www.linkedin.com/in/sameer-jadaun-13379a241/",
    icon: Linkedin,
  },
  {
    title: "Twitter",
    url: "https://x.com/Sameer_2407",
    icon: Twitter,
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
