import React, { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MessageCircle, MoreHorizontal, Share2, ThumbsUp } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import PostComments from "./PostComments";
import Image from "next/image";

// User Interface
interface User {
    username: string;
    profilePicture?: string;
}

// Comment Interface
interface Comment {
    user: User;
    text: string;
    createdAt: string;
    _id: string;
}

// Post Interface
interface Post {
    _id: string;
    user: User;
    content: string;
    mediaUrl?: string; // mediaUrl could be optional
    mediaType?: 'image' | 'video'; // mediaType could be optional
    likeCount: number;
    commentCount: number;
    shareCount: number;
    createdAt: string;
    updatedAt: string;
    likes: string[];
    comments: Comment[];
    share: string[];
}

// Props for PostCard
interface PostCardProps {
    post: Post;
    isLiked: boolean;
    onShare: () => void;
    onComment: (comment: Comment) => void;
    onLike: () => void;
}

const PostCard: React.FC<PostCardProps> = ({ post, isLiked, onShare, onComment, onLike }) => {
    const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);
    const [showComments, setShowComments] = useState(false);
    const commentInputRef = useRef<HTMLInputElement | null>(null); // Update to HTMLInputElement

    const handleCommentClick = () => {
        setShowComments(true);
        setTimeout(() => {
            commentInputRef.current?.focus(); // Ensure current is checked
        }, 0);
    };

    const userPostPlaceholder = post.user?.username
        ?.split(" ")
        .map((name) => name[0])
        .join("") || ""; // Default to empty string if undefined

    const generateSharedLink = () => {
        return `http://localhost:3000/${post._id}`;
    };

    const handleShare = (platform: string) => {
        const url = generateSharedLink();
        let shareUrl: string | undefined;

        switch (platform) {
            case "facebook":
                shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
                break;
            case "twitter":
                shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`;
                break;
            case "linkedin":
                shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}`;
                break;
            case "copy":
                navigator.clipboard.writeText(url);
                setIsShareDialogOpen(false);
                return;
            default:
                return;
        }

        if (shareUrl) {
            window.open(shareUrl, "_blank");
        }
        setIsShareDialogOpen(false);
    };

    return (
        <motion.div
            key={post._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <Card>
                <CardContent className="p-6 dark:text-white">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3 cursor-pointer">
                            <Avatar>
                                {post.user?.profilePicture ? (
                                    <AvatarImage src={post.user.profilePicture} alt={post.user.username} />
                                ) : (
                                    <AvatarFallback className="dark:bg-gray-400">{userPostPlaceholder}</AvatarFallback>
                                )}
                            </Avatar>
                            <div>
                                <p className="font-semibold dark:text-white">{post.user?.username}</p>
                                <p className="font-sm text-gray-500">{new Date(post.createdAt).toLocaleDateString()}</p>
                            </div>
                        </div>
                        <Button variant="ghost" className="dark:hover:bg-gray-500">
                            <MoreHorizontal className="dark:text-white h-4 w-4" />
                        </Button>
                    </div>
                    <p className="mb-4">{post.content}</p>
                    {post.mediaUrl && post.mediaType === "image" && (
                        <Image
                            width={500}
                            height={500}
                            priority
                            src={post.mediaUrl} alt="post_image" className="w-full h-auto rounded-lg mb-4" />
                    )}
                    {post.mediaUrl && post.mediaType === "video" && (
                        <video controls className="w-full h-[500px] rounded-lg mb-4">
                            <source src={post.mediaUrl} type="video/mp4" />
                            Your browser does not support the video tag
                        </video>
                    )}
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-sm text-gray-500 dark:text-gray-400 hover:border-b-2 border-gray-400 cursor-pointer ">
                            {post.likeCount} likes
                        </span>
                        <div className="flex gap-3">
                            <span
                                className="text-sm text-gray-500 dark:text-gray-400 hover:border-b-2 border-gray-400 cursor-pointer "
                                onClick={() => setShowComments(!showComments)}
                            >
                                {post.commentCount} comments
                            </span>
                            <span className="text-sm text-gray-500 dark:text-gray-400 hover:border-b-2 border-gray-400 cursor-pointer ">
                                {post.shareCount} shares
                            </span>
                        </div>
                    </div>
                    <Separator className="mb-2 dark:bg-gray-400" />
                    <div className="flex justify-between mb-2">
                        <Button
                            variant="ghost"
                            className={`flex-1 dark:hover:bg-gray-600 ${isLiked ? "text-blue-600" : ""}`}
                            onClick={onLike}
                        >
                            <ThumbsUp className="mr-2 h-4 w-4" /> Like
                        </Button>
                        <Button
                            variant="ghost"
                            className={`flex-1 dark:hover:bg-gray-600 `}
                            onClick={handleCommentClick}
                        >
                            <MessageCircle className="mr-2 h-4 w-4" /> Comment
                        </Button>
                        <Dialog open={isShareDialogOpen} onOpenChange={setIsShareDialogOpen}>
                            <DialogTrigger asChild>
                                <Button
                                    variant="ghost"
                                    className="flex-1 dark:hover:bg-gray-500"
                                    onClick={onShare}
                                >
                                    <Share2 className="mr-2 h-4 w-4" /> Share
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Share This Post</DialogTitle>
                                    <DialogDescription>Choose how you want to share this post</DialogDescription>
                                </DialogHeader>
                                <div className="flex flex-col space-y-4 ">
                                    <Button onClick={() => handleShare("facebook")}>Share on Facebook</Button>
                                    <Button onClick={() => handleShare("twitter")}>Share on Twitter</Button>
                                    <Button onClick={() => handleShare("linkedin")}>Share on LinkedIn</Button>
                                    <Button onClick={() => handleShare("copy")}>Copy Link</Button>
                                </div>
                            </DialogContent>
                        </Dialog>
                    </div>
                    <Separator className="mb-2 dark:bg-gray-400" />
                    <AnimatePresence>
                        {showComments && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <PostComments
                                    post={{ comments: post.comments }} // Ensure post.comments is passed correctly
                                    onComment={onComment}
                                    commentInputRef={commentInputRef}
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </CardContent>
            </Card>
        </motion.div>
    );
};

export default PostCard;
