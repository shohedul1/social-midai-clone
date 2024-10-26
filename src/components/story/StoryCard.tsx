// StoryCard.tsx
"use client"; // Ensure this is a client component

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";
import React, { useRef, useState } from "react";
import ShowStoryPreview from "./ShowStoryPreview";
import { usePostStore } from "../../../store/usePostStore";
import userStore from "../../../store/userStore";
import Image from "next/image";

interface User {
    username: string;
    profilePicture?: string;
}

interface Story {
    _id: number;
    mediaUrl: string;
    mediaType: "image" | "video";
    user: User;
}

interface StoryCardProps {
    isAddStory?: boolean;
    story?: Story;
}

const StoryCard: React.FC<StoryCardProps> = ({ isAddStory, story }) => {
    const { user } = userStore();
    const [filePreview, setFilePreview] = useState<string | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [fileType, setFileType] = useState<"image" | "video" | "">(""); // Adjusted type here
    const [loading, setLoading] = useState<boolean>(false);
    const { handleCreateStory } = usePostStore();
    const [showPreview, setShowPreview] = useState<boolean>(false);
    const [isNewStory, setIsNewStory] = useState<boolean>(false);

    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const userPlaceholder = story?.user?.username
        ?.split(" ")
        .map((name) => name[0])
        .join("");

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            setFileType(file.type.startsWith("video") ? "video" : "image");
            setFilePreview(URL.createObjectURL(file));
            setIsNewStory(true);
            setShowPreview(true);
        }
        e.target.value = '';
    };

    const handleCreateStoryPost = async () => {
        try {
            setLoading(true);
            const formData = new FormData();
            if (selectedFile) {
                formData.append("media", selectedFile);
            }
            await handleCreateStory(formData);
            resetStoryState();
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    const handleClosePreview = () => {
        resetStoryState();
    };

    const resetStoryState = () => {
        setShowPreview(false);
        setSelectedFile(null);
        setFilePreview(null);
        setFileType(""); // Reset fileType
        setIsNewStory(false);
    };

    const handleStoryClick = () => {
        if (story) {
            setFilePreview(story.mediaUrl);
            setFileType(story.mediaType);
            setIsNewStory(false);
            setShowPreview(true);
        }
    };

    return (
        <>
            <Card
                className="w-40 h-60 relative overflow-hidden group cursor-pointer rounded-xl"
                onClick={isAddStory ? undefined : handleStoryClick}
            >
                <CardContent className="p-0 h-full">
                    {isAddStory ? (
                        <div className="w-full h-full flex flex-col">
                            <div className="h-3/4 w-full relative border-b">
                                <Avatar className="w-full h-full rounded-none">
                                    {user?.profilePicture ? (
                                        <AvatarImage
                                            src={user?.profilePicture}
                                            alt={user?.username}
                                            className="object-cover"
                                        />
                                    ) : (
                                        <p className="w-full h-full flex justify-center items-center text-4xl">{userPlaceholder}</p>
                                    )}
                                </Avatar>
                            </div>
                            <div className="h-1/4 w-full bg-white dark:bg-gray-800 flex flex-col items-center justify-center">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="p-0 h-8 w-8 rounded-full bg-blue-500 hover:bg-blue-600"
                                    onClick={() => fileInputRef.current?.click()}
                                >
                                    <Plus className="h-5 w-5 text-white" />
                                </Button>
                                <p className="text-xs font-semibold mt-1">Create Story</p>
                            </div>
                            <input
                                type="file"
                                accept="image/*,video/*"
                                className="hidden"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                            />
                        </div>
                    ) : (
                        <>
                            {story?.mediaType === "image" ? (
                                <Image
                                    width={500}
                                    height={500}
                                    priority
                                    src={story?.mediaUrl}
                                    alt={story?.user?.username}
                                    className="w-full h-full object-cover"
                                />
                            ) : (

                                <video controls className="w-full h-full object-cover">
                                    <source src={story?.mediaUrl} type="video/mp4" />
                                </video>

                            )}
                            <div className="absolute top-2 left-2 ring-2 ring-blue-500 rounded-full">
                                <Avatar className="w-8 h-8">
                                    {story?.user?.profilePicture ? (
                                        <AvatarImage
                                            src={story?.user?.profilePicture}
                                            alt={story?.user?.username}
                                        />
                                    ) : (
                                        <AvatarFallback>{userPlaceholder}</AvatarFallback>
                                    )}
                                </Avatar>
                            </div>
                            <div className="absolute bottom-2 left-2 right-2">
                                <p className="text-white text-xs font-semibold truncate">{story?.user?.username}</p>
                            </div>
                        </>
                    )}
                </CardContent>
            </Card>
            {showPreview && (
                <ShowStoryPreview
                    file={filePreview}
                    fileType={fileType as "image" | "video"} // Cast here to avoid type error
                    onClose={handleClosePreview}
                    onPost={handleCreateStoryPost}
                    isNewStory={isNewStory}
                    username={isNewStory ? user?.username || "User" : story?.user?.username || "User"} // Fallback to "User"
                    avatar={isNewStory ? user?.profilePicture : story?.user?.profilePicture}
                    isLoading={loading}
                />
            )}
        </>
    );
};

export default StoryCard;
