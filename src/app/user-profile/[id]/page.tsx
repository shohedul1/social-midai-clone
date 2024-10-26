"use client";
import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import { fetchUserProfile } from "@/service/user.service";
import ProfileHeader from "../ProfileHeader";
import ProfileTabs from "../ProfileTabs";

// Define the structure of the profile data
interface ProfileData {
    username: string;
    dateOfBirth?: string;
    gender?: string;
    profilePicture?: string;
    coverPhoto?: string;
    followerCount?: number;
}

// Define the structure of the result from fetchUserProfile
interface FetchUserProfileResult {
    profile: ProfileData;
    isOwner: boolean;
}

const Page: React.FC = () => {
    const params = useParams();
    const id = params.id as string; // Ensure id is treated as a string
    const [profileData, setProfileData] = useState<ProfileData | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [isOwner, setIsOwner] = useState<boolean>(false);

    const fetchProfile = useCallback(async () => {
        setLoading(true);
        try {
            const result: FetchUserProfileResult = await fetchUserProfile(id);
            setProfileData(result.profile);
            setIsOwner(result.isOwner);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        if (id) {
            fetchProfile();
        }
    }, [id, fetchProfile]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!profileData) {
        return <div>No profile found.</div>;
    }

    return (
        <div>
            <ProfileHeader
                profileData={profileData}
                setProfileData={setProfileData} // This should now match
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
