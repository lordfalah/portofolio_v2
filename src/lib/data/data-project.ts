import { GitHubRepo } from "@/types/github.type";
import { TGetProjectSchema } from "../search-params/search-project";
import { getErrorMessage } from "../utils";
import { cache } from "react";

export const fetchProjects = cache(async (input: TGetProjectSchema) => {
  const { page, perPage, tags, title } = input;
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/projects`,
    );
    if (!response.ok) {
      throw new Error("Failed to fetch projects");
    }
    const allProjects = (await response.json()) as GitHubRepo[];

    // --- Langkah 2: Kumpulkan Semua Topik ---
    // Kumpulkan topik dari SEMUA proyek yang diambil (sebelum filtering)
    const allTopics = new Set<string>();
    allProjects.forEach((project) => {
      project.topics.forEach((topic) => allTopics.add(topic));
    });

    // --- Langkah 3: Filtering Berdasarkan Tags ---
    let filteredProjects = allProjects;

    if (tags && tags.length > 0) {
      filteredProjects = allProjects.filter((project) =>
        tags.every((tag) => project.topics.includes(tag)),
      );
    }

    // --- 🔑 Langkah 3b: Filtering Berdasarkan Title (Search) ---
    if (title && title.trim().length > 0) {
      const searchLower = title.trim().toLowerCase();

      filteredProjects = filteredProjects.filter((project) => {
        const nameMatch = project.name.toLowerCase().includes(searchLower);
        return nameMatch;
      });
    }

    // Total proyek yang lolos filtering
    const totalCount = filteredProjects.length;

    // --- Langkah 4: Pagination ---
    const currentPage = page > 0 ? page : 1; // Pastikan page minimal 1
    const pageSize = perPage > 0 ? perPage : 10; // Pastikan perPage minimal 1

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = currentPage * pageSize;

    const paginatedProjects = filteredProjects.slice(startIndex, endIndex);

    // Hitung total halaman
    const totalPages = Math.ceil(totalCount / pageSize);

    // --- Langkah 5: Return Hasil ---
    return {
      status: true,
      message: "Successfully fetched and paginated projects.",
      data: {
        projects: paginatedProjects,
        topics: Array.from(allTopics),
        total: totalPages,
      },
    };
  } catch (err) {
    return {
      status: false,
      message: getErrorMessage(err),
      data: {
        projects: [],
        topics: [],
        total: 0,
      },
    };
  }
});
