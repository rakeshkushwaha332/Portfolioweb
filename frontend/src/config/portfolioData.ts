export interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  githubLink: string;
  liveLink?: string;
  image?: string;
  demoLink?: string;
}

export interface Skill {
  name: string;
  icon: string;
}

export interface DSAProblem {
  id: number;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  platform: string;
  link?: string;
  description?: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

const portfolioData = {
  name: "Rakesh Kushwaha",
  title: "Full Stack Developer",
  tagline: "Building robust web applications with modern technologies",
  about: `I'm a passionate Full Stack Developer specializing in MERN stack development with 3+ years of experience.
          I enjoy solving complex problems and creating intuitive, responsive web applications that deliver exceptional user experiences.
          When I'm not coding, you can find me hiking, reading tech blogs, or contributing to open-source projects.
          I'm constantly learning and exploring new technologies to stay at the forefront of web development.`,
  
  skills: {
    frontEnd: ["React", "Next.js", "TypeScript", "JavaScript", "HTML5", "CSS3", "Redux", "Tailwind CSS", "Material UI", "Responsive Design", "Webpack", "Jest", "React Testing Library"],
    backEnd: ["Node.js", "Express", "NestJS", "RESTful APIs", "GraphQL", "JWT Authentication", "Socket.IO", "Serverless Functions", "Microservices"],
    databases: ["MongoDB", "PostgreSQL", "MySQL", "Firebase", "Redis", "Prisma", "Mongoose"],
    devOps: ["Git", "GitHub Actions", "Docker", "AWS (S3, EC2, Lambda)", "Vercel", "Netlify", "CI/CD Pipelines", "Linux"],
    design: ["Figma", "Adobe XD", "UI/UX Principles", "Responsive Design", "Wireframing", "Prototyping"],
    other: ["Agile Methodology", "Scrum", "Problem Solving", "Technical Documentation", "Pair Programming", "Cross-functional Collaboration"]
  },
  
  projects: [
    {
      id: 1,
      title: "AgroFusion",
      description: `A full-stack web application that revolutionizes the agricultural supply chain in India.
                    Directly connects farmers with consumers, eliminating middlemen, ensuring fair pricing,
                    and promoting high-quality produce at reduced costs. Features include real-time chat,
                    local transactions prioritization, and transparent pricing model.`,
      technologies: ["Node.js", "Express.js", "MongoDB", "EJS", "Tailwind CSS", "Socket.io"],
      image: "/assets/images/project1.jpg",
      githubLink: "https://github.com/rakeshkushwaha332/AgriFusion",
    },
    {
      id: 2,
      title: "Landing Page for CA",
      description: `A professional landing page for a Chartered Accountant firm. The website showcases
                    their services, team members, and contact information with a clean, professional design.
                    Implemented responsive layout for optimal viewing on all devices.`,
      technologies: ["HTML", "CSS", "JavaScript", "EJS", "Node.js"],
      image: "/assets/images/profile.jpg",
      githubLink: "https://github.com/rakeshkushwaha332/smabansal",
    },
    {
      id: 3,
      title: "Airbnb Clone",
      description: `A full-featured Airbnb clone that allows users to search, view, and book accommodations.
                    Hosts can add properties with descriptions, photos, and pricing. Implemented user
                    authentication, property listings, booking system, and reviews.`,
      technologies: ["HTML", "CSS", "JavaScript", "Node.js", "Express.js", "MongoDB", "RESTful APIs", "JWT Authentication"],
      image: "/assets/images/project3.jpg",
      githubLink: "https://github.com/rakeshkushwaha332/delta-project",
    },
    {
      id: 4,
      title: "Portfolio Website",
      description: `A modern portfolio website built with React and TypeScript to showcase my projects,
                    skills, and experience. Features responsive design, dark mode, animations, and
                    contact form.`,
      technologies: ["React", "TypeScript", "Tailwind CSS", "Framer Motion", "Vite"],
      image: "/assets/images/profile.jpg",
      githubLink: "https://github.com/rakeshkushwaha332/portfolio",
    },
  ],
  
  dsaProblems: [
    {
      id: 1,
      title: "Two Sum",
      difficulty: "Easy",
      platform: "LeetCode",
      link: "https://leetcode.com/problems/two-sum/",
      description: "Find two numbers that add up to a specific target",
    },
    {
      id: 2,
      title: "Valid Parentheses",
      difficulty: "Easy",
      platform: "LeetCode",
      link: "https://leetcode.com/problems/valid-parentheses/",
      description: "Determine if the input string has valid parentheses",
    },
    {
      id: 3,
      title: "Merge Intervals",
      difficulty: "Medium",
      platform: "LeetCode",
      link: "https://leetcode.com/problems/merge-intervals/",
      description: "Merge overlapping intervals",
    },
    {
      id: 4,
      title: "LRU Cache",
      difficulty: "Medium",
      platform: "LeetCode",
      link: "https://leetcode.com/problems/lru-cache/",
      description: "Implement a Least Recently Used (LRU) cache",
    },
    {
      id: 5,
      title: "Median of Two Sorted Arrays",
      difficulty: "Hard",
      platform: "LeetCode",
      link: "https://leetcode.com/problems/median-of-two-sorted-arrays/",
      description: "Find the median of two sorted arrays in logarithmic time",
    },
  ],
  
  socialLinks: [
    {
      name: "GitHub",
      url: "https://github.com/rakeshkushwaha332",
      icon: "github",
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/rakeshkushwaha332/",
      icon: "linkedin",
    },
    {
      name: "LeetCode",
      url: "https://leetcode.com/u/muthxXx6hT/",
      icon: "code",
    },
  ],
  
  email: "rakeshkushwaha332@gmail.com",
  resumeLink: "https://drive.google.com/file/d/1EswjdrSwNPM-ot9CF7u8n8Gey8JYAQ24/view?usp=sharing",
  profilePhoto: "/assets/images/profile.jpg",
};

export default portfolioData; 