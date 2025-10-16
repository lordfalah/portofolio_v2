import { GitHubRepo } from "@/types/github.type";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const githubToken = process.env.GITHUB_TOKEN;
    const githubUsername = process.env.GITHUB_USERNAME || "lordfalah";

    if (!githubToken) {
      return NextResponse.json(
        { error: "GitHub token not configured" },
        { status: 500 },
      );
    }

    const response = await fetch(
      `https://api.github.com/users/${githubUsername}/repos?sort=updated&per_page=20&type=owner`,
      {
        headers: {
          Authorization: `token ${githubToken}`,
          Accept: "application/vnd.github.v3+json",
          "User-Agent": "Portfolio-App",
        },
        next: {
          revalidate: 3600, // Cache for 1 hour
        },
      },
    );

    if (!response.ok) {
      throw new Error(`GitHub API responded with status ${response.status}`);
    }

    const repos: Array<GitHubRepo & { private: boolean }> =
      await response.json();
    // Only filter out private repos, keep forks
    const publicRepos = repos
      .filter((repo) => !repo.private)
      .sort((a, b) => {
        // Sort by combination of stars and recent updates
        const aScore =
          a.stargazers_count + new Date(a.updated_at).getTime() / 1000000;
        const bScore =
          b.stargazers_count + new Date(b.updated_at).getTime() / 1000000;
        return bScore - aScore;
      });

    return NextResponse.json(publicRepos, {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=7200",
      },
    });
  } catch (error) {
    console.error("Error fetching GitHub repositories:", error);

    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 },
    );
  }
}
