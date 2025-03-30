import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';

const contactFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Please enter a valid email'),
  subject: z.string().min(1, 'Subject is required'),
  message: z.string().min(10, 'Message must be at least 10 characters')
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const ContactSection: React.FC = () => {
  const { toast } = useToast();
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: ''
    }
  });

  const onSubmit = async (data: ContactFormValues) => {
    try {
      await apiRequest('POST', '/api/contact', data);
      toast({
        title: 'Message sent!',
        description: 'Thank you for your message. I will get back to you soon.',
      });
      reset();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'There was a problem sending your message. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 section-fade-in">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <span className="text-primary font-medium">Let's connect</span>
          <h2 className="text-3xl md:text-4xl font-bold font-poppins mt-2">Get In Touch</h2>
          <div className="h-1 w-20 bg-orange-500 mx-auto mt-4"></div>
        </div>
        
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="md:flex">
              <div className="md:w-2/5 bg-primary text-white p-8">
                <h3 className="text-2xl font-semibold mb-6">Contact Information</h3>
                <p className="mb-8 opacity-90">
                  Feel free to reach out to me anytime. I'm available for freelance work and full-time positions.
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-white/10 flex items-center justify-center">
                      <i className='bx bx-envelope text-xl'></i>
                    </div>
                    <div className="ml-4">
                      <h4 className="text-sm font-medium opacity-90">Email</h4>
                      <p className="mt-1">deveshyada102@bbdu.ac.in</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-white/10 flex items-center justify-center">
                      <i className='bx bx-phone text-xl'></i>
                    </div>
                    <div className="ml-4">
                      <h4 className="text-sm font-medium opacity-90">Phone</h4>
                      <p className="mt-1">+917355224335</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-white/10 flex items-center justify-center">
                      <i className='bx bx-map text-xl'></i>
                    </div>
                    <div className="ml-4">
                      <h4 className="text-sm font-medium opacity-90">Location</h4>
                      <p className="mt-1">Lucknow, Uttar Pradesh, India</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-12">
                  <h4 className="text-sm font-medium mb-4 opacity-90">Social Profiles</h4>
                  <div className="flex space-x-4">
                    <a href="#" className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                      <i className='bx bxl-linkedin'></i>
                    </a>
                    <a href="#" className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                      <i className='bx bxl-github'></i>
                    </a>
                    <a href="#" className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                      <i className='bx bxl-dribbble'></i>
                    </a>
                    <a href="#" className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                      <i className='bx bxl-twitter'></i>
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="md:w-3/5 p-8">
                <h3 className="text-2xl font-semibold text-gray-900 mb-6">Send me a message</h3>
                
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                      <input 
                        type="text" 
                        id="name" 
                        {...register('name')}
                        className={`w-full px-4 py-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-primary focus:border-primary outline-none transition`} 
                        placeholder="Your name" 
                      />
                      {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>}
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input 
                        type="email" 
                        id="email" 
                        {...register('email')}
                        className={`w-full px-4 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-primary focus:border-primary outline-none transition`} 
                        placeholder="Your email" 
                      />
                      {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                    <input 
                      type="text" 
                      id="subject" 
                      {...register('subject')}
                      className={`w-full px-4 py-2 border ${errors.subject ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-primary focus:border-primary outline-none transition`} 
                      placeholder="Subject" 
                    />
                    {errors.subject && <p className="mt-1 text-sm text-red-500">{errors.subject.message}</p>}
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                    <textarea 
                      id="message" 
                      {...register('message')}
                      rows={4} 
                      className={`w-full px-4 py-2 border ${errors.message ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-primary focus:border-primary outline-none transition resize-none`} 
                      placeholder="Your message"
                    ></textarea>
                    {errors.message && <p className="mt-1 text-sm text-red-500">{errors.message.message}</p>}
                  </div>
                  
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full px-8 py-3 bg-primary text-white font-medium rounded-md shadow hover:bg-primary-dark transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 disabled:opacity-70"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
