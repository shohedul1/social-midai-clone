import { create } from "zustand";
import {
    deleteUserFromRequest,
    followUser,
    getAllFriendsRequest,
    getAllFriendsSuggestion,
    getMutualFriends,
    UnfollowUser,
} from "@/service/user.service";
import toast from "react-hot-toast";

interface Friend {
    _id: string;
    username: string;
    profilePicture?: string;
    followerCount?: string;
}

interface UserFriendStore {
    friendRequest: Friend[];
    friendSuggestion: Friend[];
    mutualFriends: Friend[];
    loading: boolean;
    fetchFriendRequest: () => Promise<void>;
    fetchFriendSuggestion: () => Promise<void>;
    fetchMutualFriends: (userId: string) => Promise<void>;
    followUser: (userId: string) => Promise<void>;
    UnfollowUser: (userId: string) => Promise<void>;
    deleteUserFromRequest: (userId: string) => Promise<void>;
}

export const userFriendStore = create<UserFriendStore>((set) => ({
    friendRequest: [],
    friendSuggestion: [],
    mutualFriends: [],
    loading: false,

    fetchFriendRequest: async () => {
        set({ loading: true });
        try {
            const friend = await getAllFriendsRequest();
            set({ friendRequest: friend.data });
        } catch (error) {
            console.error(error);
        } finally {
            set({ loading: false });
        }
    },

    fetchFriendSuggestion: async () => {
        set({ loading: true });
        try {
            const friend = await getAllFriendsSuggestion();
            set({ friendSuggestion: friend.data });
        } catch (error) {
            console.error(error);
        } finally {
            set({ loading: false });
        }
    },

    fetchMutualFriends: async () => {
        set({ loading: true });
        try {
            const friend = await getMutualFriends();
            set({ mutualFriends: friend });
        } catch (error) {
            console.error(error);
        } finally {
            set({ loading: false });
        }
    },

    followUser: async (userId: string) => {
        set({ loading: true });
        try {
            await followUser(userId);
            toast.success("You are now following this user");
        } catch (error) {
            console.error(error);
        } finally {
            set({ loading: false });
        }
    },

    UnfollowUser: async (userId: string) => {
        set({ loading: true });
        try {
            await UnfollowUser(userId);
            toast.success("You have unfollowed this user");
        } catch (error) {
            console.error(error);
        } finally {
            set({ loading: false });
        }
    },

    deleteUserFromRequest: async (userId) => {
        set({ loading: true });
        try {
            await deleteUserFromRequest(userId);
            toast.success("Friend request deleted successfully");
            await userFriendStore.getState().fetchFriendRequest();
        } catch (error) {
            console.error(error);
        } finally {
            set({ loading: false });
        }
    },
}));
