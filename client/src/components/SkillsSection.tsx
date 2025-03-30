import React, { useEffect, useRef } from 'react';
import { Progress } from '@/components/ui/progress';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

interface SkillProps {
  name: string;
  percentage: number;
}

const technicalSkills: SkillProps[] = [
  { name: 'Debian', percentage: 85 },
  { name: 'MongoDB', percentage: 80 },
  { name: 'React', percentage: 75 },
  { name: 'Node.js', percentage: 70 },
  { name: 'Express.js', percentage: 75 }
];

const professionalSkills: SkillProps[] = [
  { name: 'Front-End Development', percentage: 90 },
  { name: 'Web Accessibility', percentage: 85 },
  { name: 'Problem-solving & Analytical Thinking', percentage: 80 },
  { name: 'SEO Fundamentals', percentage: 75 },
  { name: 'Web Development', percentage: 85 }
];

const SkillBar: React.FC<SkillProps> = ({ name, percentage }) => {
  const [value, setValue] = React.useState(0);
  const progressRef = useRef<HTMLDivElement>(null);
  const percentRef = useRef<HTMLSpanElement>(null);
  const skillNameRef = useRef<HTMLSpanElement>(null);
  
  useEffect(() => {
    if (progressRef.current && percentRef.current && skillNameRef.current) {
      const el = progressRef.current;
      
      // Create GSAP animation for the skill bar
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top 80%", 
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      });
      
      // Animate skill name with slight bounce
      tl.from(skillNameRef.current, {
        x: -20,
        opacity: 0,
        duration: 0.5,
        ease: "back.out(1.7)"
      });
      
      // Animate percentage counter
      tl.from(percentRef.current, {
        textContent: 0,
        duration: 1.5,
        ease: "power2.out",
        snap: { textContent: 1 },
        onUpdate: () => {
          setValue(parseInt(percentRef.current!.textContent || "0"));
        }
      }, "-=0.3");
      
      // Setup ScrollTrigger cleanup
      return () => {
        tl.scrollTrigger && tl.scrollTrigger.kill();
        tl.kill();
      };
    }
  }, [percentage]);

  return (
    <div className="mb-6" ref={progressRef}>
      <div className="flex justify-between mb-2">
        <span className="font-medium text-gray-700" ref={skillNameRef}>{name}</span>
        <span className="text-sm text-gray-500" ref={percentRef}>{percentage}%</span>
      </div>
      <Progress value={value} className="h-2" />
    </div>
  );
};

const SkillsSection: React.FC = () => {
  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 section-fade-in">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <span className="text-primary font-medium">What I'm good at</span>
          <h2 className="text-3xl md:text-4xl font-bold font-poppins mt-2">My Skills</h2>
          <div className="h-1 w-20 bg-orange-500 mx-auto mt-4"></div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          <div>
            <h3 className="text-xl font-semibold font-poppins mb-6 flex items-center">
              <i className='bx bx-code text-2xl text-primary mr-2'></i>
              Technical Skills
            </h3>
            
            {technicalSkills.map((skill, index) => (
              <SkillBar key={index} name={skill.name} percentage={skill.percentage} />
            ))}
          </div>
          
          <div>
            <h3 className="text-xl font-semibold font-poppins mb-6 flex items-center">
              <i className='bx bx-briefcase text-2xl text-primary mr-2'></i>
              Professional Skills
            </h3>
            
            {professionalSkills.map((skill, index) => (
              <SkillBar key={index} name={skill.name} percentage={skill.percentage} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
