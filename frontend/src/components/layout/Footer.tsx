import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from 'react-icons/fa';
import portfolioData from '../../config/portfolioData';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
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

  return (
    <footer className="bg-gray-100 dark:bg-gray-900 py-8">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-lg font-semibold">
              {portfolioData.name}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {portfolioData.title}
            </p>
          </div>
          
          {/* Social Links */}
          <div className="flex space-x-4 mb-4 md:mb-0">
            {portfolioData.socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xl hover:text-accent transition-colors"
                aria-label={link.name}
              >
                {getIconComponent(link.icon)}
              </a>
            ))}
            
            <a
              href={`mailto:${portfolioData.email}`}
              className="text-xl hover:text-accent transition-colors"
              aria-label="Email"
            >
              <FaEnvelope />
            </a>
          </div>
        </div>
        
        <div className="mt-8 pt-4 border-t border-gray-200 dark:border-gray-800 text-center text-sm text-gray-600 dark:text-gray-400">
          <p>© {currentYear} {portfolioData.name}. All rights reserved.</p>
          <p className="mt-2">Built with React, TypeScript, and Tailwind CSS</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 