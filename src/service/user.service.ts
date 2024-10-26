import axiosInstance from "./url.service";

// Fetch all friend requests
export const getAllFriendsRequest = async () => {
    try {
        const response = await axiosInstance.get('/users/friend-request');
        return response?.data;
    } catch (error) {
        console.error("Error fetching friend requests:", error);
        throw error;
    }
};

// Fetch all friend suggestions
export const getAllFriendsSuggestion = async () => {
    try {
        const response = await axiosInstance.get('/users/user-to-request');
        return response?.data;
    } catch (error) {
        console.error("Error fetching friend suggestions:", error);
        throw error;
    }
};

// Follow a user
export const followUser = async (userId: string) => {
    try {
        const response = await axiosInstance.post('/users/follow', { userIdToFollow: userId });
        return response?.data;
    } catch (error) {
        console.error("Error following user:", error);
        throw error;
    }
};

// Unfollow a user
export const UnfollowUser = async (userId: string) => {
    try {
        const response = await axiosInstance.post('/users/unfollow', { userIdToUnFollow: userId });
        return response?.data;
    } catch (error) {
        console.error("Error unfollowing user:", error);
        throw error;
    }
};

// Delete user from friend requests
export const deleteUserFromRequest = async (userId: string) => {
    try {
        const response = await axiosInstance.post('/users/friend-request/remove', { requestSenderId: userId });
        return response?.data;
    } catch (error) {
        console.error("Error deleting user from requests:", error);
        throw error;
    }
};

// Fetch user profile
export const fetchUserProfile = async (userId: string) => {
    try {
        const response = await axiosInstance.get(`/users/profile/${userId}`);
        return response?.data?.data;
    } catch (error) {
        console.error("Error fetching user profile:", error);
        throw error;
    }
};

// Get mutual friends
export const getMutualFriends = async () => {
    try {
        const response = await axiosInstance.get('/users/mutual-friends');
        return response?.data?.data;
    } catch (error) {
        console.error("Error fetching mutual friends:", error);
        throw error;
    }
};

// Define types for the profile data and props


// Update user profile
export const updateUserProfile = async (userId: string, updateData: FormData) => {
    try {
        const response = await axiosInstance.put(`/users/profile/${userId}`, updateData);
        return response?.data?.data;
    } catch (error) {
        console.error("Error updating user profile:", error);
        throw error;
    }
};

// Update user cover photo
export const updateUserCoverPhoto = async (userId: string, updateData: FormData) => {
    try {
        const response = await axiosInstance.put(`/users/profile/cover-photo/${userId}`, updateData);
        return response?.data?.data;
    } catch (error) {
        console.error("Error updating cover photo:", error);
        throw error;
    }
};

// Create or update user bio
export const createOrUpdateUserBio = async (userId: string, bioData: string) => {
    try {
        const response = await axiosInstance.put(`/users/bio/${userId}`, { bio: bioData });
        return response?.data?.data;
    } catch (error) {
        console.error("Error updating user bio:", error);
        throw error;
    }
};

// Get all users
export const getAllUsers = async () => {
    try {
        const response = await axiosInstance.get('/users');
        return response?.data?.data;
    } catch (error) {
        console.error("Error fetching all users:", error);
        throw error;
    }
};
