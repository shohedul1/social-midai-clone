'use client';
import React, { useEffect, useState } from "react";
import NewPostForm from "../posts/NewPostForm";
import PostCard from "../posts/PostCard";
import toast from "react-hot-toast";
import { usePostStore } from "../../../store/usePostStore";
import LeftSideBar from "../LeftSideBar/LeftSideBar";
import StorySection from "../story/StorySection";
import RightSideBar from "../RightSideBar/RightSideBar";

interface Comment {
  user: string;
  text: string;
  createdAt: string;
  _id: string;
}

interface User {
  email: string;
  profilePicture: string;
  username: string;
}



interface Post {
  _id: string;
  user: User;
  content: string;
  mediaUrl: string;
  mediaType: 'image' | 'video';
  likeCount: number;
  commentCount: number;
  shareCount: number;
  createdAt: string;
  updatedAt: string;
  likes: string[];
  comments: Comment[];
  share: string[];
}

const HomePage = () => {
  const [isPostFormOpen, setIsPostFormOpen] = useState(false);
  const [likePosts, setLikePosts] = useState(new Set<string>());
  const { posts, fetchPost, handleLikePost, handleCommentPost, handleSharePost } = usePostStore();
  console.log('posts', posts);

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  useEffect(() => {
    const saveLikes = localStorage.getItem('likePosts');
    if (saveLikes) {
      setLikePosts(new Set(JSON.parse(saveLikes)));
    }
  }, []);

  const handleLike = async (postId: string) => {
    const updatedLikePost = new Set(likePosts);
    if (updatedLikePost.has(postId)) {
      updatedLikePost.delete(postId);
      toast.error('Post disliked successfully');
    } else {
      updatedLikePost.add(postId);
      toast.success('Post liked successfully');
    }
    setLikePosts(updatedLikePost);
    localStorage.setItem('likePosts', JSON.stringify(Array.from(updatedLikePost)));

    try {
      await handleLikePost(postId);
      await fetchPost();
    } catch (error) {
      console.error(error);
      toast.error('Failed to like or unlike the post');
    }
  };

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
              {posts.map((post: Post) => (
                <PostCard
                  key={post._id}
                  post={post}
                  isLiked={likePosts.has(post?._id)}
                  onLike={() => handleLike(post._id)}
                  onComment={async (comment: Comment) => {
                    await handleCommentPost(post._id, comment.text);
                    await fetchPost();
                  }}
                  onShare={async () => {
                    await handleSharePost(post._id);
                    await fetchPost();
                  }}
                />
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
