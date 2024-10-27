
import React, { useEffect, useState } from "react";
import PostsContent from "./profileContent/PostsContent";
import { Card, CardContent } from "@/components/ui/card";
import {
    Briefcase,
    Cake,
    GraduationCap,
    Heart,
    Home,
    Mail,
    MapPin,
    Phone,
    Rss,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import MutualFriends from "./profileContent/MutualFriends";
import EditBio from "./profileContent/EditBio";
import toast from "react-hot-toast";
import { usePostStore } from "../../../store/usePostStore";
import { formatDateInDDMMYYYY } from "@/lib/utils";

interface ProfileData {
    _id: string;
    username: string;
    email: string;
    dateOfBirth: string;
    gender: "male" | "female" | "other";
    profilePicture: string;
    coverPhoto: string;
    followerCount: number;
    followingCount: number;
    followers: string[];
    following: string[];
    bio: {
        bioText: string;
        education: string;
        hometown: string;
        liveIn: string;
        phone: string;
        relationship: string;
        workplace: string;
    };
}

type TabKey = "posts" | "about" | "friends" | "photos";

interface ProfileDetailsProps {
    activeTab: TabKey;
    id: string;
    profileData: ProfileData;
    isOwner: boolean;
    fetchProfile: () => Promise<void>;
}

const ProfileDetails: React.FC<ProfileDetailsProps> = ({
    activeTab,
    id,
    profileData,
    isOwner,
    fetchProfile,
}) => {
    const [isEditBioModel, setIsEditBioModel] = useState(false);
    const [likePosts, setLikePosts] = useState(new Set<string>());
    const {
        userPosts,
        fetchUserPost,
        handleLikePost,
        handleCommentPost,
        handleSharePost,
    } = usePostStore();

    useEffect(() => {
        if (id) {
            fetchUserPost(id);
        }
    }, [id, fetchUserPost]);

    useEffect(() => {
        const saveLikes = localStorage.getItem("likePosts");
        if (saveLikes) {
            setLikePosts(new Set(JSON.parse(saveLikes)));
        }
    }, []);

    const handleLike = async (postId: string) => {
        const updatedLikePost = new Set(likePosts);
        if (updatedLikePost.has(postId)) {
            updatedLikePost.delete(postId);
            toast.error("Post disliked successfully");
        } else {
            updatedLikePost.add(postId);
            toast.success("Post liked successfully");
        }
        setLikePosts(updatedLikePost);
        localStorage.setItem("likePosts", JSON.stringify(Array.from(updatedLikePost)));

        try {
            await handleLikePost(postId);
            await fetchUserPost(id);
        } catch (error) {
            console.error(error);
            toast.error("Failed to like or unlike the post");
        }
    };

    const tabContent: Record<TabKey, React.JSX.Element> = {
        posts: (
            <div className="flex flex-col lg:flex-row gap-6">
                <div className="w-full lg:w-[70%] space-y-6 mb-4">
                    {userPosts?.map((post) => (
                        <PostsContent
                            key={post?._id}
                            post={post}
                            isLiked={likePosts.has(post?._id)}
                            onLike={() => handleLike(post?._id)}
                            onComment={async (comment) => {
                                await handleCommentPost(post?._id, comment.text);
                                await fetchUserPost(id);
                            }}
                            onShare={async () => {
                                await handleSharePost(post?._id);
                                await fetchUserPost(id);
                            }}
                        />
                    ))}
                </div>
                <div className="w-full lg:w-[30%]">
                    <Card>
                        <CardContent className="p-6">
                            <h2 className="text-xl font-semibold mb-4 dark:text-gray-300">Intro</h2>
                            <p className="text-gray-600 dark:text-gray-300 mb-4">
                                {profileData?.bio?.bioText}
                            </p>
                            <div className="space-y-2 mb-4 dark:text-gray-300">
                                <div className="flex items-center">
                                    <Home className="w-5 h-5 mr-2" />
                                    <span>{profileData?.bio?.liveIn}</span>
                                </div>
                                <div className="flex items-center">
                                    <Heart className="w-5 h-5 mr-2" />
                                    <span>{profileData?.bio?.relationship}</span>
                                </div>
                                <div className="flex items-center">
                                    <MapPin className="w-5 h-5 mr-2" />
                                    <span>{profileData?.bio?.hometown}</span>
                                </div>
                                <div className="flex items-center">
                                    <Briefcase className="w-5 h-5 mr-2" />
                                    <span>{profileData?.bio?.workplace}</span>
                                </div>
                                <div className="flex items-center">
                                    <GraduationCap className="w-5 h-5 mr-2" />
                                    <span>{profileData?.bio?.education}</span>
                                </div>
                            </div>
                            <div className="flex items-center mb-4 dark:text-gray-300">
                                <Rss className="w-5 h-5 mr-2" />
                                <span>Followed by {profileData?.followingCount} people</span>
                            </div>
                            {isOwner && (
                                <Button className="w-full" onClick={() => setIsEditBioModel(true)}>
                                    Edit Bio
                                </Button>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        ),
        about: (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-4"
            >
                <Card>
                    <CardContent className="p-6">
                        <h2 className="text-xl font-semibold mb-4 dark:text-gray-300">
                            About {profileData?.username}
                        </h2>
                        <div className="space-y-4 dark:text-gray-300">
                            <div className="flex items-center">
                                <Briefcase className="w-5 h-5 mr-2" />
                                <span>{profileData?.bio?.workplace}</span>
                            </div>
                            <div className="flex items-center">
                                <GraduationCap className="w-5 h-5 mr-2" />
                                <span>{profileData?.bio?.education}</span>
                            </div>
                            <div className="flex items-center">
                                <Home className="w-5 h-5 mr-2" />
                                <span>{profileData?.bio?.liveIn}</span>
                            </div>
                            <div className="flex items-center">
                                <Heart className="w-5 h-5 mr-2" />
                                <span>{profileData?.bio?.relationship}</span>
                            </div>
                            <div className="flex items-center">
                                <MapPin className="w-5 h-5 mr-2" />
                                <span>{profileData?.bio?.hometown}</span>
                            </div>
                            <div className="flex items-center">
                                <Phone className="w-5 h-5 mr-2" />
                                <span>{profileData?.bio?.phone}</span>
                            </div>
                            <div className="flex items-center">
                                <Mail className="w-5 h-5 mr-2" />
                                <span>{profileData?.email}</span>
                            </div>
                            <div className="flex items-center">
                                <Cake className="w-5 h-5 mr-2" />
                                <span>Birthday: {formatDateInDDMMYYYY(profileData?.dateOfBirth)}</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        ),
        friends: <MutualFriends id={id} isOwner={isOwner} />,
        photos: (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-4"
            >
                <Card>
                    <CardContent className="p-6">
                        <h2 className="text-xl font-semibold mb-4 dark:text-gray-300">Photos</h2>
                        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                            {/* Render photos here */}
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        ),
    };

    return (
        <div>
            {tabContent[activeTab]}
            {/* Your edit bio modal logic can go here */}
            {isEditBioModel && (
                <EditBio
                    isOpen={isEditBioModel}
                    onClose={() => setIsEditBioModel(false)}
                    fetchProfile={fetchProfile}
                    initialData={profileData?.bio}
                    id={id}
                />
            )}
        </div>
    );
};

export default ProfileDetails;
