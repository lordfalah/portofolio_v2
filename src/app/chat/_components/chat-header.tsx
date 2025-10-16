"use client";

import { motion } from "motion/react";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Lock, Github } from "lucide-react";

export function ChatHeader() {
  return (
    <div className="mb-16 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Badge
          variant="outline"
          className="bg-primary/5 text-primary border-primary/20 mb-6"
        >
          <MessageCircle className="mr-1 h-3 w-3" />
          Private Chat
        </Badge>
        <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
          Let&apos;s{" "}
          <span className="from-primary to-primary/60 bg-gradient-to-r bg-clip-text text-transparent">
            Talk
          </span>
        </h1>
        <p className="text-muted-foreground mx-auto max-w-3xl text-lg leading-relaxed">
          Have a private 1:1 conversation with me through GitHub Discussions.
          Sign in with your GitHub account to get started. All conversations are
          private and secure.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mt-8 flex items-center justify-center gap-6"
      >
        <div className="text-muted-foreground flex items-center gap-2 text-sm">
          <Lock className="h-4 w-4" />
          <span>Private & Secure</span>
        </div>
        <div className="text-muted-foreground flex items-center gap-2 text-sm">
          <Github className="h-4 w-4" />
          <span>GitHub Authentication</span>
        </div>
      </motion.div>
    </div>
  );
}
