"use client";
import Image from "next/image";

import { BetterAuthSignIn } from "../../../components/sections/better-auth-signin";
import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import Link from "next/link";
import { useSession } from "@/lib/auth-client";
import { siteConfig } from "@/config/site.config";

export type Message = {
  sender: "user" | "me";
  name: string;
  avatar: string;
  content: string;
  time: string;
};

export function ChatInterface() {
  const { data } = useSession();
  const user = data?.user?.name || null;
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) return;
    fetch(`/api/chat?user=${user}`)
      .then((res) => res.json())
      .then((data) => setMessages(data.messages || []));
  }, [user]);

  const handleSend = async () => {
    if (!input.trim() || !user) return;
    setLoading(true);
    const newMsg: Message = {
      sender: "user",
      name: "You",
      avatar: "/avatar-user.png",
      content: input,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user, message: newMsg }),
    });
    setMessages((prev) => [...prev, newMsg]);
    setInput("");
    setLoading(false);
  };

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Card className="from-primary/5 via-background/50 to-background/20 border-primary/20 bg-gradient-to-br backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="text-primary h-5 w-5" />
              Chat Conversation
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {!user && <BetterAuthSignIn />}
            <div className="flex flex-col gap-4">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={
                    msg.sender === "me"
                      ? "flex justify-end"
                      : "flex justify-start"
                  }
                >
                  <div className="flex max-w-[70%] items-end gap-2">
                    {msg.sender === "user" && (
                      <Image
                        src={msg.avatar}
                        alt={msg.name}
                        width={32}
                        height={32}
                        className="border-border h-8 w-8 rounded-full border object-cover"
                      />
                    )}
                    <div
                      className={
                        msg.sender === "me"
                          ? "bg-primary text-primary-foreground rounded-lg px-4 py-2 shadow-md"
                          : "bg-muted text-foreground rounded-lg px-4 py-2 shadow-md"
                      }
                    >
                      <div className="mb-1 text-xs font-semibold">
                        {msg.name}{" "}
                        <span className="text-muted-foreground">
                          {msg.time}
                        </span>
                      </div>
                      <div className="text-sm leading-relaxed">
                        {msg.content}
                      </div>
                    </div>
                    {msg.sender === "me" && (
                      <Image
                        src={msg.avatar}
                        alt={msg.name}
                        width={32}
                        height={32}
                        className="border-border h-8 w-8 rounded-full border object-cover"
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
            {user && (
              <div className="mt-4 flex gap-2">
                <input
                  type="text"
                  className="border-border bg-background flex-1 rounded-lg border px-3 py-2 text-sm"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message..."
                  disabled={loading}
                />
                <Button
                  size="sm"
                  onClick={handleSend}
                  disabled={loading || !input.trim()}
                >
                  Send
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Additional Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="text-center"
      >
        <Card className="from-secondary/5 to-primary/5 border-border/50 inline-block bg-gradient-to-r p-6">
          <CardContent className="space-y-3 p-0">
            <h3 className="font-semibold">Prefer email instead?</h3>
            <p className="text-muted-foreground text-sm">
              You can also reach out to me directly via email for more formal
              inquiries.
            </p>
            <Button asChild variant="outline" size="sm">
              <Link href={siteConfig.links.email as never}>Send Email</Link>
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
