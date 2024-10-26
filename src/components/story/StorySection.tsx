import React, { useEffect, useRef, useState } from "react";
import StoryCard from "./StoryCard";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePostStore } from "../../../store/usePostStore";

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
    const { story, fetchStoryPost } = usePostStore();

    useEffect(() => {
        fetchStoryPost();
    }, [fetchStoryPost]);

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
    }, [story]);

    const scroll = (direction: "left" | "right") => {
        const container = containerRef.current;
        if (container) {
            const scrollAmount = direction === "left" ? -200 : 200;
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
                        left: -((story.length + 1) * 200) + (containerRef.current?.offsetWidth || 0),
                    }}
                >
                    <StoryCard isAddStory={true} />
                    {story?.map((storyItem: Story) => (
                        <StoryCard story={storyItem} key={storyItem._id} />
                    ))}
                </motion.div>

                {/* Left side scroll button */}
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

                {/* Right side scroll button */}
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
