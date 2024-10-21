import { ChevronDown, ChevronUp, Send } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const PostComments = () => {

    return (
        // comemts section list
        <div className="mt-4">
            <h3 className="font-semibold mb-2">Comments</h3>
            <div className="max-h-60 overflow-y-auto pr-2">

                <div className="flex items-start space-x-2 mb-2">
                    <Avatar className="w-8 h-8">
                        <AvatarImage />
                        <AvatarFallback className="dark:bg-gray-400">
                            D
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                        <div className="rounded-lg p-2">
                            <p className="font-bold text-sm">shohidul</p>
                            <p className="text-sm">nice</p>
                        </div>
                        <div className="flex items-center mt-1 text-xs text-gray-400">
                            <Button variant="ghost" size="sm">
                                Like
                            </Button>
                            <Button variant="ghost" size="sm">
                                Reply
                            </Button>
                            <span>20-10-28</span>
                        </div>
                    </div>
                </div>


                <p
                    className="w-40 mt-2 text-blue-500 dark:text-gray-300 cursor-pointer"
                >
                    {
                        true ? (
                            <>
                                Show Less <ChevronUp className="ml-2 h-4 w-4" />
                            </>
                        ) : (
                            <>
                                Show All Comments <ChevronDown className="ml-2 h-4 w-4" />
                            </>
                        )
                    }


                </p>

            </div>
            <div className="flex items-center space-x-2 mt-4">
                <Avatar className="w-8 h-8">

                    <AvatarImage />

                    <AvatarFallback className="dark:bg-gray-400">D</AvatarFallback>

                </Avatar>
                <Input

                    placeholder="Write a comment..."
                    className="flex-grow cursor-pointer rounded-full h-12 dark:bg-[rgb(58,59,60)] "
                />
                <Button variant="ghost" size="icon" className="hover:bg-transparent"
                >
                    <Send className="h-5 w-5 text-blue-500" />
                </Button>
            </div>
        </div>
    );
};

export default PostComments;