"use client";

import { motion } from "motion/react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import BlobAvatar from "@/components/blob";

export function AboutContent() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="space-y-8"
    >
      <Card className="from-background/80 to-background/40 relative overflow-hidden border-0 bg-gradient-to-br backdrop-blur-sm">
        <CardHeader className="relative z-10 flex flex-col items-center justify-center gap-4 pt-8 pb-2">
          <BlobAvatar />

          <div className="text-primary text-center text-3xl font-extrabold">
            My Kisah
          </div>
        </CardHeader>
        <CardContent className="relative z-10 space-y-4 text-justify">
          <p className="text-muted-foreground leading-relaxed">
            Hello, my name is Irfin Falah, you can call me Irfin or Fal for
            short. If you`re my school/college friend you maybe know me as Ipin.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            I grew up in a small village in Singkawang, West Kalimantan. I am a
            recent graduate majoring in Information Technology from STMIK
            Pontianak, actively seeking opportunities in Frontend Development. I
            successfully completed the Kampus Merdeka Batch 7 internship program
            at Aksamedia Mulia Digital, where I worked as a Frontend Developer
            focusing on building responsive and user-friendly web applications.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            I love exploring everything related to technology. When i was in
            college i join many community to expand my knowledge and On the
            other hand, my love for technology and programming led me to delve
            into the world of full-stack development. I am skilled in front-end
            technologies such as Next.js and TailwindCSS, as well as back-end
            technologies like Express
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
