import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import portfolioData from '../../config/portfolioData';
import axios from 'axios';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    
    try {
      // Make API call to the backend
      await axios.post('/api/contact', formData);
      
      // Clear form data
      setFormData({ name: '', email: '', message: '' });
      setFormStatus('success');
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setFormStatus('idle');
      }, 5000);
    } catch (error) {
      console.error('Error sending message:', error);
      setFormStatus('error');
      setErrorMessage('There was an error sending your message. Please try again later.');
      
      // Reset error message after 5 seconds
      setTimeout(() => {
        setFormStatus('idle');
        setErrorMessage('');
      }, 5000);
    }
  };
  
  // Map icon names to icon components
  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'github':
        return <FaGithub />;
      case 'linkedin':
        return <FaLinkedin />;
      case 'twitter':
        return <FaTwitter />;
      default:
        return null;
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section id="contact" className="py-20">
      <div className="container">
        <motion.div
          className="text-center mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={itemVariants}
        >
          <h2 className="section-title mx-auto">Get In Touch</h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Feel free to reach out if you're looking for a developer, have a question, or just want to connect.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {/* Contact Info */}
          <motion.div variants={itemVariants}>
            <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="text-accent text-xl mt-1">
                  <FaEnvelope />
                </div>
                <div>
                  <h4 className="font-semibold">Email</h4>
                  <a 
                    href={`mailto:${portfolioData.email}`} 
                    className="text-gray-600 dark:text-gray-400 hover:text-accent dark:hover:text-accent transition-colors"
                  >
                    {portfolioData.email}
                  </a>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-3">Social Profiles</h4>
                <div className="flex space-x-4">
                  {portfolioData.socialLinks.map((link, index) => (
                    <a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-accent hover:text-white dark:hover:bg-accent dark:hover:text-white transition-colors"
                      aria-label={link.name}
                    >
                      {getIconComponent(link.icon)}
                    </a>
                  ))}
                </div>
              </div>
              
              <div>
                <p className="text-gray-600 dark:text-gray-400">
                  I'm currently available for freelance work or full-time opportunities.
                  Don't hesitate to reach out to discuss your project or job openings.
                </p>
              </div>
            </div>
          </motion.div>
          
          {/* Contact Form */}
          <motion.div variants={itemVariants}>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 focus:border-accent focus:ring-1 focus:ring-accent dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 focus:border-accent focus:ring-1 focus:ring-accent dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 focus:border-accent focus:ring-1 focus:ring-accent dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>
              
              <div>
                <button
                  type="submit"
                  disabled={formStatus === 'submitting'}
                  className="w-full btn btn-primary py-3"
                >
                  {formStatus === 'submitting' ? 'Sending...' : 'Send Message'}
                </button>
              </div>
              
              {/* Form Status Messages */}
              {formStatus === 'success' && (
                <div className="p-4 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-md">
                  Your message has been sent successfully! I will get back to you soon.
                </div>
              )}
              
              {formStatus === 'error' && (
                <div className="p-4 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded-md">
                  {errorMessage}
                </div>
              )}
            </form>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact; 