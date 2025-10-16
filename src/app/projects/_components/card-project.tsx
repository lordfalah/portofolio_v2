"use client";

import { GitHubRepo } from "@/types/github.type";
import React from "react";
import { motion } from "motion/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Calendar, ExternalLink, GitFork, Github, Star } from "lucide-react";
import { formatDate, getLanguageColor } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const CardProject: React.FC<{ projects: GitHubRepo[] }> = ({ projects }) => {
  return (
    <section className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {projects.map((project, index) => (
        <motion.div
          key={project.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          viewport={{ once: true }}
          className="flex h-full flex-col"
        >
          {" "}
          <Card className="group from-muted/50 to-background hover:shadow-primary/5 flex h-full min-h-[420px] flex-1 flex-col overflow-hidden border-0 bg-gradient-to-b from-30% pt-0 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-xl">
            <div className="from-primary/5 to-secondary/5 absolute inset-0 bg-gradient-to-r via-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            {/* Always show preview image for all repos */}
            <div className="relative mb-2 h-32 w-full overflow-hidden">
              <Image
                src={`https://opengraph.githubassets.com/1/${project.full_name}`}
                alt={project.name}
                width={400}
                height={128}
                className="h-full w-full rounded-t-xl object-cover"
                priority={index < 4}
                unoptimized
                style={{
                  width: "auto",
                  height: "auto",
                }}
              />
            </div>
            <CardHeader className="relative flex-1 space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex-1 space-y-2">
                  <CardTitle className="group-hover:text-primary line-clamp-1 text-lg transition-colors">
                    {project.name}
                  </CardTitle>
                  <CardDescription className="line-clamp-2 leading-relaxed">
                    {project.description || "No description available"}
                  </CardDescription>
                </div>
                <div className="text-muted-foreground ml-4 flex items-center gap-2 text-sm">
                  <Star className="h-3 w-3" />
                  <span>{project.stargazers_count}</span>
                </div>
              </div>
              {project.language && (
                <div className="flex items-center gap-2">
                  <div
                    className={`h-3 w-3 rounded-full bg-[${getLanguageColor(project.language)}]`}
                  />
                  <span className="text-muted-foreground text-sm">
                    {project.language}
                  </span>
                </div>
              )}
            </CardHeader>
            <CardContent className="relative flex flex-1 flex-col justify-between space-y-4">
              {project.topics.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {project.topics.slice(0, 3).map((topic) => (
                    <Badge
                      key={topic}
                      variant="secondary"
                      className="bg-muted/50 hover:bg-muted/70 text-xs transition-colors"
                    >
                      {topic}
                    </Badge>
                  ))}
                  {project.topics.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{project.topics.length - 3}
                    </Badge>
                  )}
                </div>
              )}
              <div className="text-muted-foreground flex items-center gap-4 text-xs">
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  <span>Updated {formatDate(project.updated_at)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <GitFork className="h-3 w-3" />
                  <span>{project.forks_count}</span>
                </div>
              </div>
              <div className="flex items-center gap-3 pt-4">
                <Button asChild size="sm" variant="outline" className="flex-1">
                  <Link
                    href={project.html_url as never}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2"
                  >
                    <Github className="h-3 w-3" />
                    Code
                  </Link>
                </Button>
                {project.homepage && (
                  <Button asChild size="sm" className="flex-1">
                    <Link
                      href={project.homepage as never}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2"
                    >
                      <ExternalLink className="h-3 w-3" />
                      Live
                    </Link>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </section>
  );
};

export default CardProject;
