"use client";

import React, { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Clock, MessageCircle, Send, Share2, ThumbsUp } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import VideoComments from "./VideoComments";

interface Comment {
    id: number; // or string, based on your data structure
    text: string;
    // Add other properties as needed
}

interface Post {
    id: number; // unique identifier for the post
    mediaUrl?: string; // optional media URL
    comments: Comment[]; // array of comments
}

interface VideoCardProps {
    post: Post; // post data
    isLiked: boolean; // whether the post is liked
    onShare: () => void; // share action
    onComment: (comment: { text: string }) => void; // comment action
    onLike: () => void; // like action
}

const VideoCard: React.FC<VideoCardProps> = ({ post, isLiked, onShare, onComment, onLike }) => {
    const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);
    const [showComments, setShowComments] = useState(false);
    const [commentText, setCommentText] = useState("");
    const commentInputRef = useRef<HTMLInputElement | null>(null);

    const handleCommentClick = () => {
        setShowComments(true);
        setTimeout(() => {
            commentInputRef.current?.focus();
        }, 0);
    };

    const handleCommentSubmit = async () => {
        if (commentText.trim()) {
            onComment({ text: commentText });
            setCommentText("");
        }
    };

    const generateSharedLink = () => {
        return `http://localhost:3000/${post.id}`;
    };

    const handleShare = (platform: string) => {
        const url = generateSharedLink();
        let shareUrl;

        switch (platform) {
            case "facebook":
                shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
                break;
            case "twitter":
                shareUrl = `https://twitter.com/intent/tweet?url=${url}`;
                break;
            case "linkedin":
                shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${url}`;
                break;
            case "copy":
                navigator.clipboard.writeText(url);
                setIsShareDialogOpen(false);
                return;
            default:
                return;
        }
        window.open(shareUrl, "_blank");
        setIsShareDialogOpen(false);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-[rgb(36,37,38)] rounded-lg shadow-lg overflow-hidden mb-4"
        >
            <div>
                <div className="flex items-center justify-between mb-4 px-4 mt-2">
                    <div className="flex items-center">
                        <Avatar className="h-10 w-10 rounded-full mr-3">
                            <AvatarImage />
                            <AvatarFallback className="dark:bg-gray-400">D</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="font-semibold dark:text-white">shohidul</p>
                        </div>
                    </div>
                    <div className="flex items-center text-gray-500 dark:text-gray-400">
                        <Clock className="h-4 w-4 mr-1" />
                        <span className="text-sm">20-05-24</span>
                    </div>
                </div>
                <div className="relative aspect-video bg-black mb-4">
                    {post.mediaUrl && (
                        <video controls className="w-full h-[500px] rounded-lg mb-4">
                            <source src={post.mediaUrl} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    )}
                </div>

                <div className="md:flex justify-between px-2 mb-2 items-center">
                    <div className="flex space-x-4">
                        <Button
                            variant="ghost"
                            className={`flex dark:hover:bg-gray-600 items-center`}
                            onClick={onLike}
                        >
                            <ThumbsUp className="mr-2 h-4 w-4" />
                            <span>{isLiked ? "Liked" : "Like"}</span>
                        </Button>
                        <Button
                            variant="ghost"
                            className={`flex items-center dark:hover:bg-gray-600`}
                            onClick={handleCommentClick}
                        >
                            <MessageCircle className="mr-2 h-4 w-4" />
                            <span>Comment</span>
                        </Button>
                        <Dialog open={isShareDialogOpen} onOpenChange={setIsShareDialogOpen}>
                            <DialogTrigger asChild>
                                <Button
                                    variant="ghost"
                                    className="flex items-center dark:hover:bg-gray-500"
                                    onClick={onShare}
                                >
                                    <Share2 className="mr-2 h-4 w-4" />
                                    <span>Share</span>
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Share This Post</DialogTitle>
                                    <DialogDescription>
                                        Choose how you want to share this post
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="flex flex-col space-y-4">
                                    <Button onClick={() => handleShare("facebook")}>Share on Facebook</Button>
                                    <Button onClick={() => handleShare("twitter")}>Share on Twitter</Button>
                                    <Button onClick={() => handleShare("linkedin")}>Share on LinkedIn</Button>
                                    <Button onClick={() => handleShare("copy")}>Copy Link</Button>
                                </div>
                            </DialogContent>
                        </Dialog>
                    </div>
                    <div className="flex space-x-4 ml-2 text-sm text-gray-500 dark:text-gray-400">
                        <Button variant="ghost" size="sm">Likes</Button>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setShowComments(!showComments)}
                        >
                            Comments
                        </Button>
                        <Button variant="ghost" size="sm">Share</Button>
                    </div>
                </div>
                <AnimatePresence>
                    {showComments && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <ScrollArea className="h-[300px] w-full rounded-md border p-4">
                                <VideoComments />
                            </ScrollArea>
                            <div className="flex items-center mt-4 p-2">
                                <Avatar className="h-10 w-10 rounded mr-3">
                                    <AvatarFallback className="dark:bg-gray-400">D</AvatarFallback>
                                </Avatar>
                                <Input
                                    className="flex-1 mr-2 dark:border-gray-400"
                                    placeholder="Write a comment..."
                                    value={commentText}
                                    onChange={(e) => setCommentText(e.target.value)}
                                    ref={commentInputRef}
                                />
                                <Button onClick={handleCommentSubmit}>
                                    <Send className="h-4 w-4" />
                                </Button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
};

export default VideoCard;
