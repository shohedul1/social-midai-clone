'use client';
import React, { useState } from 'react';
import { FriendCardSkeleton, NoFriendsMessage } from '@/lib/Skeleten';
import FriendRequest from './FriendRequest';
import FriendsSuggestion from './FriendsSuggestion';
import LeftSideBar from '@/components/LeftSideBar/LeftSideBar';

const Page = () => {
  const [loading, setLoading] = useState(false);

  const friendRequest = [{}];
  const friendSuggestion = [{}];

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
            friendRequest.map((friend: any, index: number) => (
              <FriendRequest key={index} friend={friend} />
            ))
          )}
        </div>

        <h1 className="text-2xl font-bold mb-6">People you may know</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {loading ? (
            <FriendCardSkeleton />
          ) : friendSuggestion.length === 0 ? (
            <NoFriendsMessage
              text="No Friend Suggestion"
              description="Looks like you are all caught up! Why not explore and connect with new people?"
            />
          ) : (
            friendSuggestion.map((friend: any, index: any) => (
              <FriendsSuggestion key={index} friend={friend} />
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default Page;