import React from "react";
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

const MutualFriends = ({ isOwner }:any) => {
  // Mock mutual friends data
  const mutualFriends = [
    {
      _id: "1",
      username: "john_doe",
      profilePicture: "path/to/profilePic1.jpg", // Replace with a valid image path
      followerCount: 120,
    },
    {
      _id: "2",
      username: "jane_smith",
      profilePicture: "path/to/profilePic2.jpg", // Replace with a valid image path
      followerCount: 150,
    },
    {
      _id: "3",
      username: "mark_twain",
      profilePicture: null, // Placeholder for no image
      followerCount: 95,
    },
  ];

  const handleUnfollow = (userId:any) => {
    console.log('hellow')
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
          <h2 className="text-xl font-semibold mb-4 dark:text-gray-300">
            Mutual Friends
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mutualFriends.map((friend) => (
              <div
                key={friend._id}
                className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg flex items-start justify-between"
              >
                <div className="flex items-center space-x-4">
                  <Avatar>
                    {friend.profilePicture ? (
                      <AvatarImage
                        src={friend.profilePicture}
                        alt={friend.username}
                      />
                    ) : (
                      <AvatarFallback className="dark:bg-gray-400">
                        {friend.username.charAt(0)}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <div>
                    <p className="font-semibold dark:text-gray-100">
                      {friend.username}
                    </p>
                    <p className="text-sm text-gray-400">
                      {friend.followerCount} followers
                    </p>
                  </div>
                </div>
                {isOwner && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4 text-gray-300" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => handleUnfollow(friend.username)}
                      >
                        <UserX className="h-4 w-4 mr-2" /> Unfollow
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default MutualFriends;
