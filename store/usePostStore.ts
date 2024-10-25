import {
    createPost,
    getAllPosts,
    getAllStory,
    getAllUserPosts,
    likePost,
    sharePost,
    createStory,
    commentsPost,
} from "@/service/post.service";
import toast from "react-hot-toast";
import { create } from "zustand";

interface User {
    email: string;
    profilePicture: string;
    username: string;
}

interface Comment {
    user: string;
    text: string;
    createdAt: string;
    _id: string;
}

interface Post {
    _id: string;
    user: User;
    content: string;
    mediaUrl: string;
    mediaType: 'image' | 'video';
    likeCount: number;
    commentCount: number;
    shareCount: number;
    createdAt: string;
    updatedAt: string;
    likes: string[];
    comments: Comment[];
    share: string[];
}

interface FormData {
    content: string;
    media?: File; // Optional if you're uploading a file
}

interface PostStore {
    posts: Post[];
    userPosts: Post[];
    story: any[]; // Consider defining a Story interface for better type safety
    loading: boolean;
    error: Error | null;

    fetchPost: () => Promise<void>;
    fetchUserPost: (userId: string | number) => Promise<void>;
    fetchStoryPost: () => Promise<void>;
    handleCreatePost: (postData: FormData) => Promise<void>;
    handleCreateStory: (storyData: any) => Promise<void>;
    handleLikePost: (postId: string | number) => Promise<void>;
    handleCommentPost: (postId: string | number, text: string) => Promise<void>;
    handleSharePost: (postId: string | number) => Promise<void>;
}

export const usePostStore = create<PostStore>((set) => ({
    posts: [],
    userPosts: [],
    story: [],
    loading: false,
    error: null,

    // Fetch all posts
    fetchPost: async () => {
        set({ loading: true });
        try {
            const posts = await getAllPosts();
            set({ posts, loading: false });
        } catch (error) {
            set({ error: error as Error, loading: false });
        }
    },

    // Fetch user posts
    fetchUserPost: async (userId) => {
        set({ loading: true });
        try {
            const userPosts = await getAllUserPosts(userId);
            set({ userPosts, loading: false });
        } catch (error) {
            set({ error: error as Error, loading: false });
        }
    },

    // Fetch all stories
    fetchStoryPost: async () => {
        set({ loading: true });
        try {
            const story = await getAllStory();
            set({ story, loading: false });
        } catch (error) {
            set({ error: error as Error, loading: false });
        }
    },


    handleCreatePost: async (postData: FormData) => {
        set({ loading: true });
        try {
            const newPost = await createPost(postData); // Now accepts FormData
            set((state) => ({
                posts: [newPost, ...state.posts],
                loading: false,
            }));
            toast.success("Post created successfully");
        } catch (error) {
            set({ error: error as Error, loading: false });
            toast.error("Failed to create a post");
        }
    },


    // Create a new story
    handleCreateStory: async (storyData) => {
        set({ loading: true });
        try {
            const newStory = await createStory(storyData);
            set((state) => ({
                story: [newStory, ...state.story],
                loading: false,
            }));
            toast.success("Story created successfully");
        } catch (error) {
            set({ error: error as Error, loading: false });
            toast.error("Failed to create a story");
        }
    },

    // Like a post
    handleLikePost: async (postId) => {
        set({ loading: true });
        try {
            await likePost(postId);
            toast.success("Post liked successfully");
        } catch (error) {
            set({ error: error as Error, loading: false });
            toast.error("Failed to like the post");
        }
    },

    // Comment on a post
    handleCommentPost: async (postId, text) => {
        set({ loading: true });
        try {
            const newComments = await commentsPost(postId, { text });
            set((state) => ({
                posts: state.posts.map((post) =>
                    post._id === postId
                        ? { ...post, comments: [...post.comments, newComments] }
                        : post
                ),
            }));
            toast.success("Comments added successfully");
        } catch (error) {
            set({ error: error as Error, loading: false });
            toast.error("Failed to add comments");
        }
    },

    // Share a post
    handleSharePost: async (postId) => {
        set({ loading: true });
        try {
            await sharePost(postId);
            toast.success("Post shared successfully");
        } catch (error) {
            set({ error: error as Error, loading: false });
            toast.error("Failed to share this post");
        }
    },
}));
