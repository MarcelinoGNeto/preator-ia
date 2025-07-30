import {
  IconCamera,
  IconDashboard,
  IconDatabase,
  IconFileAi,
  IconFileDescription,
  IconFileWord,
  IconHelp,
  IconReport,
  IconSearch,
  IconSettings,
  IconUsers,
} from "@tabler/icons-react";

export const dataNavigation = {
  user: {
    name: "MGN Tech",
    email: "marcelino.gneto@gmail.com",
    avatar: "/avatars/shadcn.jpg",
  },
  clientRegister: {
    title: "Novo Cliente",
    url: "/logged/client-register",
  },
  processRegister: {
    title: "Novo Processo",
  },
  chatPraetorIA: {
    title: "Chat",
    url: "/logged/chat",
  },
  externalLinks: [
    {
      title: "Suporte",
      url: "https://wa.me/5591990378307?text=Ol%C3%A1!%20Sou%20cliente%20Preator%20IA%20e%20gostaria%20de%20suporte%20em%20...",
    },
  ],
  pages: [
    {
      routeName: "dashboard",
      title: "Dashboard",
    },
    {
      routeName: "clients",
      title: "Clientes",
    },
    {
      routeName: "client",
      title: "Cliente",
    },
    {
      routeName: "client-edit",
      title: "Cliente",
    },
    {
      routeName: "clientRegister",
      title: "Novo Cliente",
    },
    {
      routeName: "processRegister",
      title: "Novo Processo",
    },
    {
      routeName: "chat",
      title: "Chat Preator IA",
    },
    {
      routeName: "analyze",
      title: "Analyze IA",
    },
    {
      routeName: "smart-draft",
      title: "Smart Draft IA",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/logged/dashboard",
      icon: IconDashboard,
    },
    {
      title: "Clientes",
      url: "/logged/clients",
      icon: IconUsers,
    },
    //   {
    //     title: "Lifecycle",
    //     url: "#",
    //     icon: IconListDetails,
    //   },
    //   {
    //     title: "Analytics",
    //     url: "#",
    //     icon: IconChartBar,
    //   },
    //   {
    //     title: "Projects",
    //     url: "#",
    //     icon: IconFolder,
    //   },
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
  documents: [
    {
      name: "Data Library",
      url: "#",
      icon: IconDatabase,
    },
    {
      name: "Reports",
      url: "#",
      icon: IconReport,
    },
    {
      name: "Word Assistant",
      url: "#",
      icon: IconFileWord,
    },
  ],
};
