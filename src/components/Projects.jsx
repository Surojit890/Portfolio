import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
      title: "Movie-Ranking-App",
      description:
        "A modern React-based movie discovery application with search functionality, trending movies display, and search analytics tracking using TMDB API and Appwrite backend.",
      technologies: ["React", "Vite", "Tailwind CSS", "TMDB API", "Appwrite"],
      image: "/Movie-Ranking-App.png",
      github: "https://github.com/Surojit890/Movie-Ranking-App",
      live: "https://movie-ranking-1m11r0osf-surojit890s-projects.vercel.app",
      featured: true,
    },
    {
      title: "Book-Recommendation-System",
      description:
        "A Python-based book recommendation system that analyzes user preferences and book data to suggest personalized reading options. Utilizes data processing and machine learning techniques for accurate recommendations, with a simple interface for user interaction.",
      technologies: ["Python", "Pandas", "Open Library API ","Streamlit"],
      image: "/Book-Recommendation-System.png",
      github: "https://github.com/Surojit890/Book-recommendation-System",
      live: "https://surojit890-book-recommendation-system-app-tql5vo.streamlit.app/",
      featured: true,
    }
  ];

  return (
    <section id="projects" className="py-20 bg-secondary/10">
      <div className="w-full px-4 lg:px-6 xl:px-8">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="w-full mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Featured Projects
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Here are some of the projects I've worked on that showcase my skills and experience
            </p>
          </motion.div>

          <div className="flex flex-col lg:flex-row gap-8 max-w-5xl mx-auto">
            {projects.map((project, index) => (
              <motion.div key={project.title} variants={itemVariants} className="flex-1 max-w-lg mx-auto lg:mx-0">
                <Card className="h-full border-primary shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 bg-gradient-to-br from-card via-card to-primary/5">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-56 object-cover transition-transform duration-300 hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    <Badge className="absolute top-3 right-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0">
                      Featured
                    </Badge>
                  </div>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-xl mb-2 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">{project.title}</CardTitle>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" asChild className="flex-1 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-600 hover:text-white hover:border-transparent transition-all duration-300">
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2"
                        >
                          <FaGithub className="h-4 w-4" />
                          Code
                        </a>
                      </Button>
                      <Button size="sm" asChild className="flex-1 bg-gradient-to-r from-primary to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all duration-300">
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2"
                        >
                          <FaExternalLinkAlt className="h-4 w-4" />
                          Live Demo
                        </a>
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <Badge
                          key={tech}
                          variant="secondary"
                          className="text-xs px-2 py-1"
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
        
          <motion.div variants={itemVariants} className="text-center mt-12">
            <Button variant="outline" size="lg" asChild>
              <a
                href="https://github.com/Surojit890"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <FaGithub className="h-4 w-4" />
                View All Projects on GitHub
              </a>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
