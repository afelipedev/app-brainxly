import { SidebarContext } from "@/features/sidebar/context/sidebar-context";
import { useContext } from "react";

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar deve ser usado dentro de SidebarProvider.");
  }
  return context;
}
