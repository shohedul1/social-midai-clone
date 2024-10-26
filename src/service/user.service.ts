import axiosInstance from "./url.service";

// Define types for the data structures based on your API responses
interface FriendRequest {
    userId: string;
    // Add other relevant fields
}

interface UserProfile {
    username: string;
    email: string;
    bio?: string;
    // Add other relevant fields
}

interface BioData {
    bioText?: string;
    liveIn?: string;
    relationship?: string;
    hometown?: string;
    workplace?: string;
    education?: string;
    phone?: string;
}

// Update function to reflect the proper return types
export const getAllFriendsRequest = async (): Promise<FriendRequest[]> => {
    try {
        const response = await axiosInstance.get('/users/friend-request');
        return response?.data || [];
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const getAllFriendsSuggestion = async (): Promise<FriendRequest[]> => {
    try {
        const response = await axiosInstance.get('/users/user-to-request');
        return response?.data || [];
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const followUser = async (userId: string): Promise<void> => {
    try {
        const response = await axiosInstance.post('/users/follow', { userIdToFollow: userId });
        return response?.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const unfollowUser = async (userId: string): Promise<void> => {
    try {
        const response = await axiosInstance.post('/users/unfollow', { userIdToUnFollow: userId });
        return response?.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const deleteUserFromRequest = async (userId: string): Promise<void> => {
    try {
        const response = await axiosInstance.post('/users/friend-request/remove', { requestSenderId: userId });
        return response?.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const fetchUserProfile = async (userId: string): Promise<UserProfile> => {
    try {
        const response = await axiosInstance.get(`/users/profile/${userId}`);
        return response?.data?.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const getMutualFriends = async (userId: string): Promise<FriendRequest[]> => {
    try {
        const response = await axiosInstance.get(`/users/mutual-friends/${userId}`);
        return response?.data?.data || [];
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const updateUserProfile = async (userId: string, updateData: UserProfile): Promise<UserProfile> => {
    try {
        const response = await axiosInstance.put(`/users/profile/${userId}`, updateData);
        return response?.data?.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const updateUserCoverPhoto = async (userId: string, updateData: FormData): Promise<void> => {
    try {
        const response = await axiosInstance.put(`/users/profile/cover-photo/${userId}`, updateData);
        return response?.data?.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const createOrUpdateUserBio = async (userId: string, bioData: BioData): Promise<void> => {
    try {
        const response = await axiosInstance.put(`/users/bio/${userId}`, bioData);
        return response?.data?.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const getAllUsers = async (): Promise<UserProfile[]> => {
    try {
        const response = await axiosInstance.get('/users');
        return response?.data?.data || [];
    } catch (error) {
        console.log(error);
        throw error;
    }
}
