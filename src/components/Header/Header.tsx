"use client";
import {
  Bell,
  Home,
  LogOut,
  Menu,
  MessageCircle,
  Moon,
  Search,
  Sun,
  Users,
  Video,
} from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Input } from "../../components/ui/input";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";
import { Button } from "../../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuSeparator,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import useSidebarStore from "../../../store/sidebarStore";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { logout } from "@/service/auth.service";
import userStore from "../../../store/userStore";
import toast from "react-hot-toast";

const Header = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [theme, setTheme] = useState("light");
  const { user, clearUser } = userStore();

  const userPlaceholder = user?.username
    ?.split(" ")
    .map((name) => name[0])
    .join("");


  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") || "light";
    setTheme(storedTheme);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleCheckboxChange = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  const { toggleSidebar } = useSidebarStore();

  const handleFocus = () => setIsSearchOpen(true);
  const handleBlur = () => setIsSearchOpen(false);

  const router = useRouter();

  const handleNavigation = (path: string) => {
    router.push(path);
  };


  const handleLogout = async () => {
    try {
      const result = await logout();
      if (result?.status == "success") {
        router.push("/user-login");
        clearUser();
      }
      toast.success("user logged out successfully");
    } catch (error) {
      console.log(error);
      toast.error("failed to log out");
    }
  };
  return (
    <header className="bg-white dark:bg-black text-foreground shadow-md fixed h-16 left-0 right-0 top-0 z-50 p-2">
      <div className="mx-auto flex items-center justify-between p-2">
        <div className="flex items-center gap-7 md:gap-4">
          <Link href={"/"}>
            <Image
              src={"/images/facebook.webp"}
              width={40}
              height={40}
              alt="image"
            />
          </Link>
          <div className="relative">
            <form>
              <div className="relative">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  className="pl-8 w-48 md:w-64 h-10 bg-gray-100 dark:bg-black rounded-full"
                  placeholder="search facebook"
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
              </div>
              {isSearchOpen && (
                <div className="absolute top-full left-0 w-full bg-white dark:bg-black border-gary-200 dark:border-gray-700 rounded-md shadow-lg mt-1 z-50">
                  <div className="p-2">
                    <div className="flex items-center space-x-8 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md cursor-pointer">
                      <Search className="absolute text-sm text-gray-400" />
                      <div className="flex items-center gap-2">
                        <Avatar>
                          <AvatarImage />
                          <AvatarFallback>D</AvatarFallback>
                        </Avatar>
                        <span>Dheeraj Agrahari</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>

        <nav className="hidden md:flex justify-around w-[40%] max-w-md">
          {[
            { icon: Home, path: "/", name: "home" },
            { icon: Video, path: "/video-feed", name: "video" },
            { icon: Users, path: "/friends-list", name: "friends" },
          ].map(({ icon: Icon, path, name }) => {
            return (
              <Button
                key={name}
                onClick={() => handleNavigation(path)} // Wrap the call in an arrow function
                variant="ghost"
                size="icon"
                className="relative text-gray-600 dark:text-gray-400 hover:text-blue-600 hover:bg-transparent"
              >
                <Icon />
              </Button>
            );
          })}
        </nav>

        <div className="flex space-x-2 md:space-x-4 items-center">
          <Button
            onClick={toggleSidebar}
            variant="ghost"
            size="icon"
            className="md:hidden text-gray-600 cursor-pointer"
          >
            <Menu />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="hidden md:block text-gray-600 pl-1"
          >
            <Bell />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="hidden md:block text-gray-600 pl-1"
          >
            <MessageCircle />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8 mr-2">
                  {user?.profilePicture ? (
                    <AvatarImage
                      src={user?.profilePicture}
                      alt={user?.username}
                    />
                  ) : (
                    <AvatarFallback className="dark:bg-gray-400">
                      {userPlaceholder}
                    </AvatarFallback>
                  )}
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-64 z-50" align="end">
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <div className="flex items-center">
                    <Avatar className="h-8 w-8 mr-2">
                      {user?.profilePicture ? (
                        <AvatarImage
                          src={user?.profilePicture}
                          alt={user?.username}
                        />
                      ) : (
                        <AvatarFallback className="dark:bg-gray-400">
                          {userPlaceholder}
                        </AvatarFallback>
                      )}
                    </Avatar>

                    <div className="">
                      <p className="text-sm font-medium leading-none">
                        {user?.username}
                      </p>
                      <p className="text-xs mt-2 text-gray-600 leading-none">
                        {user?.email}
                      </p>
                    </div>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => handleNavigation(`/user-profile/${user?._id}`)}
              >
                <Users /> <span className="ml-2">Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <MessageCircle />
                <span className="ml-2">Message</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={handleCheckboxChange}
                className="cursor-pointer"
              >
                {theme === "light" ? (
                  <>
                    <Moon className="mr-2" />
                    <span>Dark Mode</span>
                  </>
                ) : (
                  <>
                    <Sun className="mr-2" />
                    <span>Light Mode</span>
                  </>
                )}
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={handleLogout}
              >
                <LogOut />
                <span className="ml-2">Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header >
  );
};

export default Header;
