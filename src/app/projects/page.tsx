import { ProjectsGrid } from "@/app/projects/_components/projects-grid";
import { ProjectsHeader } from "@/app/projects/_components/projects-header";
import { buildMetadata, siteConfig } from "@/config/site.config";
import { Suspense } from "react";
import { ProjectsSkeleton } from "./_components/loading";
import { SearchParams } from "nuqs/server";
import { searchParamsCacheProject } from "@/lib/search-params/search-project";
import { Metadata } from "next";
import { fetchProjects } from "@/lib/data/data-project";

type PageProps = {
  searchParams: Promise<SearchParams>;
};

export async function generateMetadata({
  searchParams,
}: PageProps): Promise<Metadata> {
  const search = searchParamsCacheProject.parse(await searchParams);

  // --- Construct Dynamic Title and Description ---
  let dynamicTitle = `Projects | ${siteConfig.siteName}`;
  let dynamicDescription =
    "Explore my latest projects, open source contributions, and technical experiments.";

  // Data is available. Retrieve necessary values.

  const currentPage = search.page;
  const currentTags = search.tags;

  if (currentTags.length > 0) {
    // e.g., "React, Next.js Projects"
    const tagList = currentTags.join(", ");
    dynamicTitle = `${tagList} Projects`;
    dynamicDescription = `A collection of projects filtered by topic(s): ${tagList}.`;
  } else if (search.title) {
    // e.g., "Search: 'Blog' Projects"
    dynamicTitle = `Search Results for "${search.title}" Projects`;
    dynamicDescription = `Search results for projects containing the keyword: ${search.title}.`;
  }

  // Append Page Number (if not on page 1)
  if (currentPage > 1) {
    dynamicTitle += ` | Page ${currentPage}`;
  }

  // --- Construct Dynamic SEO Tags (Canonical, Robots, Next/Prev) ---
  const isFilteredOrPaginated =
    currentTags.length > 0 || search.title || currentPage > 1;
  const baseUrl = new URL(
    "/projects",
    process.env.NEXT_PUBLIC_SITE_URL,
  ).toString();

  return buildMetadata({
    title: dynamicTitle,
    description: dynamicDescription,
    keywords: currentTags,
    alternates: {
      canonical: isFilteredOrPaginated ? baseUrl : undefined,
    },
  });
}

export default async function ProjectsPage({ searchParams }: PageProps) {
  const search = searchParamsCacheProject.parse(await searchParams);
  const projects = fetchProjects(search);

  return (
    <div className="min-h-screen py-16">
      <div className="mx-auto mt-16 max-w-7xl px-6 md:mt-24">
        <ProjectsHeader />

        <Suspense fallback={<ProjectsSkeleton />}>
          <ProjectsGrid data={projects} />
        </Suspense>
      </div>
    </div>
  );
}
