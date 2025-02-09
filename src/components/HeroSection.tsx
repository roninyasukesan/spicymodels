import React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Slider } from "./ui/slider";
import { Badge } from "./ui/badge";
import { Search, MapPin, DollarSign, Tag } from "lucide-react";

interface HeroSectionProps {
  onSearch?: (searchParams: {
    location: string;
    priceRange: number[];
    services: string[];
  }) => void;
}

const HeroSection = ({ onSearch }: HeroSectionProps = {}) => {
  const [priceRange, setPriceRange] = React.useState([0, 500]);
  const [selectedServices, setSelectedServices] = React.useState<string[]>([
    "Companion",
  ]);

  const availableServices = [
    "Companion",
    "Events",
    "Travel",
    "Dining",
    "Entertainment",
  ];

  const handleSearch = () => {
    onSearch?.({
      location: "New York", // Default location
      priceRange,
      services: selectedServices,
    });
  };

  return (
    <div className="w-full min-h-[500px] bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center px-4 md:px-6 lg:px-8">
      <div className="max-w-4xl w-full space-y-8 text-center">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
            Find Your Perfect Companion
          </h1>
          <p className="text-xl text-white/90">
            Connect with verified companions for events, travel, and more
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-xl space-y-4">
          {/* Search Bar with Location */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <MapPin className="absolute left-3 top-3 text-gray-400" />
              <Input
                placeholder="Location"
                className="pl-10"
                defaultValue="New York"
              />
            </div>
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 text-gray-400" />
              <Input placeholder="Search companions..." className="pl-10" />
            </div>
          </div>

          {/* Price Range Slider */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <DollarSign className="text-gray-400" />
              <span className="text-sm text-gray-600">
                Price Range (per hour)
              </span>
            </div>
            <Slider
              defaultValue={[0, 500]}
              max={1000}
              step={10}
              value={priceRange}
              onValueChange={setPriceRange}
              className="py-4"
            />
            <div className="flex justify-between text-sm text-gray-600">
              <span>${priceRange[0]}</span>
              <span>${priceRange[1]}</span>
            </div>
          </div>

          {/* Services Select */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Tag className="text-gray-400" />
              <span className="text-sm text-gray-600">Services</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {availableServices.map((service) => (
                <Badge
                  key={service}
                  variant={
                    selectedServices.includes(service) ? "default" : "outline"
                  }
                  className="cursor-pointer"
                  onClick={() => {
                    setSelectedServices((prev) =>
                      prev.includes(service)
                        ? prev.filter((s) => s !== service)
                        : [...prev, service],
                    );
                  }}
                >
                  {service}
                </Badge>
              ))}
            </div>
          </div>

          {/* Search Button */}
          <Button className="w-full mt-4" size="lg" onClick={handleSearch}>
            Search Companions
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
