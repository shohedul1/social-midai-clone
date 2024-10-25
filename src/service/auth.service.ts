import axiosInstance from "./url.service";

// Define an interface for user data
interface UserData {
    username: string;
    email: string;
    password: string;
    dateOfBirth: Date;
    gender: NonNullable<"male" | "female" | "other" | undefined>;

}

interface LoginUser {
    email: string;
    password: string;
}


// Sign up user
export const registerUser = async (userData: UserData) => {
    try {
        const response = await axiosInstance.post('/auth/register', userData);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

// Login user
export const loginUser = async (userData: LoginUser) => {
    try {
        const response = await axiosInstance.post('/auth/login', userData);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

// Logout user
export const logout = async () => {
    try {
        const response = await axiosInstance.get('/auth/logout');
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

// Check auth API
export const checkUserAuth = async () => {
    try {
        const response = await axiosInstance.get('/users/check-auth');
        if (response.data.status === 'success') {
            return { isAuthenticated: true, user: response.data.data };
        } else if (response.data.status === 'error') { // Ensure the type is consistent
            return { isAuthenticated: false };
        }
    } catch (error) {
        console.log(error);
        return { isAuthenticated: false };
    }
}
