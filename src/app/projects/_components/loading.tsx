import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Search } from "lucide-react";
import React from "react";

const LoadingProject = () => {
  return (
    <div className="min-h-screen py-16">
      <div className="mx-auto mt-16 max-w-7xl px-6 md:mt-24">
        <ProjectsSkeleton />
      </div>
    </div>
  );
};

export function ProjectsSkeleton() {
  return (
    <>
      <div className="mb-6">
        {/* Centered Search Bar with icon, like PostsSearch */}
        <div className="relative mx-auto mb-2 max-w-md">
          <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform transition-colors" />
          <Input
            type="text"
            placeholder="Search projects..."
            defaultValue=""
            className="bg-background/50 border-border/60 focus:border-primary/50 pl-10 backdrop-blur-sm"
            disabled
          />
        </div>
        {/* Skeleton for filter bar */}
        <div className="mb-4 flex flex-wrap gap-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <Button
              key={i}
              disabled
              className="rounded-full px-4 py-1 text-xs opacity-50"
            >
              <span className="sr-only">Loading</span>
              <span className="animate-pulse">&nbsp;</span>
            </Button>
          ))}
        </div>
        {/* Skeleton grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <Card
              key={i}
              className="group from-background/80 to-background/40 flex h-full min-h-[420px] flex-1 flex-col overflow-hidden rounded-xl border-0 bg-gradient-to-br backdrop-blur-sm"
            >
              <div className="relative mb-2 h-32 w-full overflow-hidden">
                <div className="bg-muted h-full w-full animate-pulse rounded-t-xl" />
              </div>
              <CardHeader className="relative flex-1 space-y-4">
                <div className="flex-1 space-y-2">
                  <div className="bg-muted mb-2 h-5 w-3/4 animate-pulse rounded" />
                  <div className="bg-muted h-4 w-full animate-pulse rounded" />
                </div>
                <div className="text-muted-foreground ml-4 flex items-center gap-2 text-sm">
                  <div className="bg-muted h-4 w-8 animate-pulse rounded" />
                </div>
              </CardHeader>
              <CardContent className="relative flex flex-1 flex-col justify-between space-y-4">
                <div className="flex flex-wrap gap-2">
                  <div className="bg-muted h-4 w-16 animate-pulse rounded-full" />
                  <div className="bg-muted h-4 w-12 animate-pulse rounded-full" />
                  <div className="bg-muted h-4 w-10 animate-pulse rounded-full" />
                </div>
                <div className="text-muted-foreground flex items-center gap-4 text-xs">
                  <div className="bg-muted h-4 w-20 animate-pulse rounded" />
                  <div className="bg-muted h-4 w-14 animate-pulse rounded" />
                </div>
                <div className="flex items-center gap-3 pt-4">
                  <div className="bg-muted h-9 w-full animate-pulse rounded-lg" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="bg-muted/30 h-64 animate-pulse rounded-lg" />
        ))}
      </div>
    </>
  );
}

export function ProjectsHeaderSkeleton() {
  return (
    <div className="mb-16 text-center" aria-hidden="true">
      {/* Container utama, tidak perlu animate-pulse karena komponen Skeleton sudah meng-handle */}
      <div>
        {/* Skeleton untuk Badge/Label (Projects) */}
        {/* Menggantikan Badge */}
        <div className="mx-auto mb-6 w-24">
          <Skeleton className="h-5 w-full rounded-full" />
        </div>

        {/* Skeleton untuk Judul Utama (H1 - My Projects) */}
        {/* Menggantikan h1 */}
        <div className="mx-auto mb-6 w-3/5">
          <Skeleton className="h-10 w-full rounded-lg md:h-12 lg:h-14" />
        </div>

        {/* Skeleton untuk Paragraf Deskripsi */}
        {/* Menggantikan p */}
        <div className="mx-auto max-w-3xl space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="mx-auto h-4 w-11/12" />
          <Skeleton className="mx-auto h-4 w-5/6" />
        </div>
      </div>

      {/* Skeleton untuk Info Meta di bawah (Github & Real-time) */}
      <div className="mt-8 flex items-center justify-center gap-6">
        {/* Info 1: Fetched from GitHub */}
        <div className="flex items-center gap-2">
          {/* Ikon Placeholder */}
          <Skeleton className="h-4 w-4 rounded-full" />
          {/* Teks Placeholder */}
          <Skeleton className="h-3 w-32" />
        </div>

        {/* Info 2: Updated in real-time */}
        <div className="flex items-center gap-2">
          {/* Ikon Placeholder */}
          <Skeleton className="h-4 w-4 rounded-full" />
          {/* Teks Placeholder */}
          <Skeleton className="h-3 w-28" />
        </div>
      </div>
    </div>
  );
}

export default LoadingProject;
