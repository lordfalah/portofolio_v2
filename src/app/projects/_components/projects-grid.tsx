"use client";

import { Fragment, use, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle, SearchIcon } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

import CardProject from "@/app/projects/_components/card-project";
import EmptyProject from "./empty-project";
import { useProjectSearchParams } from "@/hooks/use-project-search-params";
import ProjectSearch from "./project-search";
import { fetchProjects } from "@/lib/data/data-project";

export function ProjectsGrid({
  data,
}: {
  data: ReturnType<typeof fetchProjects>;
}) {
  const dataPromise = use(data);
  const [params, setParams] = useProjectSearchParams();

  const currentPage = params.page;
  const totalPage = dataPromise.data.total;
  const currentTags = params.tags;

  // --- Fungsi Handler ---
  const handlePageChange = useCallback(
    (newPage: number) => {
      setParams({ page: newPage });
    },
    [setParams],
  );

  const handleTagClick = useCallback(
    (topic: string) => {
      // Toggle tag: jika sudah dipilih, hapus; jika belum, tambahkan
      const newTags = currentTags.includes(topic)
        ? currentTags.filter((t) => t !== topic)
        : [...currentTags, topic];

      // Set tags baru dan kembali ke halaman 1
      setParams({ tags: newTags, page: 1 });
    },
    [currentTags, setParams],
  );

  if (!dataPromise.status) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="space-y-4 text-center">
          <AlertCircle className="text-destructive mx-auto h-12 w-12" />
          <h3 className="text-lg font-semibold">Unable to load projects</h3>
          <p className="text-muted-foreground">{dataPromise.message}</p>
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
    <Fragment>
      <InputGroup className="relative mx-auto mb-6 max-w-md">
        <InputGroupInput
          type="search"
          placeholder="Search projects..."
          value={params.title}
          onChange={(e) => setParams({ title: e.target.value })}
        />
        <InputGroupAddon>
          <SearchIcon />
        </InputGroupAddon>
      </InputGroup>

      {dataPromise.status && dataPromise.data.projects.length <= 0 ? (
        <EmptyProject />
      ) : (
        <Fragment>
          {/* Projects Search Bar & Tag Filter (mobile) */}
          <ProjectSearch
            topics={dataPromise.data.topics}
            onHandleTag={handleTagClick}
          />
          {/* Projects Grid */}
          <CardProject projects={dataPromise.data.projects} />
          {/* Pagination Controls */}
          {totalPage > 1 && (
            <Pagination className="mt-8">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href={"/projects"}
                    onNavigate={() => {
                      if (currentPage > 1) {
                        handlePageChange(currentPage - 1);
                      }
                    }}
                    className={
                      currentPage === 1 ? "pointer-events-none opacity-50" : ""
                    }
                  />
                </PaginationItem>
                {Array.from({ length: totalPage }).map((_, i) => (
                  <PaginationItem key={i}>
                    <PaginationLink
                      href={"/projects"}
                      isActive={currentPage === i + 1}
                      onNavigate={() => {
                        handlePageChange(i + 1);
                      }}
                    >
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext
                    href="/projects"
                    onNavigate={() => {
                      if (currentPage < totalPage) {
                        handlePageChange(currentPage + 1);
                      }
                    }}
                    className={
                      currentPage === totalPage
                        ? "pointer-events-none opacity-50"
                        : ""
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </Fragment>
      )}
    </Fragment>
  );
}
