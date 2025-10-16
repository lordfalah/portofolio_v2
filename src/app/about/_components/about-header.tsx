"use client";

import { motion } from "motion/react";
import { Badge } from "@/components/ui/badge";
import { User } from "lucide-react";

export function AboutHeader() {
  return (
    <div className="text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Badge
          variant="outline"
          className="bg-primary/5 text-primary border-primary/20 mb-6"
        >
          <User className="mr-1 h-3 w-3" />
          About Me
        </Badge>
        <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
          Irfin{" "}
          <span className="from-primary to-primary/60 bg-gradient-to-r bg-clip-text text-transparent">
            Falah
          </span>
        </h1>
        <p className="text-muted-foreground mx-auto max-w-3xl text-lg leading-relaxed">
          Full Stack Developer passionate about creating innovative solutions
          that bridge the gap between complex technology and user-friendly
          experiences.
        </p>
      </motion.div>
    </div>
  );
}
