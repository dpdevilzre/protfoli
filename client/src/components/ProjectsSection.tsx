import React, { useEffect, useRef } from 'react';
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

const projects: ProjectProps[] = [
  {
    title: "AI Image Compression Website",
    description: "A web application that uses AI algorithms to compress images while maintaining quality.",
    icon: "bx-image",
    iconBgClass: "bg-primary/10 text-primary/50",
    tags: ["React", "TensorFlow.js", "Node.js"],
    tagBgClass: "bg-primary/10 text-primary"
  },
  {
    title: "Custom Android-based OS",
    description: "A customized Android-based operating system with enhanced security features and performance optimizations.",
    icon: "bx-devices",
    iconBgClass: "bg-blue-500/10 text-blue-500/50",
    tags: ["Android", "Java", "Linux"],
    tagBgClass: "bg-blue-500/10 text-blue-500"
  },
  {
    title: "Cloud Infrastructure Automation",
    description: "A tool for automating the deployment and management of cloud infrastructure resources.",
    icon: "bx-cloud",
    iconBgClass: "bg-orange-500/10 text-orange-500/50",
    tags: ["AWS", "Terraform", "Python"],
    tagBgClass: "bg-orange-500/10 text-orange-500"
  }
];

const ProjectCard: React.FC<ProjectProps> = ({ title, description, icon, iconBgClass, tags, tagBgClass, index = 0 }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLElement>(null);
  const tagsRef = useRef<HTMLDivElement>(null);

  // Mouse hover effect using anime.js
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    // Initialize card animation
    card.addEventListener('mouseenter', () => {
      anime({
        targets: card,
        translateY: -15,
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        duration: 500,
        easing: 'easeOutElastic(1, .6)'
      });

      // Animate icon
      if (iconRef.current) {
        anime({
          targets: iconRef.current,
          scale: 1.2,
          rotate: '10deg',
          duration: 500,
          easing: 'easeOutElastic(1, .8)'
        });
      }
    });

    card.addEventListener('mouseleave', () => {
      anime({
        targets: card,
        translateY: 0,
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        duration: 500,
        easing: 'easeOutElastic(1, .6)'
      });

      // Reset icon
      if (iconRef.current) {
        anime({
          targets: iconRef.current,
          scale: 1,
          rotate: '0deg',
          duration: 500,
          easing: 'easeOutElastic(1, .8)'
        });
      }
    });

    // Initial entrance animation with delay based on index
    anime({
      targets: card,
      opacity: [0, 1],
      translateY: [50, 0],
      delay: index * 100,
      duration: 800,
      easing: 'easeOutCubic'
    });

    // Tag animations
    if (tagsRef.current) {
      const tagElements = tagsRef.current.querySelectorAll('span');
      anime({
        targets: tagElements,
        opacity: [0, 1],
        translateX: [20, 0],
        delay: anime.stagger(100, { start: 300 + index * 100 }),
        duration: 600,
        easing: 'easeOutCubic'
      });
    }
  }, [index]);

  return (
    <div 
      ref={cardRef}
      className="group bg-white rounded-lg shadow-md overflow-hidden"
      style={{ opacity: 0 }} // Initial state for animation
    >
      <div className="relative h-48 overflow-hidden">
        <div className={`absolute inset-0 ${iconBgClass} flex items-center justify-center`}>
          <i ref={iconRef} className={`bx ${icon} text-6xl`}></i>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center p-4">
          <div className="flex space-x-3">
            <a href="#" className="bg-white h-10 w-10 rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors">
              <i className='bx bx-link-external'></i>
            </a>
            <a href="#" className="bg-white h-10 w-10 rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors">
              <i className='bx bxl-github'></i>
            </a>
          </div>
        </div>
      </div>
      <div className="p-6">
        <h3 className="font-semibold text-xl mb-2">{title}</h3>
        <p className="text-gray-600 text-sm mb-4">
          {description}
        </p>
        <div ref={tagsRef} className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <span key={index} className={`text-xs ${tagBgClass} px-2 py-1 rounded-full`} style={{ opacity: 0 }}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

const ProjectsSection: React.FC = () => {
  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 bg-white section-fade-in">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <span className="text-primary font-medium">Showcasing my work</span>
          <h2 className="text-3xl md:text-4xl font-bold font-poppins mt-2">Recent Projects</h2>
          <div className="h-1 w-20 bg-orange-500 mx-auto mt-4"></div>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={index} {...project} index={index} />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <a href="#" className="inline-block px-8 py-3 bg-white text-primary border border-primary font-medium rounded-md hover:bg-primary/5 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50">
            View All Projects
          </a>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
