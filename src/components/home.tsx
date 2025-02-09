import React from "react";
import Header from "./Header";
import HeroSection from "./HeroSection";
import ProfileGrid from "./ProfileGrid";
import ChatWidget from "./ChatWidget";

interface HomeProps {
  isLoggedIn?: boolean;
  username?: string;
  avatarUrl?: string;
  notificationCount?: number;
}

const Home = ({
  isLoggedIn = false,
  username = "Guest User",
  avatarUrl = "https://api.dicebear.com/7.x/avataaars/svg?seed=guest",
  notificationCount = 3,
}: HomeProps) => {
  const [searchParams, setSearchParams] = React.useState({
    location: "",
    priceRange: [0, 500],
    services: ["Companion"],
  });

  const handleSearch = (params: {
    location: string;
    priceRange: number[];
    services: string[];
  }) => {
    setSearchParams(params);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header
        isLoggedIn={isLoggedIn}
        username={username}
        avatarUrl={avatarUrl}
        notificationCount={notificationCount}
      />

      <main>
        <HeroSection onSearch={handleSearch} />

        <div className="container mx-auto py-12">
          <div className="space-y-4 mb-8">
            <h2 className="text-3xl font-bold">Featured Companions</h2>
            <p className="text-muted-foreground">
              Discover our most popular and highly-rated companions
            </p>
          </div>

          <ProfileGrid
            profiles={[
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
                blurred: !isLoggedIn,
              },
              {
                id: "3",
                name: "Alice Johnson",
                image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alice",
                location: "Miami, FL",
                price: 175,
                services: ["Companion", "Events"],
                isVerified: false,
                blurred: !isLoggedIn,
              },
            ]}
          />
        </div>
      </main>

      {isLoggedIn && <ChatWidget />}
    </div>
  );
};

export default Home;
