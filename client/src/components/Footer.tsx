import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-8 md:mb-0">
            <a href="#" className="text-2xl font-bold font-poppins">
              Devesh<span className="text-orange-500">.</span>
            </a>
            <p className="mt-2 text-gray-400 max-w-md">
              Creating modern, responsive web experiences with a focus on performance and user experience.
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row md:space-x-12 space-y-8 md:space-y-0">
            <div>
              <h4 className="font-semibold mb-4 text-lg">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#home" className="text-gray-400 hover:text-white transition-colors">Home</a></li>
                <li><a href="#about" className="text-gray-400 hover:text-white transition-colors">About</a></li>
                <li><a href="#skills" className="text-gray-400 hover:text-white transition-colors">Skills</a></li>
                <li><a href="#projects" className="text-gray-400 hover:text-white transition-colors">Projects</a></li>
                <li><a href="#contact" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-lg">Connect</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <i className='bx bxl-linkedin text-xl'></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <i className='bx bxl-github text-xl'></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <i className='bx bxl-dribbble text-xl'></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <i className='bx bxl-twitter text-xl'></i>
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>&copy; {currentYear} Devesh Prakash. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
