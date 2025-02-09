import React from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "./ui/navigation-menu";
import { Search, User, Bell } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";

interface HeaderProps {
  isLoggedIn?: boolean;
  username?: string;
  avatarUrl?: string;
  notificationCount?: number;
}

const Header = ({
  isLoggedIn = false,
  username = "Guest User",
  avatarUrl = "https://api.dicebear.com/7.x/avataaars/svg?seed=guest",
  notificationCount = 3,
}: HeaderProps) => {
  return (
    <header className="sticky top-0 z-50 w-full h-[72px] bg-white border-b shadow-sm">
      <div className="container mx-auto h-full px-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <h1 className="text-2xl font-bold text-primary">SpicyModels</h1>
        </div>

        {/* Quick Search */}
        <div className="hidden md:flex items-center max-w-md w-full mx-4">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Quick search..."
              className="w-full pl-10"
            />
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center space-x-4">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Browse</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid gap-3 p-4 w-[400px]">
                    <NavigationMenuLink className="block p-2 hover:bg-gray-100 rounded">
                      Featured Profiles
                    </NavigationMenuLink>
                    <NavigationMenuLink className="block p-2 hover:bg-gray-100 rounded">
                      New Arrivals
                    </NavigationMenuLink>
                    <NavigationMenuLink className="block p-2 hover:bg-gray-100 rounded">
                      Top Rated
                    </NavigationMenuLink>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {isLoggedIn ? (
            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <div className="relative">
                <Button variant="ghost" size="icon">
                  <Bell className="h-5 w-5" />
                  {notificationCount > 0 && (
                    <Badge
                      variant="destructive"
                      className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                    >
                      {notificationCount}
                    </Badge>
                  )}
                </Button>
              </div>

              {/* User Menu */}
              <div className="flex items-center space-x-2">
                <Avatar>
                  <AvatarImage src={avatarUrl} alt={username} />
                  <AvatarFallback>{username[0]}</AvatarFallback>
                </Avatar>
                <span className="hidden md:inline-block font-medium">
                  {username}
                </span>
              </div>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Button variant="ghost">Log in</Button>
              <Button>Sign up</Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
