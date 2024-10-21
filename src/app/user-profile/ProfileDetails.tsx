import React, { useState } from "react";
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
import PostsContent from "./profileContent/PostsContent";
import MutualFriends from "./profileContent/MutualFriends";
import EditBio from "./profileContent/EditBio";
import Image from "next/image";

interface Bio {
    bioText: string;
    liveIn: string;
    relationship: string;
    hometown: string;
    workplace: string;
    education: string;
    phone?: string;
}

interface ProfileData {
    username: string;
    bio: Bio;
    email: string;
    dateOfBirth: string;
    followingCount: number;
}

interface Post {
    _id: string;
    mediaType: string;
    mediaUrl: string;
}

type TabNames = 'posts' | 'about' | 'friends' | 'photos';

interface ProfileDetailsProps {
    activeTab: TabNames; // Using the TabNames type
    profileData: ProfileData;
    userPosts: Post[];
    isOwner: boolean;
}

const ProfileDetails: React.FC<ProfileDetailsProps> = ({ activeTab, profileData, userPosts, isOwner }) => {
    const [isEditBioModel, setIsEditBioModel] = useState(false);
    const likePosts = new Set<string>(); // For demonstration, empty set for liked posts

    const tabContent: Record<TabNames, JSX.Element> = {
        posts: (
            <div className="flex flex-col lg:flex-row gap-6">
                <div className="w-full lg:w-[70%] space-y-6 mb-4">
                    {userPosts.map((post: any) => (
                        <PostsContent
                            key={post._id}
                            post={post}
                            isLiked={likePosts.has(post._id)}
                            onLike={() => console.log(`Liked post ${post._id}`)} // Replace with actual like logic
                            onShare={async () => console.log(`Shared post ${post._id}`)} // Replace with actual share logic
                        />
                    ))}
                </div>
                <div className="w-full lg:w-[30%]">
                    <Card>
                        <CardContent className="p-6">
                            <h2 className="text-xl font-semibold mb-4 dark:text-gray-300">Intro</h2>
                            <p className="text-gray-600 dark:text-gray-300 mb-4">{profileData.bio.bioText}</p>
                            <div className="space-y-2 mb-4 dark:text-gray-300">
                                <div className="flex items-center"><Home className="w-5 h-5 mr-2" /><span>{profileData.bio.liveIn}</span></div>
                                <div className="flex items-center"><Heart className="w-5 h-5 mr-2" /><span>{profileData.bio.relationship}</span></div>
                                <div className="flex items-center"><MapPin className="w-5 h-5 mr-2" /><span>{profileData.bio.hometown}</span></div>
                                <div className="flex items-center"><Briefcase className="w-5 h-5 mr-2" /><span>{profileData.bio.workplace}</span></div>
                                <div className="flex items-center"><GraduationCap className="w-5 h-5 mr-2" /><span>{profileData.bio.education}</span></div>
                            </div>
                            <div className="flex items-center mb-4 dark:text-gray-300">
                                <Rss className="w-5 h-5 mr-2" />
                                <span>Followed by {profileData.followingCount} people</span>
                            </div>
                            {isOwner && (
                                <Button className="w-full" onClick={() => setIsEditBioModel(true)}>Edit Bio</Button>
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
                        <h2 className="text-xl font-semibold mb-4 dark:text-gray-300">About {profileData.username}</h2>
                        <div className="space-y-4 dark:text-gray-300">
                            <div className="flex items-center"><Briefcase className="w-5 h-5 mr-2" /><span>{profileData.bio.workplace}</span></div>
                            <div className="flex items-center"><GraduationCap className="w-5 h-5 mr-2" /><span>{profileData.bio.education}</span></div>
                            <div className="flex items-center"><Home className="w-5 h-5 mr-2" /><span>{profileData.bio.liveIn}</span></div>
                            <div className="flex items-center"><Heart className="w-5 h-5 mr-2" /><span>{profileData.bio.relationship}</span></div>
                            <div className="flex items-center"><MapPin className="w-5 h-5 mr-2" /><span>{profileData.bio.hometown}</span></div>
                            <div className="flex items-center"><Phone className="w-5 h-5 mr-2" /><span>{profileData.bio.phone}</span></div>
                            <div className="flex items-center"><Mail className="w-5 h-5 mr-2" /><span>{profileData.email}</span></div>
                            <div className="flex items-center"><Cake className="w-5 h-5 mr-2" /><span>Birthday: {profileData.dateOfBirth}</span></div>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        ),
        friends: <MutualFriends isOwner={isOwner} />, // Replace with actual content
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
                            {userPosts.filter(post => post.mediaType === "image" && post.mediaUrl).map(post => (
                                <Image width={500} height={500} priority key={post._id} src={post.mediaUrl} alt="user_all_photos" className="w-[200px] h-[150px] object-cover rounded-lg" />
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        ),
    };

    return (
        <div>
            {tabContent[activeTab] || null}
            <EditBio isOpen={isEditBioModel} onClose={() => setIsEditBioModel(false)} initialData={{
                bioText: "This is a sample bio.",
                liveIn: "Sample City",
                relationship: "Single",
                workplace: "Sample Company",
                education: "Sample University",
                phone: "123-456-7890",
                hometown: "Sample Town"
            }} />

        </div>
    );
};

export default ProfileDetails;
