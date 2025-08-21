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
      title: "Weather Dashboard",
      description:
        "A responsive weather dashboard that displays current weather and forecasts for multiple cities with beautiful data visualizations.",
      technologies: ["React", "Chart.js", "OpenWeather API", "CSS3"],
      image: "/api/placeholder/400/250",
      github: "https://github.com/yourusername/project3",
      live: "https://project3.vercel.app",
      featured: false,
    },
    {
      title: "Portfolio Website",
      description:
        "This very portfolio website built with React, Tailwind CSS, and Framer Motion for smooth animations.",
      technologies: ["React", "Tailwind CSS", "Framer Motion", "Vite"],
      image: "/api/placeholder/400/250",
      github: "https://github.com/yourusername/portfolio",
      live: "https://yourportfolio.vercel.app",
      featured: false,
    },
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
              Here are some of the projects I've worked on that showcase my
              skills and experience
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {projects.map((project, index) => (
              <motion.div key={project.title} variants={itemVariants}>
                <Card
                  className={`h-full ${project.featured ? "border-primary shadow-lg" : ""}`}
                >
                  <div className="relative">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    {project.featured && (
                      <Badge className="absolute top-2 right-2">Featured</Badge>
                    )}
                  </div>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      {project.title}
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon" asChild>
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <FaGithub className="h-4 w-4" />
                          </a>
                        </Button>
                        <Button variant="ghost" size="icon" asChild>
                          <a
                            href={project.live}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <FaExternalLinkAlt className="h-4 w-4" />
                          </a>
                        </Button>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <Badge
                          key={tech}
                          variant="secondary"
                          className="text-xs"
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
            <Button variant="outline" size="lg">
              <FaGithub className="mr-2 h-4 w-4" />
              View All Projects on GitHub
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
