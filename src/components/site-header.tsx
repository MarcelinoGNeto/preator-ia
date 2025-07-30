"use client"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { getClients } from "@/utils/localStorageData"
import { dataNavigation } from "@/utils/navigationRoutes"
import { usePathname } from "next/navigation";
import React from "react"

export function SiteHeader() {
  const { title, url } = dataNavigation.externalLinks.find(
    (link) => link.title === "Suporte"
  ) || {};

  const [clientName, setClientName] = React.useState<string | undefined>();
  const path = usePathname();

  const pageName = path.split("/").pop();
  const pageTitle = dataNavigation.pages.find(
    (page) => page.routeName === pageName
  )?.title || "Preator IA";

  const clientId = path.match(/\/clients\/([0-9a-fA-F-]{36})/)?.[1];
  const allClients = getClients();
  const name = allClients.find(client => client.client_id === clientId)?.name;

  React.useEffect(() => {
    if (clientId) {
      setClientName(name);
    }
  }, [name, clientId]);

  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <h1 className="text-base font-medium">
          {clientId && clientName ? `${pageTitle}: ${clientName}` : pageTitle}
        </h1>
        <div className="ml-auto flex items-center gap-2">
          <Button variant="ghost" asChild size="sm" className="hidden sm:flex">
            <a
              href={url}
              rel="noopener noreferrer"
              target="_blank"
              className="dark:text-foreground"
            >
              {title || "Suporte"}
            </a>
          </Button>
        </div>
      </div>
    </header>
  )
}
