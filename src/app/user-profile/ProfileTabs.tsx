import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import React, { useState } from 'react';
import ProfileDetails from './ProfileDetails';

interface ProfileTabsProps {
    id: string;
    profileData: {
        _id: string;
        username: string;
        email: string;
        dateOfBirth: string; // ISO 8601 date format
        gender: "male" | "female" | "other"; // Assuming these are the only options
        profilePicture: string; // URL to the profile picture
        coverPhoto: string; // URL to the cover photo
        followerCount: number;
        followingCount: number;
        followers: string[]; // Array of follower IDs
        following: string[]; // Array of following IDs
        bio: {
            bioText: string;
            education: string;
            hometown: string;
            liveIn: string;
            phone: string;
            relationship: string;
            workplace: string;
        };
    };
    isOwner: boolean;
    fetchProfile: () => Promise<void>;
}

type TabKey = "posts" | "about" | "friends" | "photos";

const ProfileTabs: React.FC<ProfileTabsProps> = ({
    id,
    profileData,
    isOwner,
    fetchProfile,
}) => {
    const [activeTab, setActiveTab] = useState<TabKey>("posts");

    const handleTabChange = (value: string) => {
        // Type assertion to ensure value is a TabKey
        setActiveTab(value as TabKey);
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
                        profileData={profileData}
                        id={id}
                        isOwner={isOwner}
                        fetchProfile={fetchProfile}
                    />
                </div>
            </Tabs>
        </div>
    );
}

export default ProfileTabs;
