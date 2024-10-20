import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Plus } from 'lucide-react';
import Image from 'next/image'; // Import next/image
import React from 'react';

const StoryCard = ({ isAddStory, story }: any) => {
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

                        {story.mediaType === "video" ? (
                            <Image
                                src={story.mediaUrl}
                                alt={story.user.username}
                                layout="fill"
                                className="object-cover"
                                priority // Optional: optimize loading priority
                            />

                        ) : (
                            <video
                                src={story.mediaType}
                                className="w-full h-full object-cover"
                                controls
                            />
                        )}
                        <div className="absolute top-2 left-2">
                            <Avatar className="w-8 h-8">
                                <AvatarImage />
                                <AvatarFallback>{story.user.username[0]}</AvatarFallback>
                            </Avatar>
                        </div>
                        <div className="absolute bottom-2 left-2 right-2">
                            <p className="text-white text-xs font-semibold truncate">{story.user.username}</p>
                        </div>
                    </>
                )}
            </CardContent>
        </Card>
    );
};

export default StoryCard;
