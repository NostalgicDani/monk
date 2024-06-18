"use client";

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import Image from "next/image";
import {
  Activity,
  CreditCard,
  Layout,
  NotebookPen,
  Settings,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

export type Organization = {
  id: string;
  imageUrl: string;
  slug: string;
  name: string;
};
interface NavItemProps {
  isExpanded: boolean;
  isActive: boolean;
  organization: Organization;
  onExpand: (id: string) => void;
}

export const NavItem = ({
  isActive,
  isExpanded,
  organization,
  onExpand,
}: NavItemProps) => {
  const pathname = usePathname();

  const routes = [
    {
      label: "Boards",
      icon: <Layout className="h-4 w-4 mr-2" />,
      href: `/organization/${organization.id}`,
    },
    {
      label: "Notes",
      icon: <NotebookPen className="h-4 w-4 mr-2" />,
      href: `/organization/${organization.id}/notes`,
    },
    {
      label: "Activity",
      icon: <Activity className="h-4 w-4 mr-2" />,
      href: `/organization/${organization.id}/activity`,
    },
    {
      label: "Settings",
      icon: <Settings className="h-4 w-4 mr-2" />,
      href: `/organization/${organization.id}/settings`,
    },
    {
      label: "Billing",
      icon: <CreditCard className="h-4 w-4 mr-2" />,
      href: `/organization/${organization.id}/billing`,
    },
  ];

  return (
    <AccordionItem value={organization.id} className="border-none">
      <AccordionTrigger
        onClick={() => onExpand(organization.id)}
        className={cn(
          "flex items-center gap-x-2 p-1.5 text-neutral-700 rounded-md hover:bg-neutral-500/10 transition text-start no-underline hover:no-underline",
          isActive && !isExpanded && "bg-sky-500/10 text-sky-700"
        )}
      >
        <div className="flex items-center gap-x-2">
          <div className="h-7 w-7 relative">
            <Image
              fill
              src={organization.imageUrl}
              alt="Organization"
              className="rounded-sm object-cover"
            ></Image>
          </div>
          <span className="font-medium text-sm">{organization.name}</span>
        </div>
      </AccordionTrigger>
      <AccordionContent className="pt-1 text-neutral-700">
        {routes.map((route) => (
          <Link key={route.href} href={route.href}>
            <Button
              size="sm"
              className={cn(
                "w-full font-normal justify-start pl-10 mb-1",
                pathname === route.href && "bg-sky-500/10 text-sky-700"
              )}
              variant="ghost"
            >
              {route.icon}
              {route.label}
            </Button>
          </Link>
        ))}
      </AccordionContent>
    </AccordionItem>
  );
};

NavItem.Skeleton = function SkeletonNavItem() {
  return (
    <div className="flex items-center gap-x-2">
      <div className="h-10 w-10 relative shrink-0">
        <Skeleton className="h-full w-full absolute" />
      </div>
      <Skeleton className="h-10 w-full" />
    </div>
  );
};
