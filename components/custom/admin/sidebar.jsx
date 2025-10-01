"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar";
import Image from "next/image";
import Logo from "@/public/assets/icons/logo.png";
import { Button } from "@/components/ui/button";
import { IoMdClose } from "react-icons/io";
import { adminSidebarMenu } from "@/lib/adminSidebarMenu";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import Link from "next/link";
import { LuChevronRight } from "react-icons/lu";

const SideBar = () => {
  const { toggleSidebar } = useSidebar();
  return (
    <Sidebar>
      <SidebarHeader className="border-b p-0 h-16">
        <div className="px-4 flex justify-between items-center">
          <Image src={Logo.src} alt="logo" width={75} height={75} />
          <Button
            className="md:hidden"
            size="icon"
            type="button"
            onClick={toggleSidebar}
          >
            <IoMdClose />
          </Button>
        </div>
      </SidebarHeader>
      <SidebarContent className="p-4">
        <SidebarMenu>
          {adminSidebarMenu.map((menuItem, index) => (
            <Collapsible className="group/collapsible" key={index}>
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton
                    className="px-2 py-4 font-semibold"
                    asChild
                  >
                    <Link href={menuItem?.url}>
                      <menuItem.icon />
                      {menuItem.title}
                      {menuItem.submenu && menuItem.submenu.length > 0 && (
                        <LuChevronRight className="ml-auto group-data-[state=open]/collapsible:rotate-90 transition-transform duration-200" />
                      )}
                    </Link>
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                {menuItem.submenu && menuItem.submenu.length > 0 && (
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {menuItem.submenu.map((submenuItem, subindex) => (
                        <SidebarMenuSubItem key={subindex}>
                          <SidebarMenuSubButton className="px-2 py-4" asChild>
                            <Link href={submenuItem?.url}>
                              {submenuItem.title}
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                )}
              </SidebarMenuItem>
            </Collapsible>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
};

export default SideBar;
