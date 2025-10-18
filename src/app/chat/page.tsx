import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { ChatHeader } from "@/app/chat/_components/chat-header";
import { ChatInterface } from "@/app/chat/_components/chat-interfacesss";
import { siteConfig } from "@/config/site.config";

export const metadata = {
  title: `Chat | ${siteConfig.siteName}`,
  description:
    "Have a private conversation with Muhammad Fiaz using GitHub Discussions.",
};

export default function ChatPage() {
  return (
    <div className="min-h-screen">
      <div className="mx-auto mt-20 max-w-4xl px-6 md:mt-24">
        <ChatHeader />
        <Suspense fallback={<ChatSkeleton />}>
          <ChatInterface />
        </Suspense>
      </div>
    </div>
  );
}

function ChatSkeleton() {
  return (
    <div className="space-y-8">
      <div className="from-primary/5 via-background/50 to-background/20 border-primary/20 rounded-xl bg-gradient-to-br p-6 backdrop-blur-sm">
        <Skeleton className="mb-4 h-6 w-1/3" />
        <div className="flex flex-col gap-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex max-w-[70%] gap-2">
              <Skeleton className="h-8 w-8 rounded-full" />
              <Skeleton className="h-10 flex-1 rounded-lg" />
            </div>
          ))}
        </div>
        <div className="mt-4 flex gap-2">
          <Skeleton className="h-10 flex-1 rounded-lg" />
          <Skeleton className="h-10 w-20 rounded-lg" />
        </div>
      </div>
      <div className="from-secondary/5 to-primary/5 border-border/50 inline-block rounded-xl bg-gradient-to-r p-6">
        <Skeleton className="mb-2 h-5 w-1/4" />
        <Skeleton className="mb-2 h-4 w-2/3" />
        <Skeleton className="h-10 w-24" />
      </div>
    </div>
  );
}
