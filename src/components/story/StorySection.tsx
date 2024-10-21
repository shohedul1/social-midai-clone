'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useEffect, useRef, useState, useMemo } from 'react';
import StoryCard from './StoryCard';
import { motion } from "framer-motion";
import { Button } from '@/components/ui/button';

interface User {
    username: string;
    profilePicture?: string;
}

interface Story {
    _id: number;
    mediaUrl: string;
    mediaType: "image" | "video";
    user: User;
}

const StorySection: React.FC = () => {
    const [scrollPosition, setScrollPosition] = useState(0);
    const [maxScroll, setMaxScroll] = useState(0);
    const containerRef = useRef<HTMLDivElement | null>(null);
    
    const stories: Story[] = useMemo(() => [
        {
            _id: 1,
            mediaUrl: "https://res.cloudinary.com/djhjt07rh/image/upload/v1728852781/knjy8hjnl01gzfy1xap2.jpg",
            mediaType: "image",
            user: { username: "shohidul" }
        },
        {
            _id: 2,
            mediaUrl: "https://res.cloudinary.com/djhjt07rh/video/upload/v1729445069/Forsage_busd_plan_in_english_by_owner_mr.lado____forsage_BUSD_English_plan_presentation_720P_HD_cylmai.mp4",
            mediaType: "video",
            user: { username: "shohidul" }
        },
        {
            _id: 3,
            mediaUrl: "https://res.cloudinary.com/djhjt07rh/video/upload/v1729445069/Forsage_busd_plan_in_english_by_owner_mr.lado____forsage_BUSD_English_plan_presentation_720P_HD_cylmai.mp4",
            mediaType: "video",
            user: { username: "shohidul" }
        }
    ], []);

    useEffect(() => {
        const container = containerRef.current;
        if (container) {
            const updateMaxScroll = () => {
                setMaxScroll(container.scrollWidth - container.offsetWidth);
                setScrollPosition(container.scrollLeft);
            };
            updateMaxScroll();
            window.addEventListener("resize", updateMaxScroll);
            return () => window.removeEventListener("resize", updateMaxScroll);
        }
    }, [stories]); // This can also be updated to avoid `stories` as a dependency

    const scroll = (direction: 'left' | 'right') => {
        const container = containerRef.current;
        if (container) {
            const scrollAmount = direction === "left" ? -200 : 200; // Adjust as needed
            container.scrollBy({ left: scrollAmount, behavior: "smooth" });
        }
    };

    const handleScroll = () => {
        const container = containerRef.current;
        if (container) {
            setScrollPosition(container.scrollLeft);
        }
    };

    return (
        <div className="relative">
            <div
                ref={containerRef}
                onScroll={handleScroll}
                className="flex space-x-2 overflow-x-hidden py-4"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
                <motion.div
                    className="flex space-x-2"
                    drag="x"
                    dragConstraints={{
                        right: 0,
                        left: -((stories.length + 1) * 200) + (containerRef.current?.offsetWidth || 0),
                    }}
                >
                    <StoryCard isAddStory={true} />
                    {stories.map(story => (
                        <StoryCard story={story} isAddStory={false} key={story._id} />
                    ))}
                </motion.div>

                {/* Left scroll button */}
                {scrollPosition > 0 && (
                    <Button
                        variant="outline"
                        size="icon"
                        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-800 rounded-full shadow-lg transition-opacity duration-300 ease-in-out"
                        onClick={() => scroll("left")}
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                )}

                {/* Right scroll button */}
                {scrollPosition < maxScroll && (
                    <Button
                        variant="outline"
                        size="icon"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-800 rounded-full shadow-lg transition-opacity duration-300 ease-in-out"
                        onClick={() => scroll("right")}
                    >
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                )}
            </div>
        </div>
    );
};

export default StorySection;
