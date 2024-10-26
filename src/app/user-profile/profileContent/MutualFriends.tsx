import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, UserX } from "lucide-react";
import toast from "react-hot-toast";
import { userFriendStore } from "../../../../store/userFriendsStore";

interface MutualFriendsProps {
    id: string;
    isOwner: boolean;
}

const MutualFriends: React.FC<MutualFriendsProps> = ({ id, isOwner }) => {
    const { fetchMutualFriends, mutualFriends, UnfollowUser } = userFriendStore();

    useEffect(() => {
        if (id) {
            fetchMutualFriends(id);
        }
    }, [id, fetchMutualFriends]);

    const handleUnfollow = async (userId: string) => {
        try {
            await UnfollowUser(userId);
            toast.success("You have unfollowed successfully");
            await fetchMutualFriends(id); // Refresh the list after unfollowing
        } catch (error) {
            toast.error("Failed to unfollow user");
            console.error("Unfollow error:", error);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-4"
        >
            <Card>
                <CardContent className="p-6">
                    <h2 className="text-xl font-semibold mb-4 dark:text-gray-300">Mutual Friends</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {mutualFriends?.map((friend) => (
                            <div
                                key={friend?._id}
                                className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg flex items-start justify-between"
                            >
                                <div className="flex items-center space-x-4">
                                    <Avatar>
                                        {friend?.profilePicture ? (
                                            <AvatarImage src={friend?.profilePicture} alt={friend?.username} />
                                        ) : (
                                            <AvatarFallback className="dark:bg-gray-400">
                                                {friend?.username?.charAt(0) || "U"}
                                            </AvatarFallback>
                                        )}
                                    </Avatar>
                                    <div>
                                        <p className="font-semibold dark:text-gray-100">{friend?.username}</p>
                                        <p className="text-sm text-gray-400">{friend?.followerCount} followers</p>
                                    </div>
                                </div>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon">
                                            <MoreHorizontal className="h-4 w-4 text-gray-300" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    {isOwner && (
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem onClick={async () => await handleUnfollow(friend?._id)}>
                                                <UserX className="h-4 w-4 mr-2" /> Unfollow
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    )}
                                </DropdownMenu>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
};

export default MutualFriends;
