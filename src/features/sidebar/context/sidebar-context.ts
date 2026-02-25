import type { SidebarContextValue } from "@/features/sidebar/types/sidebar.types";
import { createContext } from "react";

export const SidebarContext = createContext<SidebarContextValue | undefined>(undefined);
