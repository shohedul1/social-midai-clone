import axiosInstance from "./url.service";

export const getAllFriendsRequest = async () => {
    try {
        const response = await axiosInstance.get('/users/friend-request')
        return response?.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const getAllFriendsSuggestion = async () => {
    try {
        const response = await axiosInstance.get('/users/user-to-request')
        return response?.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}


export const followUser = async (userId: string) => {
    try {
        const response = await axiosInstance.post('/users/follow', { userIdToFollow: userId })
        return response?.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}


export const UnfollowUser = async (userId: string) => {
    try {
        const response = await axiosInstance.post('/users/unfollow', { userIdToUnFollow: userId })
        return response?.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}


export const deleteUserFromRequest = async (userId: string) => {
    try {
        const response = await axiosInstance.post('/users/friend-request/remove', { requestSenderId: userId });
        return response?.data; // Ensure this returns the correct response data
    } catch (error) {
        console.log(error);
        throw error; // Ensure this is properly thrown to handle errors upstream
    }
};


export const fetchUserProfile = async (userId: string) => {
    try {
        const response = await axiosInstance.get(`/users/profile/${userId}`)
        return response?.data?.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}


export const getMutualFriends = async (userId: string) => {
    try {
        const response = await axiosInstance.get(`/users/mutual-friends/${userId}`);
        return response?.data?.data; // Ensure you're accessing the correct data structure
    } catch (error) {
        console.log(error);
        throw error;
    }
};



export const updateUserProfile = async (userId: string, updateData: any) => {
    try {
        const response = await axiosInstance.put(`/users/profile/${userId}`, updateData)
        return response?.data?.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}


export const updateUserCoverPhoto = async (userId: string, updateData: any) => {
    try {
        const response = await axiosInstance.put(`/users/profile/cover-photo/${userId}`, updateData)
        return response?.data?.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}


export const createOrUpdateUserBio = async (userId: string, bioData: any) => {
    try {
        const response = await axiosInstance.put(`/users/bio/${userId}`, bioData)
        return response?.data?.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const getAllUsers = async () => {
    try {
        const response = await axiosInstance.get('/users')
        return response?.data?.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}




