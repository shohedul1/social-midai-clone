"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { fetchUserProfile } from "@/service/user.service";
import ProfileHeader from "../ProfileHeader";
import ProfileTabs from "../ProfileTabs";

// Define the structure of the profile data
interface ProfileData {
    username: string;
    email: string;
    profilePicture?: string;
    // Add any other relevant fields
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

    const fetchProfile = async () => {
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
    };

    useEffect(() => {
        if (id) {
            fetchProfile();
        }
    }, [id]);

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