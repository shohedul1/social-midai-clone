

import { create } from 'zustand';

// Define the state and actions interface
interface SidebarState {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

// Create the store with the defined types
const useSidebarStore = create<SidebarState>((set) => ({
  isSidebarOpen: false,
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
}));

export default useSidebarStore;
