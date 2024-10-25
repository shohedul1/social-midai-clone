import axiosInstance from "./url.service";

// Define the shape of the post data
interface FormData {
    content: string;
    media?: File; // Optional if you're uploading a file
}





export const createPost = async (postData: FormData) => {
    try {
        const formData = new FormData(); // Create an instance of the built-in FormData
        formData.append("content", postData.content);
        if (postData.media) {
            formData.append("media", postData.media);
        }

        const result = await axiosInstance.post('/users/posts', formData, {
            headers: {
                'Content-Type': 'multipart/form-data', // Important for file uploads
            },
        });
        return result?.data?.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};



//create method for story
interface StoryData {
    file: File; // File is required for story creation
}
export const createStory = async (postData: StoryData) => {
    try {
        const result = await axiosInstance.post('/users/story', postData)
        return result?.data?.data;
    } catch (error) {
        console.error(error)
        throw error;
    }
}

//get all post method 
export const getAllPosts = async () => {
    try {
        const result = await axiosInstance.get('/users/posts')
        return result?.data?.data;
    } catch (error) {
        console.error(error)
        throw error;
    }
}

//get all story method 
export const getAllStory = async () => {
    try {
        const result = await axiosInstance.get('/users/story')
        return result?.data?.data;
    } catch (error) {
        console.error(error)
        throw error;
    }
}



//method for like a post
export const likePost = async (postId: string | number) => {
    try {
        const result = await axiosInstance.post(`/users/posts/likes/${postId}`)
        return result?.data?.data;
    } catch (error) {
        console.error(error)
        throw error;
    }
}


//method for comments a post
export const commentsPost = async (postId: string | number, comment: { text: string }) => {
    try {
        const result = await axiosInstance.post(`/users/posts/comments/${postId}`, comment)
        return result?.data?.data;
    } catch (error) {
        console.error(error)
        throw error;
    }
}

//method for share a post
export const sharePost = async (postId: string | number) => {
    try {
        const result = await axiosInstance.post(`/users/posts/share/${postId}`)
        return result?.data?.data;
    } catch (error) {
        console.error(error)
        throw error;
    }
}


//get all users posts 
export const getAllUserPosts = async (userId: string | number) => {
    try {
        const result = await axiosInstance.get(`/users/posts/user/${userId}`)
        return result?.data?.data;
    } catch (error) {
        console.error(error)
        throw error;
    }
}


