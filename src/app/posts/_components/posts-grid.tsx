"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ExternalLink,
  Calendar,
  Clock,
  AlertCircle,
  BookOpen,
  Rss,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import Image from "next/image";
import {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";
import EmptyPost from "./empty-post";

interface Post {
  id: string;
  title: string;
  brief: string;
  slug: string;
  url: string;
  publishedAt: string;
  readTimeInMinutes?: number;
  coverImage?: string;
  tags: { name: string }[];
  source: "hashnode" | "medium";
}

export function PostsGrid() {
  const [showDesktopTags, setShowDesktopTags] = useState(false);
  const [showTags, setShowTags] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [allTags, setAllTags] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 12;

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch("/api/posts");
        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }
        const data = await response.json();
        setPosts(data);
        // Collect all tags from all posts, remove duplicates
        const tagsSet = new Set<string>();
        data.forEach((post: Post) => {
          post.tags.forEach((tag) => tagsSet.add(tag.name));
        });
        setAllTags(Array.from(tagsSet).sort());
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <>
        {/* Responsive filter bar skeleton */}
        <div className="mt-4 mb-8">
          <div className="mb-2 flex items-center justify-between sm:hidden">
            <Skeleton className="h-7 w-24 rounded-full" />
            <Skeleton className="h-7 w-7 rounded-full" />
          </div>
          <div className="hidden flex-wrap gap-2 sm:flex">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-7 w-20 rounded-full" />
            ))}
          </div>
        </div>
        <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-full">
              <div className="group border-border from-background/80 to-background/40 flex h-full flex-col overflow-hidden rounded-xl border bg-gradient-to-br backdrop-blur-sm">
                <div className="relative h-48 w-full overflow-hidden">
                  <Skeleton className="absolute inset-0 h-full w-full rounded-t-xl object-cover" />
                  <div className="absolute top-3 right-3">
                    <Skeleton className="h-6 w-20 rounded-full" />
                  </div>
                </div>
                <div className="flex flex-1 flex-col justify-between p-4">
                  <div>
                    <Skeleton className="mb-2 h-5 w-3/4 rounded" />
                    <Skeleton className="mb-4 h-4 w-full rounded" />
                  </div>
                  <div className="mb-4 flex flex-wrap gap-2">
                    <Skeleton className="h-4 w-16 rounded-full" />
                    <Skeleton className="h-4 w-12 rounded-full" />
                    <Skeleton className="h-4 w-10 rounded-full" />
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <Skeleton className="h-4 w-20 rounded" />
                    <Skeleton className="h-4 w-14 rounded" />
                  </div>
                  <Skeleton className="mt-4 h-9 w-full rounded-lg" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="space-y-4 text-center">
          <AlertCircle className="text-destructive mx-auto h-12 w-12" />
          <h3 className="text-lg font-semibold">Unable to load articles</h3>
          <p className="text-muted-foreground">{error}</p>
          <Button
            onClick={() => window.location.reload()}
            variant="outline"
            className="mt-4"
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Responsive Filter bar */}
      <div className="mt-4 mb-8">
        {/* Mobile: collapse toggle */}
        <div className="mb-2 flex items-center justify-between sm:hidden">
          <button
            className="bg-primary text-primary-foreground border-border rounded-full border px-4 py-2 text-xs font-medium transition-colors"
            onClick={() => setShowTags((v) => !v)}
            aria-label="Toggle tags filter"
          >
            {showTags ? "Hide Tags" : "Show Tags"}
          </button>
          <button
            className={`rounded-full border px-4 py-2 text-xs font-medium transition-colors ${selectedTag === null ? "bg-background text-foreground" : "bg-primary text-primary-foreground"} border-border`}
            onClick={() => setSelectedTag(null)}
          >
            All
          </button>
        </div>
        {/* Mobile: collapsible tags */}
        {showTags && (
          <div className="mb-2 flex flex-wrap gap-2 sm:hidden">
            {allTags.map((tag) => (
              <button
                key={tag}
                className={`rounded-full border px-4 py-2 text-xs font-medium transition-colors ${selectedTag === tag ? "bg-primary text-primary-foreground" : "bg-background text-foreground hover:bg-muted"} border-border`}
                onClick={() => setSelectedTag(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        )}
        {/* Desktop: collapse/expand toggle */}
        <div className="hidden flex-wrap items-center gap-2 sm:flex">
          <button
            className="bg-primary text-primary-foreground border-border rounded-full border px-4 py-2 text-xs font-medium transition-colors"
            onClick={() => setShowDesktopTags((v) => !v)}
            aria-label="Toggle tags filter desktop"
          >
            {showDesktopTags ? "Hide Tags" : "Show Tags"}
          </button>
          <button
            className={`rounded-full border px-4 py-2 text-xs font-medium transition-colors ${selectedTag === null ? "bg-background text-foreground" : "bg-primary text-primary-foreground"} border-border`}
            onClick={() => setSelectedTag(null)}
          >
            All
          </button>
          {showDesktopTags &&
            allTags.map((tag) => (
              <button
                key={tag}
                className={`rounded-full border px-4 py-2 text-xs font-medium transition-colors ${selectedTag === tag ? "bg-primary text-primary-foreground" : "bg-background text-foreground hover:bg-muted"} border-border`}
                onClick={() => setSelectedTag(tag)}
              >
                {tag}
              </button>
            ))}
        </div>
      </div>
      {/* Posts Grid */}

      {posts.length <= 0 ? (
        <EmptyPost />
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {posts
            .slice((currentPage - 1) * pageSize, currentPage * pageSize)
            .map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex h-full flex-col"
              >
                <Card className="group from-background/80 to-background/40 hover:shadow-primary/5 flex h-full min-h-[420px] flex-1 flex-col overflow-hidden border-0 bg-gradient-to-br backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-xl">
                  <div className="from-primary/5 to-secondary/5 absolute inset-0 bg-gradient-to-r via-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  {/* Cover Image */}
                  {post.coverImage && (
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={post.coverImage}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                      {/* Source Badge */}
                      <div className="absolute top-3 right-3">
                        <Badge
                          variant="secondary"
                          className="bg-background/90 text-xs backdrop-blur-sm"
                        >
                          {post.source === "hashnode" ? (
                            <>
                              <BookOpen className="mr-1 h-3 w-3" /> Hashnode
                            </>
                          ) : (
                            <>
                              <Rss className="mr-1 h-3 w-3" /> Medium
                            </>
                          )}
                        </Badge>
                      </div>
                    </div>
                  )}
                  <CardHeader className="relative flex-1 space-y-3">
                    {!post.coverImage && (
                      <div className="flex items-center justify-between">
                        <Badge
                          variant="outline"
                          className="bg-primary/5 border-primary/20 text-xs"
                        >
                          {post.source === "hashnode" ? (
                            <>
                              <BookOpen className="mr-1 h-3 w-3" /> Hashnode
                            </>
                          ) : (
                            <>
                              <Rss className="mr-1 h-3 w-3" /> Medium
                            </>
                          )}
                        </Badge>
                      </div>
                    )}
                    <CardTitle className="group-hover:text-primary line-clamp-2 text-lg leading-tight transition-colors">
                      {post.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-3 leading-relaxed">
                      {post.brief}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="relative flex flex-1 flex-col justify-between space-y-4">
                    {post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {post.tags.slice(0, 3).map((tag) => (
                          <Badge
                            key={tag.name}
                            variant="secondary"
                            className="bg-muted/50 hover:bg-muted/70 text-xs transition-colors"
                          >
                            {tag.name}
                          </Badge>
                        ))}
                        {post.tags.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{post.tags.length - 3}
                          </Badge>
                        )}
                      </div>
                    )}
                    <div className="text-muted-foreground flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>{formatDate(post.publishedAt)}</span>
                      </div>
                      {post.readTimeInMinutes && (
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>{post.readTimeInMinutes} min read</span>
                        </div>
                      )}
                    </div>
                    <Button asChild className="group mt-4 w-full">
                      <Link
                        href={post.url as never}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2"
                      >
                        Read Article
                        <ExternalLink className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
        </div>
      )}

      {/* Pagination Controls */}
      {Math.ceil(posts.length / pageSize) > 1 && (
        <Pagination className="mt-8">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage > 1)
                    setCurrentPage((p) => Math.max(1, p - 1));
                }}
                className={
                  currentPage === 1 ? "pointer-events-none opacity-50" : ""
                }
              />
            </PaginationItem>
            {Array.from({ length: Math.ceil(posts.length / pageSize) }).map(
              (_, i) => (
                <PaginationItem key={i}>
                  <PaginationLink
                    href="#"
                    isActive={currentPage === i + 1}
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentPage(i + 1);
                    }}
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ),
            )}
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage < Math.ceil(posts.length / pageSize))
                    setCurrentPage((p) =>
                      Math.min(Math.ceil(posts.length / pageSize), p + 1),
                    );
                }}
                className={
                  currentPage === Math.ceil(posts.length / pageSize)
                    ? "pointer-events-none opacity-50"
                    : ""
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </>
  );
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
