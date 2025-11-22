import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { useInView } from "react-intersection-observer";

const Projects = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const projects = [
    {
      title: "Movie Ranking App",
      description:
        "A modern React-based movie discovery application with search functionality, trending movies display, and search analytics tracking using TMDB API and Appwrite backend.",
      technologies: ["React", "Vite", "Tailwind CSS", "TMDB API", "Appwrite"],
      image: "/Movie-Ranking-App.png",
      github: "https://github.com/Surojit890/Movie-Ranking-App",
      live: "https://movie-ranking-1m11r0osf-surojit890s-projects.vercel.app",
      featured: true,
    },
    {
      title: "Book Recommendation System",
      description:
        "A Python-based book recommendation system that analyzes user preferences and book data to suggest personalized reading options. Utilizes data processing and machine learning techniques.",
      technologies: ["Python", "Pandas", "Open Library API", "Streamlit"],
      image: "/Book-Recommendation-System.png",
      github: "https://github.com/Surojit890/Book-recommendation-System",
      live: "https://surojit890-book-recommendation-system-app-tql5vo.streamlit.app/",
      featured: true,
    }
  ];

  return (
    <section id="projects" className="py-24 bg-secondary/30">
      <div className="container px-4 md:px-6">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="space-y-12"
        >
          <motion.div variants={itemVariants} className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">
              Featured Projects
            </h2>
            <p className="text-lg text-muted-foreground max-w-[700px] mx-auto">
              A collection of projects that showcase my passion for building digital experiences.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {projects.map((project) => (
              <motion.div key={project.title} variants={itemVariants}>
                <Card className="h-full flex flex-col overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-xl hover:border-primary/50 transition-all duration-300 group">
                  <div className="relative overflow-hidden aspect-video">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                      <Button size="icon" variant="secondary" asChild className="rounded-full hover:scale-110 transition-transform">
                        <a href={project.github} target="_blank" rel="noopener noreferrer">
                          <FaGithub className="h-5 w-5" />
                        </a>
                      </Button>
                      <Button size="icon" variant="secondary" asChild className="rounded-full hover:scale-110 transition-transform">
                        <a href={project.live} target="_blank" rel="noopener noreferrer">
                          <FaExternalLinkAlt className="h-4 w-4" />
                        </a>
                      </Button>
                    </div>
                  </div>
                  
                  <CardHeader>
                    <CardTitle className="text-xl font-bold">{project.title}</CardTitle>
                  </CardHeader>
                  
                  <CardContent className="flex-1">
                    <p className="text-muted-foreground mb-6 line-clamp-3">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <Badge
                          key={tech}
                          variant="secondary"
                          className="bg-secondary/50 hover:bg-secondary transition-colors"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        
          <motion.div variants={itemVariants} className="text-center pt-8">
            <Button variant="outline" size="lg" className="rounded-full px-8" asChild>
              <a
                href="https://github.com/Surojit890"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <FaGithub className="h-4 w-4" />
                View More on GitHub
              </a>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
