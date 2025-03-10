import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { StoreSwitcher } from "./StoreSwitcher";
import {
  AudioWaveform,
  Bot,
  Frame,
  PieChart,
  GalleryVerticalEnd,
  Map,
  Home,
  ChartSpline,
  Activity,
  Settings,
  ShoppingBag,
} from "lucide-react";
import { MainNav } from "./MainNav";
import { SecondaryNav } from "./SecondaryNav";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <StoreSwitcher
          teams={[
            {
              name: "Austin",
              logo: GalleryVerticalEnd,
              plan: "Enterprise",
            },
            {
              name: "San Francisco",
              logo: AudioWaveform,
              plan: "Startup",
            }
          ]}
        />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <MainNav
            items={[
              {
                title: "Dashboard",
                url: "#",
                icon: Home,
                isActive: true,
              },
              {
                title: "Orders",
                url: "#",
                icon: ShoppingBag,
              },
              {
                title: "Analytics",
                url: "#",
                icon: ChartSpline,
              },
              {
                title: "Marketing",
                url: "#",
                icon: Activity,
                isActive: true,
                items: [
                  {
                    title: "Campaigns",
                    url: "#",
                  },
                  {
                    title: "Quality Assurance",
                    url: "#",
                  },
                  {
                    title: "Templates",
                    url: "#",
                  },
                ],
              },
              {
                title: "Shipping Rates",
                url: "#",
                icon: Bot,
                items: [
                  {
                    title: "Rates",
                    url: "#",
                  },
                  {
                    title: "Settings",
                    url: "#",
                  },
                ],
              },
              {
                title: "Settings",
                url: "#",
                icon: Settings,
                items: [
                  {
                    title: "General",
                    url: "#",
                  },
                  {
                    title: "Users",
                    url: "#",
                  },
                  {
                    title: "Integrations",
                    url: "#",
                  },
                  {
                    title: "Notifications",
                    url: "#",
                  },
                ],
              },
            ]}
          />
        </SidebarGroup>
        <SidebarGroup>
          <SecondaryNav
            items={[
              {
                name: "Design Engineering",
                url: "#",
                icon: Frame,
              },
              {
                name: "Sales & Marketing",
                url: "#",
                icon: PieChart,
              },
              {
                name: "Travel",
                url: "#",
                icon: Map,
              },
            ]}
          />
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
