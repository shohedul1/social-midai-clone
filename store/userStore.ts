import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// Define an interface for user data
interface User {
    _id: string; // or number, depending on your user ID type
    username: string;
    email: string;
    gender: string;
    dateOfBirth: string;
    profilePicture: string;
    coverPhoto: string;
    followers: string[];
    following: string[];
    followerCount: number;
    followingCount: number;
    createdAt: string;
    updatedAt: string

    // Add any other fields as necessary
}

// Define an interface for the store state
interface UserStore {
    user: User | null;
    setUser: (userData: User) => void;
    clearUser: () => void;
}

const userStore = create<UserStore>()(
    persist(
        (set) => ({
            user: null,
            setUser: (userData) => set({ user: userData }),
            clearUser: () => set({ user: null }),
        }),
        {
            name: 'user-storage',
            storage: createJSONStorage(() => localStorage), // Use createJSONStorage
        }
    )
);

export default userStore;
