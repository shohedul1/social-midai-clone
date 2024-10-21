import { AnimatePresence } from "framer-motion";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "framer-motion";
import { UserMinus, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";



interface Friend {
    id: number; // or string, depending on your data structure
    name: string; // friend's name
    profilePicture?: string; // optional property for profile picture URL
}
interface FriendRequestProps {
    friend: Friend;
    onConfirm: (friendId: number) => void;
    onDelete: (friendId: number) => void;
}

const FriendRequest: React.FC<FriendRequestProps> = ({ friend, onConfirm, onDelete }) => {
    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white mb-4 dark:bg-gray-800 p-4 shadow rounded-lg"
            >
                <Avatar className="h-32 w-32 rounded mx-auto mb-4">
                    <AvatarImage src={friend.profilePicture} alt={friend.name} />
                    <AvatarFallback>{friend.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <h3 className="text-lg font-semibold text-center mb-4">{friend.name}</h3>

                <div className="flex flex-col justify-between">
                    <Button className="bg-blue-500" size="lg" onClick={() => onConfirm(friend.id)}>
                        <UserPlus className="mr-2 h-4 w-4" /> Confirm
                    </Button>
                    <Button className="mt-2" size="lg" onClick={() => onDelete(friend.id)}>
                        <UserMinus className="mr-2 h-4 w-4" /> Delete
                    </Button>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

export default FriendRequest;
