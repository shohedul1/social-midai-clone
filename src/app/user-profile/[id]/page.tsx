
"use client";

import React, { useEffect, useState, useCallback } from "react";
import ProfileHeader from "../ProfileHeader";
import ProfileTabs from "../ProfileTabs";
import { useParams } from "next/navigation";
import { fetchUserProfile } from "@/service/user.service";

interface Bio {
    bioText: string;
    education: string;
    hometown: string;
    liveIn: string;
    phone: string;
    relationship: string;
    workplace: string;
}

interface ProfileData {
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
    bio: Bio; // Nested bio object
}

interface FetchResult {
    profile: ProfileData;
    isOwner: boolean;
}

const Page: React.FC = () => {
    const params = useParams();
    const id = params.id as string; // Ensure id is a string
    const [profileData, setProfileData] = useState<ProfileData | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [isOwner, setIsOwner] = useState<boolean>(false);

    // Use useCallback to memoize the fetchProfile function
    const fetchProfile = useCallback(async () => {
        setLoading(true);
        try {
            const result: FetchResult = await fetchUserProfile(id);
            setProfileData(result.profile);
            setIsOwner(result.isOwner);
        } catch (error) {
            console.error("Failed to fetch profile:", error);
        } finally {
            setLoading(false);
        }
    }, [id]); // Add id as a dependency

    useEffect(() => {
        if (id) {
            fetchProfile();
        }
    }, [id, fetchProfile]); // Include fetchProfile in the dependencies

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!profileData) {
        return <div>No profile data found.</div>;
    }

    return (
        <div>
            <ProfileHeader
                profileData={profileData}
                setProfileData={setProfileData}
                isOwner={isOwner}
                id={id}
                fetchProfile={fetchProfile}
            />
            <ProfileTabs
                profileData={profileData}
                isOwner={isOwner}
                id={id}
                fetchProfile={fetchProfile}
            />
        </div>
    );
};

export default Page;
