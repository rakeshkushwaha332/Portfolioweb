import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaSun, FaMoon, FaBars, FaTimes } from 'react-icons/fa';
import { useTheme } from '../../context/ThemeContext';
import portfolioData from '../../config/portfolioData';

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'DSA', href: '#dsa' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-md dark:bg-primary py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold">
          {portfolioData.name.split(' ')[0]}
          <span className="text-accent">Dev</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link, index) => (
            <a 
              key={index} 
              href={link.href}
              className="hover:text-accent transition-colors"
            >
              {link.name}
            </a>
          ))}
          
          {/* Theme Toggle */}
          <button 
            onClick={toggleTheme} 
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-primary" />}
          </button>
          
          {/* Resume Button */}
          <a 
            href={portfolioData.resumeLink} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn btn-primary"
          >
            Resume
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex items-center md:hidden">
          <button 
            onClick={toggleTheme} 
            className="p-2 mr-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-primary" />}
          </button>
          
          <button 
            onClick={toggleMenu}
            className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle mobile menu"
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-white dark:bg-primary shadow-md py-4 md:hidden">
            <div className="container flex flex-col space-y-4">
              {navLinks.map((link, index) => (
                <a 
                  key={index} 
                  href={link.href}
                  className="hover:text-accent transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              
              <a 
                href={portfolioData.resumeLink} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-primary self-start"
                onClick={() => setIsMenuOpen(false)}
              >
                Resume
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar; 