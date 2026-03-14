"use client";

import {
  IconDashboard,
  IconListDetails,
  IconCirclePlusFilled,
  IconCategory,
  IconUsers,
  IconChalkboard,
  IconUser,
  IconShield,
  IconChartBar,
  IconCoin,
  IconUsersGroup,
  IconClock,
  IconFlag,
  IconMessage,
  IconHelp,
  IconQuestionMark,
  IconSpeakerphone,
  IconSettings,
  IconCreditCard,
  IconMail,
  IconFileText,
  IconCamera,
  IconFileDescription,
  IconFileAi,
  IconSearch,
} from "@tabler/icons-react";
import * as React from "react";

import { NavMain } from "@/components/sidebar/nav-main";
import { NavSecondary } from "@/components/sidebar/nav-secondary";
import { NavUser } from "@/components/sidebar/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import logo from "@/public/logo.png";
import Image from "next/image";
import Link from "next/link";

const data = {
  navMain: [
    // Overview
    {
      title: "Dashboard",
      url: "/admin",
      icon: IconDashboard,
    },

    // Course Management
    {
      title: "All Courses",
      url: "/admin/courses",
      icon: IconListDetails,
    },
    {
      title: "Create Course",
      url: "/admin/courses/create",
      icon: IconCirclePlusFilled,
    },
    {
      title: "Categories",
      url: "/admin/categories",
      icon: IconCategory,
    },

    // User Management
    {
      title: "All Users",
      url: "/admin/users",
      icon: IconUsers,
    },
    {
      title: "Instructors",
      url: "/admin/instructors",
      icon: IconChalkboard,
    },
    {
      title: "Students",
      url: "/admin/students",
      icon: IconUser,
    },
    {
      title: "Roles & Permissions",
      url: "/admin/roles",
      icon: IconShield,
    },

    // Analytics
    {
      title: "Analytics",
      url: "/admin/analytics",
      icon: IconChartBar,
    },
    {
      title: "Revenue",
      url: "/admin/revenue",
      icon: IconCoin,
    },
    {
      title: "Enrollments",
      url: "/admin/enrollments",
      icon: IconUsersGroup,
    },

    // Content Moderation
    {
      title: "Pending Reviews",
      url: "/admin/pending",
      icon: IconClock,
    },
    {
      title: "Reports",
      url: "/admin/reports",
      icon: IconFlag,
    },
    {
      title: "Comments",
      url: "/admin/comments",
      icon: IconMessage,
    },

    // Support
    {
      title: "Support Tickets",
      url: "/admin/tickets",
      icon: IconHelp,
    },
    {
      title: "FAQs",
      url: "/admin/faqs",
      icon: IconQuestionMark,
    },
    {
      title: "Announcements",
      url: "/admin/announcements",
      icon: IconSpeakerphone,
    },

    // System
    {
      title: "Settings",
      url: "/admin/settings",
      icon: IconSettings,
    },
    {
      title: "Payment Config",
      url: "/admin/payments",
      icon: IconCreditCard,
    },
    {
      title: "Email Templates",
      url: "/admin/emails",
      icon: IconMail,
    },
    {
      title: "Logs",
      url: "/admin/logs",
      icon: IconFileText,
    },
  ],
  navClouds: [
    {
      title: "Capture",
      icon: IconCamera,
      isActive: true,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Proposal",
      icon: IconFileDescription,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Prompts",
      icon: IconFileAi,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "#",
      icon: IconSettings,
    },
    {
      title: "Get Help",
      url: "#",
      icon: IconHelp,
    },
    {
      title: "Search",
      url: "#",
      icon: IconSearch,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Link href="/" className="">
                <Image src={logo} className="size-8" alt="Logo" />
                <span className="text-base font-semibold">EduFlowLMS.</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
