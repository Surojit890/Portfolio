import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FaGithub, FaExternalLinkAlt, FaStar } from "react-icons/fa";
import { useInView } from "react-intersection-observer";
import { useGitHubProjects } from "@/hooks/useGitHubProjects";

const GRADIENTS = [
  "from-violet-500 via-purple-500 to-fuchsia-500",
  "from-blue-500 via-cyan-500 to-teal-400",
  "from-orange-500 via-amber-500 to-yellow-400",
  "from-emerald-500 via-green-500 to-lime-400",
  "from-rose-500 via-pink-500 to-red-400",
  "from-indigo-500 via-blue-500 to-sky-400",
];

const hashString = (str) => {
  let hash = 0;
  for (let i = 0; i < str.length; i += 1) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
};

const gradientFor = (name) => GRADIENTS[hashString(name) % GRADIENTS.length];

const Projects = () => {
  const { projects, loading, error, username } = useGitHubProjects();
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

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {["skeleton-a", "skeleton-b"].map((key) => (
                <Card
                  key={key}
                  className="h-full flex flex-col overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm"
                >
                  <div className="relative aspect-video animate-pulse bg-gradient-to-br from-muted via-muted/60 to-muted/30" />
                  <CardHeader>
                    <div className="h-6 w-2/3 rounded bg-muted animate-pulse" />
                  </CardHeader>
                  <CardContent className="flex-1 space-y-3">
                    <div className="h-4 w-full rounded bg-muted animate-pulse" />
                    <div className="h-4 w-5/6 rounded bg-muted animate-pulse" />
                    <div className="flex gap-2 pt-3">
                      <div className="h-5 w-16 rounded-full bg-muted animate-pulse" />
                      <div className="h-5 w-16 rounded-full bg-muted animate-pulse" />
                      <div className="h-5 w-16 rounded-full bg-muted animate-pulse" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : error ? (
            <motion.div variants={itemVariants} className="text-center space-y-4 max-w-xl mx-auto">
              <p className="text-muted-foreground">
                Couldn&apos;t load projects from GitHub right now ({error}). You can always browse them directly on my profile.
              </p>
              <Button variant="outline" size="lg" className="rounded-full px-8" asChild>
                <a
                  href={`https://github.com/${username}?tab=repositories`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <FaGithub className="h-4 w-4" />
                  Browse Repositories
                </a>
              </Button>
            </motion.div>
          ) : projects.length === 0 ? (
            <motion.div variants={itemVariants} className="text-center space-y-4 max-w-xl mx-auto">
              <p className="text-muted-foreground">
                No projects to show yet — I&apos;m curating them on GitHub. Check back soon!
              </p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {projects.map((project) => (
                <motion.div key={project.name} variants={itemVariants}>
                  <Card className="h-full flex flex-col overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-xl hover:border-primary/50 transition-all duration-300 group">
                    <div
                      className={`relative overflow-hidden aspect-video bg-gradient-to-br ${gradientFor(project.name)} flex flex-col items-center justify-center gap-2 p-6 text-center`}
                    >
                      <h3 className="text-2xl md:text-3xl font-bold text-white drop-shadow-md capitalize">
                        {project.title}
                      </h3>
                      <div className="flex items-center gap-3 text-white/90 text-sm font-medium">
                        {project.language && (
                          <span className="flex items-center gap-1.5">
                            <span className="h-2.5 w-2.5 rounded-full bg-white/90" />
                            {project.language}
                          </span>
                        )}
                        <span className="flex items-center gap-1.5">
                          <FaStar className="h-3.5 w-3.5" />
                          {project.stars}
                        </span>
                      </div>
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                        <Button size="icon" variant="secondary" asChild className="rounded-full hover:scale-110 transition-transform">
                          <a href={project.github} target="_blank" rel="noopener noreferrer" aria-label={`${project.title} on GitHub`}>
                            <FaGithub className="h-5 w-5" />
                          </a>
                        </Button>
                        {project.live && (
                          <Button size="icon" variant="secondary" asChild className="rounded-full hover:scale-110 transition-transform">
                            <a href={project.live} target="_blank" rel="noopener noreferrer" aria-label={`${project.title} live demo`}>
                              <FaExternalLinkAlt className="h-4 w-4" />
                            </a>
                          </Button>
                        )}
                      </div>
                    </div>

                    <CardHeader>
                      <CardTitle className="text-xl font-bold capitalize">{project.title}</CardTitle>
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
          )}

          <motion.div variants={itemVariants} className="text-center pt-8">
            <Button variant="outline" size="lg" className="rounded-full px-8" asChild>
              <a
                href={`https://github.com/${username}`}
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
