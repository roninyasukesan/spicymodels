import React from "react";

interface Profile {
  id: string;
  name: string;
  image: string;
  location: string;
  price: number;
  services: string[];
  isVerified: boolean;
  blurred: boolean;
}

interface ProfileGridProps {
  profiles?: Profile[];
  loading?: boolean;
}

const ProfileGrid = ({
  profiles = [
    {
      id: "1",
      name: "Jane Doe",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane",
      location: "New York, NY",
      price: 150,
      services: ["Companion", "Events", "Travel"],
      isVerified: true,
      blurred: false,
    },
    {
      id: "2",
      name: "John Smith",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
      location: "Los Angeles, CA",
      price: 200,
      services: ["Events", "Travel", "Dining"],
      isVerified: true,
      blurred: true,
    },
    {
      id: "3",
      name: "Alice Johnson",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alice",
      location: "Miami, FL",
      price: 175,
      services: ["Companion", "Events"],
      isVerified: false,
      blurred: false,
    },
  ],
  loading = false,
}: ProfileGridProps) => {
  return (
    <div className="w-full min-h-[800px] bg-gray-50 p-8">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
          {profiles.map((profile) => (
            <div
              key={profile.id}
              className="w-[280px] h-[380px] bg-white rounded-lg shadow-md overflow-hidden"
            >
              {/* Profile Image */}
              <div className="relative w-full h-[280px] bg-gray-100">
                <div
                  className={`w-full h-full ${profile.blurred ? "backdrop-blur-xl" : ""}`}
                >
                  <img
                    src={profile.image}
                    alt={profile.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Verification Badge */}
                {profile.isVerified && (
                  <div className="absolute top-2 right-2">
                    <div className="w-6 h-6 text-green-500 bg-white rounded-full flex items-center justify-center">
                      ✓
                    </div>
                  </div>
                )}
              </div>

              {/* Profile Info */}
              <div className="p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
                      <img
                        src={profile.image}
                        alt={profile.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="font-semibold text-lg">{profile.name}</h3>
                  </div>
                  <span className="text-green-600 font-semibold">
                    ${profile.price}/hr
                  </span>
                </div>

                <div className="flex items-center text-sm text-gray-500">
                  <span>{profile.location}</span>
                </div>

                <div className="flex flex-wrap gap-1">
                  {profile.services.map((service, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs"
                    >
                      {service}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileGrid;
