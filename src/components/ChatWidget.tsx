import React, { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { ScrollArea } from "./ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { MessageCircle, X, MinusCircle, Send } from "lucide-react";
import { Input } from "./ui/input";

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
  avatar: string;
}

interface ChatWidgetProps {
  isOpen?: boolean;
  onClose?: () => void;
  messages?: Message[];
  currentUser?: {
    name: string;
    avatar: string;
  };
}

const ChatWidget = ({
  isOpen = true,
  onClose = () => {},
  messages: initialMessages = [
    {
      id: "1",
      sender: "Jane Doe",
      content: "Hello! How are you?",
      timestamp: "2:30 PM",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane",
    },
    {
      id: "2",
      sender: "John Smith",
      content: "I'm doing great, thanks for asking!",
      timestamp: "2:31 PM",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
    },
  ],
  currentUser = {
    name: "You",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=You",
  },
}: ChatWidgetProps) => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: Date.now().toString(),
        sender: currentUser.name,
        content: newMessage,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        avatar: currentUser.avatar,
      };
      setMessages([...messages, message]);
      setNewMessage("");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isMinimized ? (
        <Button
          onClick={() => setIsMinimized(false)}
          className="rounded-full w-12 h-12 bg-primary hover:bg-primary/90"
        >
          <MessageCircle className="h-6 w-6" />
          <Badge
            className="absolute -top-2 -right-2 bg-red-500"
            variant="destructive"
          >
            {messages.length}
          </Badge>
        </Button>
      ) : (
        <Card className="w-[320px] h-[480px] bg-white shadow-xl">
          <CardContent className="p-0 flex flex-col h-full">
            {/* Chat Header */}
            <div className="p-3 border-b flex items-center justify-between bg-primary text-primary-foreground">
              <h2 className="text-lg font-semibold">Messages</h2>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsMinimized(true)}
                >
                  <MinusCircle className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" onClick={onClose}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Messages Area */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-2 ${message.sender === currentUser.name ? "flex-row-reverse" : "flex-row"}`}
                  >
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={message.avatar} />
                      <AvatarFallback>{message.sender[0]}</AvatarFallback>
                    </Avatar>
                    <div
                      className={`max-w-[70%] ${message.sender === currentUser.name ? "bg-primary text-primary-foreground" : "bg-muted"} rounded-lg p-2`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <span className="text-xs opacity-70">
                        {message.timestamp}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Message Input */}
            <div className="p-3 border-t">
              <div className="flex gap-2">
                <Input
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                />
                <Button onClick={handleSendMessage}>
                  <Send className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ChatWidget;
