import { motion } from 'framer-motion';
import { FaReact, FaNodeJs, FaGitAlt, FaHtml5, FaCss3Alt, FaGithub } from 'react-icons/fa';
import { SiTypescript, SiJavascript, SiExpress, SiMongodb, SiTailwindcss } from 'react-icons/si';
import portfolioData from '../../config/portfolioData';

const About = () => {
  // Map skill names to icons
  const getSkillIcon = (skillName: string) => {
    const name = skillName.toLowerCase();
    if (name.includes('react')) return <FaReact className="text-[#61DAFB]" />;
    if (name.includes('node')) return <FaNodeJs className="text-[#339933]" />;
    if (name.includes('express')) return <SiExpress className="text-gray-800 dark:text-white" />;
    if (name.includes('mongodb')) return <SiMongodb className="text-[#47A248]" />;
    if (name.includes('typescript')) return <SiTypescript className="text-[#3178C6]" />;
    if (name.includes('javascript')) return <SiJavascript className="text-[#F7DF1E]" />;
    if (name.includes('html')) return <FaHtml5 className="text-[#E34F26]" />;
    if (name.includes('css')) return <FaCss3Alt className="text-[#1572B6]" />;
    if (name.includes('git')) return <FaGitAlt className="text-[#F05032]" />;
    if (name.includes('github')) return <FaGithub className="text-gray-800 dark:text-white" />;
    if (name.includes('tailwind')) return <SiTailwindcss className="text-[#06B6D4]" />;
    return null;
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

  // Get skill categories from portfolioData
  const skillCategories = Object.entries(portfolioData.skills);
  
  return (
    <section id="about" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          {/* Profile Info */}
          <motion.div variants={itemVariants} className="flex flex-col md:flex-row gap-8 items-start">
            {/* Profile Photo */}
            {portfolioData.profilePhoto && (
              <div className="w-48 h-48 rounded-full overflow-hidden shadow-lg flex-shrink-0 mx-auto md:mx-0 mb-6 md:mb-0">
                <img 
                  src={portfolioData.profilePhoto} 
                  alt={portfolioData.name} 
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            
            <div>
              <h2 className="section-title">About Me</h2>
              <div className="mt-6 space-y-6 text-lg text-gray-700 dark:text-gray-300">
                <p>{portfolioData.about}</p>
                
                <div className="flex items-center gap-4">
                  <a 
                    href={portfolioData.resumeLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                  >
                    View Resume
                  </a>
                  <a 
                    href="#contact" 
                    className="btn btn-outline"
                  >
                    Contact Me
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Skills */}
          <motion.div variants={itemVariants}>
            <h3 className="text-2xl font-bold mb-6">Tech Stack & Skills</h3>
            
            {skillCategories.map(([category, skills]) => (
              <motion.div key={category} className="mb-6">
                <h4 className="text-lg font-semibold mb-3 capitalize">{category.replace(/([A-Z])/g, ' $1').trim()}</h4>
                <motion.div 
                  className="grid grid-cols-3 sm:grid-cols-4 gap-4"
                  variants={containerVariants}
                >
                  {Array.isArray(skills) && skills.map((skill, index) => (
                    <motion.div
                      key={index}
                      className="flex flex-col items-center justify-center p-3 bg-white dark:bg-gray-700 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                      variants={itemVariants}
                      whileHover={{ scale: 1.05 }}
                    >
                      <div className="text-3xl mb-2">
                        {getSkillIcon(skill)}
                      </div>
                      <span className="text-sm font-medium text-center">{skill}</span>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About; 