import React from 'react';

const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-white section-fade-in">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <span className="text-primary font-medium">A bit about me</span>
          <h2 className="text-3xl md:text-4xl font-bold font-poppins mt-2">About Me</h2>
          <div className="h-1 w-20 bg-orange-500 mx-auto mt-4"></div>
        </div>
        
        <div className="lg:flex items-center justify-between">
          <div className="lg:w-1/2 mb-10 lg:mb-0">
            <div className="relative max-w-lg mx-auto lg:mx-0">
              <div className="bg-gray-100 rounded-lg p-6 relative z-10">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white rounded-lg p-4 shadow-sm flex items-center justify-center flex-col">
                    <i className='bx bx-code-block text-4xl text-primary mb-2'></i>
                    <p className="font-medium">Full-Stack Developer</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow-sm flex items-center justify-center flex-col">
                    <i className='bx bxs-cloud text-4xl text-primary mb-2'></i>
                    <p className="font-medium">Cloud Computing</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow-sm flex items-center justify-center flex-col">
                    <i className='bx bx-data text-4xl text-primary mb-2'></i>
                    <p className="font-medium">NoSQL Databases</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow-sm flex items-center justify-center flex-col">
                    <i className='bx bx-cog text-4xl text-primary mb-2'></i>
                    <p className="font-medium">Workflow Automation</p>
                  </div>
                </div>
              </div>
              <div className="absolute -z-10 -bottom-4 -right-4 h-full w-full bg-primary/20 rounded-lg"></div>
            </div>
          </div>
          
          <div className="lg:w-1/2 lg:pl-12">
            <h3 className="text-2xl font-semibold font-poppins mb-6">Who Am I?</h3>
            <p className="text-gray-700 mb-4 leading-relaxed">
              I am Devesh Prakash, a dedicated full-stack web developer and BCA student with expertise in cloud computing, NoSQL databases, and workflow automation. My technical skills include configuring cloud infrastructures, managing databases like MongoDB, and implementing CRUD operations.
            </p>
            <p className="text-gray-700 mb-6 leading-relaxed">
              I have hands-on experience with Linux, Windows OS, PowerShell scripting, and containerization technologies like Docker and Kubernetes. I am passionate about developing scalable cloud solutions and optimizing IT infrastructures for security and performance.
            </p>
            
            <div className="mb-8">
              <h4 className="font-medium mb-3 text-lg">Education</h4>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <h5 className="font-medium">Bachelors of Computer Application</h5>
                    <p className="text-gray-600">Babu Banarsi das University</p>
                  </div>
                  <span className="text-sm text-gray-500 whitespace-nowrap">2022 - 2025</span>
                </div>
              </div>
            </div>
            
            <div className="mb-8">
              <h4 className="font-medium mb-3 text-lg">Experience</h4>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <h5 className="font-medium">Web Designer</h5>
                    <p className="text-gray-600">Wipro Company</p>
                  </div>
                  <span className="text-sm text-gray-500 whitespace-nowrap">2020 - 2021</span>
                </div>
              </div>
            </div>
            
            <a href="#contact" className="inline-block px-8 py-3 bg-primary text-white font-medium rounded-md shadow hover:bg-primary-dark transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50">
              Get In Touch
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
