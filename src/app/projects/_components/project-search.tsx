"use client";
import React, { Fragment } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useProjectSearchParams } from "@/hooks/use-project-search-params";

const ProjectSearch: React.FC<{
  topics: string[];
  onHandleTag: (topic: string) => void;
}> = ({ topics, onHandleTag }) => {
  const [params, setParams] = useProjectSearchParams();

  return (
    <Fragment>
      <div className="my-4 flex items-center justify-between sm:hidden">
        <button
          className="bg-primary text-primary-foreground border-border rounded-full border px-4 py-2 text-xs font-medium transition-colors"
          onClick={() => setParams((v) => ({ show: !v.show }))}
          aria-label="Toggle tags filter"
        >
          {params.show ? "Hide Tags" : "Show Tags"}
        </button>
        <button
          className={`rounded-full border px-4 py-2 text-xs font-medium transition-colors ${params.tags.length === 0 ? "bg-background text-foreground" : "bg-primary text-primary-foreground"} border-border`}
          onClick={() => setParams({ tags: [] })}
        >
          Clear Filter
        </button>
      </div>
      {/* Mobile: collapsible tags, left aligned, only show once */}
      {params.show && (
        <div className="mt-2 flex flex-wrap items-center justify-start gap-3 sm:hidden">
          {topics.map((topic) => (
            <Button
              key={topic}
              variant={params.tags.includes(topic) ? "default" : "outline"}
              size="sm"
              onClick={() => onHandleTag(topic)}
              className="h-7 text-xs"
            >
              {topic}
            </Button>
          ))}
          {(params.title || params.tags.length > 0) && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setParams({ tags: [], title: "" });
              }}
              className="text-muted-foreground hover:text-foreground h-7 text-xs"
            >
              <X className="mr-1 h-3 w-3" />
              Clear
            </Button>
          )}
        </div>
      )}
      {/* Desktop: tag bar, left aligned, only show once */}
      <div className="my-4 hidden flex-wrap items-center justify-start gap-3 sm:flex">
        <button
          className="bg-primary text-primary-foreground border-border rounded-full border px-4 py-2 text-xs font-medium transition-colors"
          onClick={() => setParams((s) => ({ show: !s.show }))}
          aria-label="Toggle tags filter desktop"
        >
          {params.show ? "Hide Tags" : "Show Tags"}
        </button>
        <button
          className={`rounded-full border px-4 py-2 text-xs font-medium transition-colors ${params.tags.length === 0 ? "bg-background text-foreground" : "bg-primary text-primary-foreground"} border-border`}
          onClick={() => setParams({ tags: [] })}
        >
          Clear Filter
        </button>
        {params.show &&
          topics.map((topic) => (
            <Button
              key={topic}
              variant={params.tags.includes(topic) ? "default" : "outline"}
              size="sm"
              onClick={() => onHandleTag(topic)}
              className="h-7 text-xs"
            >
              {topic}
            </Button>
          ))}
        {(params.title || params.tags.length > 0) && params.show && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setParams({ tags: [], title: "" });
            }}
            className="text-muted-foreground hover:text-foreground h-7 text-xs"
          >
            <X className="mr-1 h-3 w-3" />
            Clear
          </Button>
        )}
      </div>
      {/* Active Filters */}
      {(params.title || params.tags.length > 0) && (
        <div className="my-4 flex flex-wrap items-center justify-start gap-2">
          <span className="text-muted-foreground text-sm">Active filters:</span>
          {params.title && (
            <Badge variant="secondary" className="text-xs">
              Search: &quot;{params.title}&quot;
            </Badge>
          )}
          {params.tags.length > 0 && (
            <Badge variant="secondary" className="text-xs">
              Tag: {params.tags.map((tag) => `${tag} | `)}
            </Badge>
          )}
        </div>
      )}
    </Fragment>
  );
};

export default ProjectSearch;
