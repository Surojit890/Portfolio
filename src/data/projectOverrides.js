/**
 * Per-repo overrides for the Projects section.
 *
 * Keyed by exact GitHub repository name. Any field you set here wins over
 * the data coming from the GitHub API. Repos are only shown on the site if
 * they carry the `portfolio` topic on GitHub.
 *
 * Available fields:
 *   title        - Custom display title (defaults to the repo name prettified)
 *   description  - Custom description (defaults to the repo's GitHub "About" text)
 *   technologies - Custom tech badges (defaults to repo topics / primary language)
 *   live         - Custom live demo URL (defaults to the repo's homepage URL)
 *   featured     - true to pin the project to the front of the grid
 */
export const projectOverrides = {
  "Movie-Ranking-App": {
    title: "Movie Ranking App",
    description:
      "A modern React-based movie discovery application with search functionality, trending movies display, and search analytics tracking using TMDB API and Appwrite backend.",
    technologies: ["React", "Vite", "Tailwind CSS", "TMDB API", "Appwrite"],
    featured: true,
  },
  "Book-recommendation-System": {
    title: "Book Recommendation System",
    description:
      "A Python-based book recommendation system that analyzes user preferences and book data to suggest personalized reading options. Utilizes data processing and machine learning techniques.",
    technologies: ["Python", "Pandas", "Open Library API", "Streamlit"],
    live: "https://surojit890-book-recommendation-system-app-tql5vo.streamlit.app/",
    featured: true,
  },
};
