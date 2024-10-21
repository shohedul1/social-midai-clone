'use client';
import { useState } from "react";
import LeftSideBar from "../LeftSideBar/LeftSideBar";
import NewPostForm from "../posts/NewPostForm";
import StorySection from "../story/StorySection";
import PostCard from "../posts/PostCard";
import RightSideBar from "../RightSideBar/RightSideBar";

interface Post {
  id: number;
  content: string;
  mediaUrl: string;
  mediaType: 'image' | 'video';
}

const HomePage = () => {
  const [isPostFormOpen, setIsPostFormOpen] = useState(false);

  const posts: Post[] = [
    {
      id: 1,
      content: "Hello my all facebook friends",
      mediaUrl: 'https://res.cloudinary.com/djhjt07rh/image/upload/v1728852781/knjy8hjnl01gzfy1xap2.jpg',
      mediaType: 'image'
    },
    {
      id: 2,
      content: "Another post content",
      mediaUrl: 'https://res.cloudinary.com/djhjt07rh/image/upload/v1726562651/rts0lbzwoocy8krhzumq.jpg',
      mediaType: 'image'
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <main className="flex flex-1 pt-16">
        <LeftSideBar />
        <div className="flex-1 px-4 py-6 md:ml-64 lg:mr-64 lg:max-w-2xl xl:max-w-3xl mx-auto">
          <div className="lg:ml-2 xl:ml-28">
            <StorySection />
            <NewPostForm
              isPostFormOpen={isPostFormOpen}
              setIsPostFormOpen={setIsPostFormOpen}
            />
            <div className="mt-6 space-y-6 mb-4">
              {posts.map((post: Post, index: number) => (
                <PostCard key={index} post={post} />
              ))}
            </div>
          </div>
        </div>

        <div className="hidden lg:block lg:w-64 xl:w-80 fixed right-0 top-16 bottom-0 overflow-y-auto p-4">
          <RightSideBar />
        </div>
      </main>
    </div>
  );
};

export default HomePage;
