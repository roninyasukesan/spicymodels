import React from "react";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { CheckCircle } from "lucide-react";

interface ProfileCardProps {
  name?: string;
  image?: string;
  location?: string;
  price?: number;
  services?: string[];
  isVerified?: boolean;
  blurred?: boolean;
}

const ProfileCard = ({
  name = "Jane Doe",
  image = "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane",
  location = "New York, NY",
  price = 150,
  services = ["Companion", "Events", "Travel"],
  isVerified = true,
  blurred = false,
}: ProfileCardProps) => {
  return (
    <Card className="w-[280px] h-[380px] bg-white overflow-hidden transition-all hover:shadow-lg">
      <CardContent className="p-0 relative">
        {/* Profile Image */}
        <div className="relative w-full h-[280px] bg-gray-100">
          <div className={`w-full h-full ${blurred ? "backdrop-blur-xl" : ""}`}>
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover"
            />
          </div>
          {/* Verification Badge */}
          {isVerified && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="absolute top-2 right-2">
                    <CheckCircle className="w-6 h-6 text-green-500 bg-white rounded-full" />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Verified Profile</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>

        {/* Profile Info */}
        <div className="p-4 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Avatar className="w-8 h-8">
                <AvatarImage src={image} alt={name} />
                <AvatarFallback>{name.charAt(0)}</AvatarFallback>
              </Avatar>
              <h3 className="font-semibold text-lg">{name}</h3>
            </div>
            <span className="text-green-600 font-semibold">${price}/hr</span>
          </div>

          <div className="flex items-center text-sm text-gray-500">
            <span>{location}</span>
          </div>

          <div className="flex flex-wrap gap-1">
            {services.map((service, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {service}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
