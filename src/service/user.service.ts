import axiosInstance from "./url.service";

export const getAllFriendsRequest = async () => {
    try {
        const response = await axiosInstance.get('/users/friend-request');
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const getAllFriendsSuggestion = async () => {
    try {
        const response = await axiosInstance.get('/users/user-to-request');
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const followUser = async (userId: string) => {
    try {
        const response = await axiosInstance.post('/users/follow', { userIdToFollow: userId });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const unfollowUser = async (userId: string) => {
    try {
        const response = await axiosInstance.post('/users/unfollow', { userIdToUnFollow: userId });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const deleteUserFromRequest = async (userId: string) => {
    try {
        const response = await axiosInstance.post('/users/friend-request/remove', { requestSenderId: userId });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const fetchUserProfile = async (userId: string) => {
    try {
        const response = await axiosInstance.get(`/users/profile/${userId}`);
        return response.data.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const getMutualFriends = async () => {
    try {
        const response = await axiosInstance.get('/users/mutual-friends');
        return response.data.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

interface UpdateData {
    username: string;
    dateOfBirth?: string;
    gender?: string;
    coverPhoto?: string;
    profilePicture?: string;
    email: string;
}

export const updateUserProfile = async (userId: string, updateData: UpdateData) => {
    try {
        const response = await axiosInstance.put(`/users/profile/${userId}`, updateData);
        return response.data.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const updateUserCoverPhoto = async (userId: string, formData: FormData) => {
    try {
        const response = await axiosInstance.put(`/users/profile/cover-photo/${userId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

interface BioData {
    bioText?: string;
    liveIn?: string;
    relationship?: string;
    hometown?: string;
    workplace?: string;
    education?: string;
    phone?: string;
}

export const createOrUpdateUserBio = async (userId: string, bioData: BioData) => {
    try {
        const response = await axiosInstance.put(`/users/bio/${userId}`, bioData);
        return response.data.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const getAllUsers = async () => {
    try {
        const response = await axiosInstance.get('/users');
        return response.data.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
