import { Suspense } from "react";
import { PostsGrid } from "@/app/posts/_components/posts-grid";
import { PostsHeader } from "@/app/posts/_components/posts-header";
import { PostsSearch } from "@/app/posts/_components/posts-search";
import { siteConfig } from "@/config/site.config";

export const metadata = {
  title: `Posts | ${siteConfig.siteName}`,
  description:
    "Read my latest thoughts on technology, development, and innovation from Hashnode and Medium.",
};

export default function PostsPage() {
  return (
    <div className="min-h-screen">
      <div className="mx-auto mt-16 max-w-7xl px-6 md:mt-24">
        <PostsHeader />
        <PostsSearch />
        <Suspense fallback={<PostsLoading />}>
          <PostsGrid />
        </Suspense>
      </div>
    </div>
  );
}

function PostsLoading() {
  return (
    <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="bg-muted/30 h-80 animate-pulse rounded-lg" />
      ))}
    </div>
  );
}
