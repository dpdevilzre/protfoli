import React, { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';
import gsap from 'gsap';

interface SkillProps {
  name: string;
  percentage: number;
}

const SkillsSection: React.FC = () => {
  const { colors } = useTheme();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });
  
  // Frontend skills
  const frontendSkills: SkillProps[] = [
    { name: 'HTML/CSS', percentage: 95 },
    { name: 'JavaScript/TypeScript', percentage: 90 },
    { name: 'React.js', percentage: 92 },
    { name: 'Next.js', percentage: 85 },
    { name: 'Tailwind CSS', percentage: 88 },
  ];
  
  // Backend skills
  const backendSkills: SkillProps[] = [
    { name: 'Node.js', percentage: 85 },
    { name: 'Express.js', percentage: 88 },
    { name: 'MongoDB', percentage: 80 },
    { name: 'PostgreSQL', percentage: 75 },
    { name: 'REST API', percentage: 90 },
  ];
  
  // Other skills
  const otherSkills: SkillProps[] = [
    { name: 'UI/UX Design', percentage: 78 },
    { name: 'Git/GitHub', percentage: 85 },
    { name: 'Docker', percentage: 70 },
    { name: 'AWS', percentage: 65 },
    { name: 'CI/CD', percentage: 72 },
  ];
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 300, damping: 24 }
    }
  };
  
  // GSAP animation for skill bars
  useEffect(() => {
    if (isInView) {
      const skillBars = document.querySelectorAll('.skill-progress-bar');
      
      gsap.fromTo(
        skillBars,
        { width: 0 },
        {
          width: (index, element) => element.getAttribute('data-percentage') + '%',
          duration: 1.5,
          ease: 'power2.out',
          stagger: 0.1,
          delay: 0.2
        }
      );
    }
  }, [isInView]);
  
  // Skill bar component
  const SkillBar: React.FC<SkillProps> = ({ name, percentage }) => (
    <div className="mb-6">
      <div className="flex justify-between mb-2">
        <span className="font-medium">{name}</span>
        <span className="text-sm text-muted-foreground">{percentage}%</span>
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <div 
          className="skill-progress-bar h-full rounded-full" 
          style={{ backgroundColor: colors.primary, width: 0 }}
          data-percentage={percentage}
        />
      </div>
    </div>
  );
  
  return (
    <section 
      id="skills" 
      ref={sectionRef}
      className="py-20 md:py-32 px-6 bg-muted/30"
    >
      <div className="container mx-auto max-w-6xl">
        {/* Section header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Technical Skills</h2>
          <div className="h-1 w-20 bg-primary mx-auto rounded-full" />
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
            I specialize in modern web technologies, with a focus on creating responsive, performant, and accessible applications.
          </p>
        </motion.div>
        
        {/* Skills grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-10"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Frontend skills */}
          <motion.div 
            className="bg-background/80 backdrop-blur-sm shadow-lg rounded-xl p-6 border border-border"
            variants={itemVariants}
          >
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 rounded-full flex items-center justify-center mr-3" style={{ backgroundColor: `${colors.primary}20` }}>
                <span className="text-primary text-xl font-bold">F</span>
              </div>
              <h3 className="text-2xl font-bold">Frontend</h3>
            </div>
            {frontendSkills.map((skill) => (
              <SkillBar key={skill.name} name={skill.name} percentage={skill.percentage} />
            ))}
          </motion.div>
          
          {/* Backend skills */}
          <motion.div 
            className="bg-background/80 backdrop-blur-sm shadow-lg rounded-xl p-6 border border-border"
            variants={itemVariants}
          >
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 rounded-full flex items-center justify-center mr-3" style={{ backgroundColor: `${colors.primary}20` }}>
                <span className="text-primary text-xl font-bold">B</span>
              </div>
              <h3 className="text-2xl font-bold">Backend</h3>
            </div>
            {backendSkills.map((skill) => (
              <SkillBar key={skill.name} name={skill.name} percentage={skill.percentage} />
            ))}
          </motion.div>
          
          {/* Other skills */}
          <motion.div 
            className="bg-background/80 backdrop-blur-sm shadow-lg rounded-xl p-6 border border-border"
            variants={itemVariants}
          >
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 rounded-full flex items-center justify-center mr-3" style={{ backgroundColor: `${colors.primary}20` }}>
                <span className="text-primary text-xl font-bold">O</span>
              </div>
              <h3 className="text-2xl font-bold">Other</h3>
            </div>
            {otherSkills.map((skill) => (
              <SkillBar key={skill.name} name={skill.name} percentage={skill.percentage} />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;