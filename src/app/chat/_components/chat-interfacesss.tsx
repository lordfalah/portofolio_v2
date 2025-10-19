"use client";
import { motion } from "motion/react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { siteConfig } from "@/config/site.config";
import GiscusComent from "./giscus-coment";

export function ChatInterface() {
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <GiscusComent />
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
