import { useState, useEffect } from "react";
import { projectOverrides } from "@/data/projectOverrides";

const GITHUB_USERNAME = "Surojit890";
const PORTFOLIO_TOPIC = "portfolio";
const API_URL = `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`;
const CACHE_KEY = "github-projects-cache";
const CACHE_TTL = 60 * 60 * 1000; // 1 hour

const readCache = () => {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const { timestamp, data } = JSON.parse(raw);
    if (Date.now() - timestamp > CACHE_TTL) return null;
    return data;
  } catch {
    return null;
  }
};

const writeCache = (data) => {
  try {
    localStorage.setItem(
      CACHE_KEY,
      JSON.stringify({ timestamp: Date.now(), data })
    );
  } catch {
    // Storage unavailable (private mode, quota, etc.) — ignore
  }
};

const toProject = (repo) => {
  const override = projectOverrides[repo.name] || {};
  return {
    name: repo.name,
    title: override.title || repo.name.replace(/[-_]/g, " "),
    description:
      override.description ||
      repo.description ||
      "No description provided yet — check out the repository for more details.",
    technologies:
      override.technologies ||
      (repo.topics && repo.topics.length > 0
        ? repo.topics.filter((topic) => topic !== PORTFOLIO_TOPIC)
        : repo.language
          ? [repo.language]
          : []),
    github: repo.html_url,
    live: override.live || repo.homepage || null,
    featured: Boolean(override.featured),
    language: repo.language,
    stars: repo.stargazers_count,
    updatedAt: repo.updated_at,
  };
};

const sortProjects = (projects) =>
  [...projects].sort((a, b) => {
    if (a.featured !== b.featured) return a.featured ? -1 : 1;
    return new Date(b.updatedAt) - new Date(a.updatedAt);
  });

export const useGitHubProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    const fetchProjects = async () => {
      const cached = readCache();
      if (cached) {
        if (!cancelled) {
          setProjects(cached);
          setLoading(false);
        }
        return;
      }

      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error(`GitHub API responded with ${response.status}`);
        }
        const repos = await response.json();
        const filtered = repos.filter(
          (repo) => repo.topics && repo.topics.includes(PORTFOLIO_TOPIC)
        );
        const mapped = sortProjects(filtered.map(toProject));
        writeCache(mapped);
        if (!cancelled) {
          setProjects(mapped);
          setError(null);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchProjects();

    return () => {
      cancelled = true;
    };
  }, []);

  return { projects, loading, error, username: GITHUB_USERNAME };
};
