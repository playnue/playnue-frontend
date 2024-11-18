"use client";

import * as React from "react";
import { User, Calendar, CreditCard, Star, Settings } from "lucide-react";

import { NavUser } from "@/components/nav-user";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from "@/components/ui/sidebar";

// Updated data for the sidebar
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
  },
  navMain: [
    {
      title: "Profile",
      url: "/profile",
      icon: User,
      isActive: true,
    },
    {
      title: "Booking",
      url: "/booking",
      icon: Calendar,
    },
    {
      title: "Payment Status",
      url: "/payment-status",
      icon: CreditCard,
    },
    {
      title: "Reviews",
      url: "/reviews",
      icon: Star,
    },
    {
      title: "Settings",
      url: "/settings",
      icon: Settings,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        {/* No Team Switcher required */}
      </SidebarHeader>
      <SidebarContent>
        <nav className="space-y-2">
          {data.navMain.map((item, index) => (
            <a
              key={index}
              href={item.url}
              className={`flex items-center p-2 text-sm font-medium rounded-md ${
                item.isActive ? "bg-gray-200 text-gray-900" : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.title}
            </a>
          ))}
        </nav>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
