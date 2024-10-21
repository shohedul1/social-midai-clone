'use client'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import React, { useState } from 'react'
import ProfileDetails from './ProfileDetails'

// Mock data for the profile
const mockProfileData = {
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

const mockUserPosts = [
    { _id: "1", mediaType: "image", mediaUrl: "https://via.placeholder.com/200" },
    { _id: "2", mediaType: "image", mediaUrl: "https://via.placeholder.com/200" },
];

const ProfileTabs = () => {
    const [activeTab, setActiveTab] = useState("posts");

    return (
        <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-8'>
            <Tabs defaultValue='posts' className='w-full' onValueChange={setActiveTab}>
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
