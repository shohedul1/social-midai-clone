import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { AnimatePresence, motion } from 'framer-motion';
import { ImageIcon, Laugh, Plus, Video, X } from 'lucide-react';
import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';

const Picker = dynamic(() => import('emoji-picker-react'), { ssr: false });

interface NewPostFormProps {
    isPostFormOpen: boolean;
    setIsPostFormOpen: (isOpen: boolean) => void;
}

const NewPostForm: React.FC<NewPostFormProps> = ({ isPostFormOpen, setIsPostFormOpen }) => {
    const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);
    const [postContent, setPostContent] = useState<string>("");
    const [filePreview, setFilePreview] = useState<string | null>(null);
    const [fileType, setFileType] = useState<string>("");

    const handleEmojiClick = (emojiObject: { emoji: string }) => {
        setPostContent((prev) => prev + emojiObject.emoji);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFilePreview(URL.createObjectURL(file));
            setFileType(file.type);
        }
    };

    return (
        <Card>
            <CardContent className="p-4">
                <div className="flex space-x-4">
                    <Avatar>
                        <AvatarImage />
                        <AvatarFallback className="dark:bg-gray-400">D</AvatarFallback>
                    </Avatar>
                    <div className="w-full">
                        <Dialog open={isPostFormOpen} onOpenChange={setIsPostFormOpen}>
                            <DialogTrigger className="w-full">
                                <Input
                                    placeholder={`what's on your mind`}
                                    readOnly
                                    className="cursor-pointer rounded-full h-12 dark:bg-[rgb(58,59,60)] placeholder:text-gray-500 dark:placeholder:text-gray-400"
                                />
                                <Separator className="my-2 dark:bg-slate-400" />
                            </DialogTrigger>
                            <div className="flex justify-between">
                                <Button variant="ghost" className="flex items-center justify-center">
                                    <ImageIcon className="h-5 w-5 text-green-500 mr-2" />
                                    <span className="dark:text-slate-100">Photo</span>
                                </Button>
                                <Button variant="ghost" className="flex items-center justify-center">
                                    <Video className="h-5 w-5 text-red-500 mr-2" />
                                    <span className="dark:text-slate-100">Video</span>
                                </Button>
                                <Button variant="ghost" className="flex items-center justify-center">
                                    <Laugh className="h-5 w-5 text-orange-500 mr-2" />
                                    <span className="dark:text-slate-100">Feelings</span>
                                </Button>
                            </div>
                            <DialogContent className="sm:max-w-[525px] max-h-[80vh] overflow-y-auto">
                                <DialogHeader>
                                    <DialogTitle className="text-center">Create Post</DialogTitle>
                                </DialogHeader>
                                <Separator />
                                <div className="flex items-center space-x-3 py-4">
                                    <Avatar className="h-10 w-10">
                                        <AvatarImage />
                                        <AvatarFallback>D</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="font-semibold">User</p>
                                    </div>
                                </div>
                                <Textarea
                                    value={postContent}
                                    onChange={(e) => setPostContent(e.target.value)}
                                    placeholder={`what's on your mind?`}
                                    className="min-h-[100px] text-lg"
                                />
                                <AnimatePresence>
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="relative mt-4 border-2 border-dashed border-gray-300 rounded-lg p-8 flex flex-col items-center justify-center"
                                    >
                                        <Button variant="ghost" size="icon" className="absolute top-2 right-2">
                                            <X className="h-4 w-4" />
                                        </Button>

                                        {filePreview ? (
                                            fileType.startsWith("image") ? (
                                                <Image width={500} height={500} priority src={filePreview} alt="preview_img" className="w-full h-auto max-h-[300px] object-cover" />
                                            ) : (
                                                <video controls src={filePreview} className="w-full h-auto max-h-[300px] object-cover" />
                                            )
                                        ) : (
                                            <>
                                                <Plus className="h-12 w-12 text-gray-400 mb-2 cursor-pointer" />
                                                <p className="text-center text-gray-500">Add Photos/Videos</p>
                                            </>
                                        )}
                                        <input
                                            type="file"
                                            accept="image/*,video/*"
                                            className="hidden"
                                            onChange={handleFileChange}
                                        />
                                    </motion.div>
                                </AnimatePresence>

                                <div className="bg-gray-200 dark:bg-muted p-4 rounded-lg mt-4">
                                    <p className="font-semibold mb-2">Add Your Post</p>
                                    <div className="flex space-x-2">
                                        <Button variant="outline" size="icon">
                                            <ImageIcon className="h-4 w-4 text-green-500" />
                                        </Button>
                                        <Button variant="outline" size="icon">
                                            <Video className="h-4 w-4 text-red-500" />
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                                        >
                                            <Laugh className="h-4 w-4 text-orange-500" />
                                        </Button>
                                    </div>
                                </div>
                                {showEmojiPicker && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 20 }}
                                        className="relative"
                                    >
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="absolute top-2 right-2 z-10"
                                            onClick={() => setShowEmojiPicker(false)}
                                        >
                                            <X className="h-4 w-4" />
                                        </Button>
                                        <Picker onEmojiClick={handleEmojiClick} />
                                    </motion.div>
                                )}
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default NewPostForm;
