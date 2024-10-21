'use client';

import React, { useEffect, useState } from 'react';
import { FriendCardSkeleton, NoFriendsMessage } from '@/lib/Skeleten';
import FriendRequest from './FriendRequest';
import FriendsSuggestion from './FriendsSuggestion';
import LeftSideBar from '@/components/LeftSideBar/LeftSideBar';

interface Friend {
  id: number;
  name: string;
  profilePicture?: string;
}

const Page = () => {
  const [loading, setLoading] = useState(true);

  // Mock data for friend requests and suggestions
  const friendRequest: Friend[] = [{ id: 1, name: "John Doe", profilePicture: "" }];
  const friendSuggestion: Friend[] = [{ id: 2, name: "Jane Doe", profilePicture: "" }];

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setLoading(false); // Set loading to false after 2 seconds
    }, 2000);
    
    return () => clearTimeout(timer); // Cleanup timeout on unmount
  }, []);

  const handleConfirm = (id: number) => {
    console.log(`Confirmed friend request for id: ${id}`);
  };

  const handleDelete = (id: number) => {
    console.log(`Deleted friend request for id: ${id}`);
  };

  const handleAddFriend = (id: number) => {
    console.log(`Added friend with id: ${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-[rgb(36,37,38)]">
      <LeftSideBar />
      <main className="ml-0 md:ml-64 mt-16 p-6">
        <h1 className="text-2xl font-bold mb-6">Friends Requests</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {loading ? (
            <FriendCardSkeleton />
          ) : friendRequest.length === 0 ? (
            <NoFriendsMessage
              text="No Friend Requests"
              description="Looks like you are all caught up! Why not explore and connect with new people?"
            />
          ) : (
            friendRequest.map((friend) => (
              <FriendRequest
                key={friend.id}
                friend={friend}
                onConfirm={handleConfirm}
                onDelete={handleDelete}
              />
            ))
          )}
        </div>

        <h1 className="text-2xl font-bold mb-6">People you may know</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {loading ? (
            <FriendCardSkeleton />
          ) : friendSuggestion.length === 0 ? (
            <NoFriendsMessage
              text="No Friend Suggestions"
              description="Looks like you are all caught up! Why not explore and connect with new people?"
            />
          ) : (
            friendSuggestion.map((friend) => (
              <FriendsSuggestion
                key={friend.id}
                friend={friend}
                onAction={handleAddFriend}
              />
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default Page;
