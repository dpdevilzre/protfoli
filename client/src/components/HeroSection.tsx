import React from 'react';
import { useSpring, animated } from '@react-spring/web';

const HeroSection: React.FC = () => {
  // React Spring animations
  const fadeIn = useSpring({
    from: { opacity: 0, transform: 'translateY(30px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    config: { duration: 1000 }
  });

  const slideInRight = useSpring({
    from: { opacity: 0, transform: 'translateX(50px)' },
    to: { opacity: 1, transform: 'translateX(0)' },
    delay: 300,
    config: { duration: 1000 }
  });

  const buttonAnimation = useSpring({
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    delay: 800,
    config: { duration: 500 }
  });

  const floatAnimation = useSpring({
    to: async (next) => {
      while (true) {
        await next({ transform: 'translateY(-10px)' });
        await next({ transform: 'translateY(0px)' });
      }
    },
    from: { transform: 'translateY(0px)' },
    config: { duration: 2000 }
  });

  return (
    <section id="home" className="min-h-screen flex items-center bg-gradient-to-br from-primary-light/5 to-primary/10 px-4 sm:px-6 lg:px-8 py-16">
      <div className="container mx-auto">
        <div className="lg:flex items-center justify-between">
          <animated.div style={fadeIn} className="lg:w-1/2 lg:pr-12 mb-10 lg:mb-0">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 font-poppins mb-6">
              <span className="block">Hi, I'm</span>
              <animated.span className="text-primary bg-clip-text bg-gradient-to-r from-primary to-orange-500">Devesh Prakash</animated.span>
            </h1>
            <div className="flex items-center mb-6">
              <div className="h-1 w-20 bg-orange-500 mr-4"></div>
              <span className="text-xl font-medium text-gray-600">Web Designer</span>
            </div>
            <p className="text-gray-700 text-lg mb-8 max-w-lg">
              I create responsive, user-friendly web experiences with attention to detail and focus on performance.
            </p>
            <animated.div style={buttonAnimation} className="flex flex-wrap gap-4">
              <a href="#projects" className="inline-block px-8 py-4 bg-primary text-white font-medium rounded-md shadow-lg hover:bg-primary-dark transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50">
                View My Work
              </a>
              <a href="#contact" className="inline-block px-8 py-4 bg-white text-primary border border-primary font-medium rounded-md hover:bg-primary/5 transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50">
                Contact Me
              </a>
            </animated.div>
          </animated.div>
          
          <animated.div style={slideInRight} className="lg:w-1/2 flex justify-center">
            <animated.div style={floatAnimation} className="relative">
              <div className="bg-white shadow-xl rounded-xl p-4 max-w-md">
                <div className="bg-primary/5 rounded-lg p-8">
                  <i className='bx bxs-user-circle text-primary text-9xl block mx-auto'></i>
                  <div className="text-center mt-4">
                    <h2 className="text-2xl font-semibold text-gray-900 font-poppins">Devesh Prakash</h2>
                    <p className="text-gray-600">Web Designer</p>
                  </div>
                  <div className="mt-6 space-y-3">
                    <div className="flex items-center text-sm">
                      <i className='bx bx-envelope text-primary text-xl mr-2'></i>
                      <span className="text-gray-700">deveshyada102@bbdu.ac.in</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <i className='bx bx-phone text-primary text-xl mr-2'></i>
                      <span className="text-gray-700">+917355224335</span>
                    </div>
                  </div>
                  <animated.div style={buttonAnimation} className="mt-6 flex justify-center space-x-4">
                    <a href="#" className="bg-primary h-10 w-10 rounded-full flex items-center justify-center text-white hover:bg-primary-dark hover:scale-110 transition-all">
                      <i className='bx bxl-linkedin'></i>
                    </a>
                    <a href="#" className="bg-primary h-10 w-10 rounded-full flex items-center justify-center text-white hover:bg-primary-dark hover:scale-110 transition-all">
                      <i className='bx bxl-github'></i>
                    </a>
                    <a href="#" className="bg-primary h-10 w-10 rounded-full flex items-center justify-center text-white hover:bg-primary-dark hover:scale-110 transition-all">
                      <i className='bx bxl-dribbble'></i>
                    </a>
                  </animated.div>
                </div>
              </div>
              <div className="absolute -z-10 -bottom-4 -right-4 h-full w-full bg-orange-500/20 rounded-xl"></div>
            </animated.div>
          </animated.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
