import React, { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';
import { ExternalLink, Github, ArrowUpRight } from 'lucide-react';
import anime from 'animejs';

interface ProjectProps {
  title: string;
  description: string;
  icon: string;
  iconBgClass: string;
  tags: string[];
  tagBgClass: string;
  index?: number;
}

const ProjectsSection: React.FC = () => {
  const { colors } = useTheme();
  const sectionRef = useRef<HTMLElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 });
  
  // Sample projects data
  const projects = [
    {
      title: 'E-commerce Platform',
      description: 'A full-stack e-commerce platform with product management, cart functionality, and secure payment integration.',
      icon: '🛒',
      iconBgClass: 'bg-blue-500/10 text-blue-500',
      tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      tagBgClass: 'bg-blue-500/10 text-blue-500',
    },
    {
      title: 'Task Management App',
      description: 'A collaborative task management application with real-time updates, team workspaces, and deadline tracking.',
      icon: '✓',
      iconBgClass: 'bg-green-500/10 text-green-500',
      tags: ['React', 'Firebase', 'Tailwind CSS', 'Redux'],
      tagBgClass: 'bg-green-500/10 text-green-500',
    },
    {
      title: 'Social Media Dashboard',
      description: 'A comprehensive dashboard for monitoring and analyzing social media performance across multiple platforms.',
      icon: '📊',
      iconBgClass: 'bg-purple-500/10 text-purple-500',
      tags: ['React', 'D3.js', 'Express', 'OAuth'],
      tagBgClass: 'bg-purple-500/10 text-purple-500',
    },
    {
      title: 'Weather Forecast App',
      description: 'A weather forecasting application providing accurate predictions, interactive maps, and location-based alerts.',
      icon: '🌤️',
      iconBgClass: 'bg-yellow-500/10 text-yellow-500',
      tags: ['React Native', 'TypeScript', 'OpenWeather API'],
      tagBgClass: 'bg-yellow-500/10 text-yellow-500',
    },
    {
      title: 'Portfolio Generator',
      description: 'A developer tool that creates customizable portfolio websites from GitHub profiles and project repositories.',
      icon: '💼',
      iconBgClass: 'bg-pink-500/10 text-pink-500',
      tags: ['Next.js', 'GitHub API', 'Tailwind CSS'],
      tagBgClass: 'bg-pink-500/10 text-pink-500',
    },
    {
      title: 'Fitness Tracking App',
      description: 'A mobile application for tracking workouts, nutrition, and progress with personalized training recommendations.',
      icon: '💪',
      iconBgClass: 'bg-red-500/10 text-red-500',
      tags: ['React Native', 'Firebase', 'HealthKit API'],
      tagBgClass: 'bg-red-500/10 text-red-500',
    },
  ];
  
  // Anime.js animation for project cards
  useEffect(() => {
    if (isInView && projectsRef.current) {
      anime({
        targets: '.project-card',
        opacity: [0, 1],
        translateY: [50, 0],
        delay: anime.stagger(150),
        easing: 'easeOutQuad',
        duration: 800
      });
    }
  }, [isInView]);
  
  // Animation variants for text elements
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
  };
  
  // Project card component
  const ProjectCard: React.FC<ProjectProps> = ({ title, description, icon, iconBgClass, tags, tagBgClass, index = 0 }) => (
    <div 
      className="project-card opacity-0 bg-background/80 backdrop-blur-md border border-border rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group flex flex-col h-full"
    >
      {/* Project Icon */}
      <div className={`w-12 h-12 rounded-lg ${iconBgClass} flex items-center justify-center text-xl mb-4`}>
        {icon}
      </div>
      
      {/* Project Title */}
      <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors duration-300">
        {title}
      </h3>
      
      {/* Project Description */}
      <p className="text-muted-foreground mb-4 flex-grow">
        {description}
      </p>
      
      {/* Project Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {tags.map((tag) => (
          <span 
            key={tag} 
            className={`text-xs font-medium px-2 py-1 rounded-full ${tagBgClass}`}
          >
            {tag}
          </span>
        ))}
      </div>
      
      {/* Project Links */}
      <div className="flex justify-between mt-auto pt-4 border-t border-border">
        <a 
          href="#" 
          className="text-sm font-medium text-primary hover:underline flex items-center gap-1 group"
          data-cursor-text="View Project"
        >
          View Project <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
        </a>
        <a 
          href="#" 
          className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
          data-cursor-text="GitHub"
        >
          <Github size={16} />
        </a>
      </div>
    </div>
  );
  
  return (
    <section 
      id="projects" 
      ref={sectionRef}
      className="py-20 md:py-32 px-6 relative"
    >
      <div className="container mx-auto max-w-6xl">
        {/* Section header */}
        <motion.div 
          className="text-center mb-16"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.2
              }
            }
          }}
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-4"
            variants={textVariants}
          >
            Featured Projects
          </motion.h2>
          <motion.div 
            className="h-1 w-20 bg-primary mx-auto rounded-full"
            variants={{
              hidden: { width: 0 },
              visible: { 
                width: 80,
                transition: { duration: 0.6, delay: 0.3 }
              }
            }}
          />
          <motion.p 
            className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto"
            variants={textVariants}
          >
            A selection of my recent work, showcasing my expertise in building modern web and mobile applications.
          </motion.p>
        </motion.div>
        
        {/* Projects grid */}
        <div ref={projectsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <ProjectCard 
              key={project.title}
              title={project.title}
              description={project.description}
              icon={project.icon}
              iconBgClass={project.iconBgClass}
              tags={project.tags}
              tagBgClass={project.tagBgClass}
              index={index}
            />
          ))}
        </div>
        
        {/* View more projects button */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <a 
            href="#" 
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg font-medium transition-colors duration-300"
            data-cursor-text="View All"
          >
            View All Projects <ExternalLink size={16} />
          </a>
        </motion.div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10" />
    </section>
  );
};

export default ProjectsSection;