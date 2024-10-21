"use client";

import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import LeftSideBar from '@/components/LeftSideBar/LeftSideBar';
import VideoCard from './VideoCard';

interface Comment {
    id: number; // or string, depending on your data structure
    text: string; // the comment text
}

interface VideoPost {
    id: number; // assuming you have an ID for each video post
    title: string; // example property, replace with your actual properties
    mediaUrl?: string; // optional property for the video URL
    comments: Comment[]; // array of comments
}

const Page: React.FC = () => {
    const router = useRouter();

    const videoPosts: VideoPost[] = [
        { id: 1, title: "Sample Video 1", mediaUrl: "http://example.com/video1.mp4", comments: [] },
        { id: 2, title: "Sample Video 2", mediaUrl: "http://example.com/video2.mp4", comments: [] }
        // Add more mock data as needed
    ];

    const handleBack = () => {
        router.push('/');
    };

    return (
        <div className='mt-12 min-h-screen'>
            <LeftSideBar />
            <main className='ml-0 md:ml-64 p-6'>
                <Button variant="ghost" className="mb-4" onClick={handleBack}>
                    <ChevronLeft className='mr-2 h-4 w-4' />
                    Back to feed
                </Button>
                <div className='max-w-3xl mx-auto'>
                    {videoPosts.map((post) => (
                        <VideoCard
                            key={post.id} // Use the unique ID for the key
                            post={post}
                            isLiked={false} // Mock value; replace with actual state if needed
                            onShare={() => console.log("Shared!")} // Mock function
                            onComment={(comment) => console.log(comment)} // Mock function
                            onLike={() => console.log("Liked!")} // Mock function
                        />
                    ))}
                </div>
            </main>
        </div>
    );
};

export default Page;
