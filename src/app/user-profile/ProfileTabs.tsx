'use client';
import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ProfileDetails from './ProfileDetails';

// Define the User interface
interface User {
    username: string;
    profilePicture?: string;
}

// Define the Bio interface
interface Bio {
    bioText: string;
    liveIn: string;
    relationship: string;
    hometown: string;
    workplace: string;
    education: string;
    phone?: string;
}

// Define the ProfileData interface
interface ProfileData {
    username: string;
    bio: Bio;
    email: string;
    dateOfBirth: string;
    followingCount: number;
}

// Define the Post interface
interface Post {
    _id: string;
    user: User;
    content: string;
    mediaUrl?: string;
    mediaType?: 'image' | 'video';
    createdAt: string;
    likeCount: number;
    commentCount: number;
    shareCount: number;
}

// Define the TabNames type
type TabNames = 'posts' | 'about' | 'friends' | 'photos';

// Mock data for the profile
const mockProfileData: ProfileData = {
    username: "shohidul",
    bio: {
        bioText: "This is a sample bio text.",
        liveIn: "City, Country",
        relationship: "Single",
        hometown: "Hometown, Country",
        workplace: "Company Name",
        education: "University Name",
        phone: "123-456-7890",
    },
    email: "example@example.com",
    dateOfBirth: "1990-01-01",
    followingCount: 150,
};

const mockUserPosts: Post[] = [
    {
        _id: "1",
        user: { username: "shohidul", profilePicture: "https://via.placeholder.com/150" },
        content: "This is my first post!",
        mediaType: "image",
        mediaUrl: "https://via.placeholder.com/200",
        createdAt: "2023-10-01",
        likeCount: 10,
        commentCount: 2,
        shareCount: 1,
    },
    {
        _id: "2",
        user: { username: "shohidul", profilePicture: "https://via.placeholder.com/150" },
        content: "Another beautiful day!",
        mediaType: "image",
        mediaUrl: "https://via.placeholder.com/200",
        createdAt: "2023-10-02",
        likeCount: 5,
        commentCount: 1,
        shareCount: 0,
    },
];

const ProfileTabs: React.FC = () => {
    const [activeTab, setActiveTab] = useState<TabNames>("posts");

    // Handle tab change
    const handleTabChange = (value: string) => {
        setActiveTab(value as TabNames); // Cast to TabNames
    };

    return (
        <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-8'>
            <Tabs defaultValue='posts' className='w-full' onValueChange={handleTabChange}>
                <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="posts">Posts</TabsTrigger>
                    <TabsTrigger value="about">About</TabsTrigger>
                    <TabsTrigger value="friends">Friends</TabsTrigger>
                    <TabsTrigger value="photos">Photos</TabsTrigger>
                </TabsList>
                <div className='mt-6'>
                    <ProfileDetails
                        activeTab={activeTab}
                        profileData={mockProfileData}
                        userPosts={mockUserPosts}
                        isOwner={true} // Simulating that the current user is the profile owner
                    />
                </div>
            </Tabs>
        </div>
    );
}

export default ProfileTabs;
