import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaExternalLinkAlt } from 'react-icons/fa';
import portfolioData from '../../config/portfolioData';
import { DSAProblem } from '../../config/portfolioData';
import SortingVisualizer from '../visualizers/SortingVisualizer';

const DSA = () => {
  const [activeTab, setActiveTab] = useState('problems');
  
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
    <section id="dsa" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container">
        <motion.div
          className="text-center mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={itemVariants}
        >
          <h2 className="section-title mx-auto">Data Structures & Algorithms</h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Exploring algorithmic challenges and visualizing sorting algorithms to demonstrate 
            my problem-solving skills and understanding of computer science fundamentals.
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex rounded-md shadow-sm border border-gray-200 dark:border-gray-700">
            <button
              className={`px-4 py-2 text-sm font-medium rounded-l-md ${
                activeTab === 'problems'
                  ? 'bg-accent text-white'
                  : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600'
              }`}
              onClick={() => setActiveTab('problems')}
            >
              Problems Solved
            </button>
            <button
              className={`px-4 py-2 text-sm font-medium rounded-r-md ${
                activeTab === 'visualizer'
                  ? 'bg-accent text-white'
                  : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600'
              }`}
              onClick={() => setActiveTab('visualizer')}
            >
              Sorting Visualizer
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="mt-8">
          {activeTab === 'problems' ? (
            <ProblemsTab />
          ) : (
            <VisualizerTab />
          )}
        </div>
      </div>
    </section>
  );
};

const ProblemsTab = () => {
  // Filter problems by difficulty
  const easyProblems = portfolioData.dsaProblems.filter(p => p.difficulty === 'Easy');
  const mediumProblems = portfolioData.dsaProblems.filter(p => p.difficulty === 'Medium');
  const hardProblems = portfolioData.dsaProblems.filter(p => p.difficulty === 'Hard');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-3 gap-8"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={containerVariants}
    >
      <DifficultyColumn 
        title="Easy" 
        problems={easyProblems} 
        color="green"
      />
      
      <DifficultyColumn 
        title="Medium" 
        problems={mediumProblems} 
        color="yellow"
      />
      
      <DifficultyColumn 
        title="Hard" 
        problems={hardProblems} 
        color="red"
      />
    </motion.div>
  );
};

const DifficultyColumn = ({ 
  title, 
  problems, 
  color 
}: { 
  title: string; 
  problems: DSAProblem[];
  color: 'green' | 'yellow' | 'red';
}) => {
  const colorClasses = {
    green: 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200',
    yellow: 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200',
    red: 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200',
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
    <motion.div 
      className="bg-white dark:bg-gray-700 rounded-lg shadow-md overflow-hidden"
      variants={itemVariants}
    >
      <div className={`${colorClasses[color]} p-4`}>
        <h3 className="text-lg font-bold">{title}</h3>
        <div className="text-sm">
          {problems.length} Problems Solved
        </div>
      </div>
      
      <ul className="divide-y divide-gray-200 dark:divide-gray-600">
        {problems.map((problem) => (
          <li key={problem.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-600 transition">
            <div className="flex justify-between">
              <div>
                <h4 className="font-medium">{problem.title}</h4>
                {problem.description && (
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {problem.description}
                  </p>
                )}
              </div>
              
              {problem.link && (
                <a
                  href={problem.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:text-blue-700 dark:hover:text-blue-300"
                  aria-label={`View ${problem.title} on ${problem.platform}`}
                >
                  <FaExternalLinkAlt />
                </a>
              )}
            </div>
            
            <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
              {problem.platform}
            </div>
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

const VisualizerTab = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6">
        <h3 className="text-xl font-bold mb-4">Sorting Algorithm Visualizer</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Watch different sorting algorithms in action. Select an algorithm and see how it works with a randomized array.
        </p>
        
        <SortingVisualizer />
      </div>
    </motion.div>
  );
};

export default DSA; 