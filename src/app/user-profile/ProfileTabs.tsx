import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ProfileDetails from './ProfileDetails';

// Define types for ProfileData and the props
interface ProfileData {
    username: string;
    dateOfBirth?: string | Date;
    gender?: string;
    coverPhoto?: string;
    profilePicture?: string;
    followerCount?: number;
    email: string; // Ensure email is included
    bio?: {
        bioText?: string;
        liveIn?: string;
        relationship?: string;
        hometown?: string;
        workplace?: string;
        education?: string;
        phone?: string;
    };
    followingCount?: number; // Assuming following count is part of profile data
}

interface ProfileTabsProps {
    id: string;
    profileData: ProfileData;
    isOwner: boolean;
    fetchProfile: () => Promise<void>;
}

// Define the allowed tab values
type TabValue = "posts" | "about" | "friends" | "photos";

const ProfileTabs: React.FC<ProfileTabsProps> = ({
    id,
    profileData,
    isOwner,
    fetchProfile,
}) => {
    const [activeTab, setActiveTab] = useState<TabValue>("posts");

    return (
        <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-8'>
            <Tabs defaultValue='posts' className='w-full' onValueChange={(value) => setActiveTab(value as TabValue)}>
                <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="posts">Posts</TabsTrigger>
                    <TabsTrigger value="about">About</TabsTrigger>
                    <TabsTrigger value="friends">Friends</TabsTrigger>
                    <TabsTrigger value="photos">Photos</TabsTrigger>
                </TabsList>
                <div className='mt-6'>
                    <ProfileDetails
                        activeTab={activeTab}
                        profileData={profileData}
                        id={id}
                        isOwner={isOwner}
                        fetchProfile={fetchProfile}
                    />
                </div>
            </Tabs>
        </div>
    );
};

export default ProfileTabs;
