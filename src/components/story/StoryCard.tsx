import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Plus } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

interface User {
    username: string;
    profilePicture?: string;
}

interface Story {
    _id: number;
    mediaUrl: string;
    mediaType: "image" | "video"; // Adjust as needed
    user: User;
}

interface StoryCardProps {
    isAddStory: boolean;
    story?: Story; // Optional if it's an add story button
}

const StoryCard: React.FC<StoryCardProps> = ({ isAddStory, story }) => {
    const handleStoryClick = () => {
        // Handle story click
    };

    return (
        <Card
            className="flex-shrink-0 w-32 h-48 relative overflow-hidden group cursor-pointer rounded-xl"
            onClick={isAddStory ? undefined : handleStoryClick}
        >
            <CardContent className="p-0 h-full">
                {isAddStory ? (
                    <div className="flex flex-col h-full">
                        <div className="h-3/4 w-full relative border-b">
                            <Avatar className="w-full h-full rounded-none">
                                <AvatarImage />
                                <p className="w-full h-full flex justify-center items-center text-4xl">D</p>
                            </Avatar>
                        </div>
                        <div className="h-1/4 w-full bg-white dark:bg-gray-800 flex flex-col items-center justify-center">
                            <Button
                                variant="ghost"
                                size="sm"
                                className="p-0 h-8 w-8 rounded-full bg-blue-500 hover:bg-blue-600"
                            >
                                <Plus className="h-5 w-5 text-white" />
                            </Button>
                            <p className="text-xs font-semibold mt-1">Create Story</p>
                        </div>
                    </div>
                ) : (
                    <>
                        {story?.mediaType === "video" ? (
                            <video
                                src={story.mediaUrl}
                                className="w-full h-full object-cover"
                                controls
                            />
                        ) : (
                            <Image
                                src={story?.mediaUrl || '/fallback-image.png'} // Fallback image
                                alt={story?.user?.username || 'Story'} // Fallback for username
                                className="object-cover w-full h-full"
                                width={500}
                                height={500}
                            />
                        )}
                        <div className="absolute top-2 left-2">
                            <Avatar className="w-8 h-8">
                                <AvatarImage />
                                <AvatarFallback>{story?.user?.username ? story.user.username[0] : '?'}</AvatarFallback>
                            </Avatar>
                        </div>
                        <div className="absolute bottom-2 left-2 right-2">
                            <p className="text-white text-xs font-semibold truncate">{story?.user?.username || 'Unknown User'}</p>
                        </div>
                    </>
                )}
            </CardContent>
        </Card>
    );
};

export default StoryCard;
