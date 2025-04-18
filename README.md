# Personal Portfolio Website - MERN Stack

A professional portfolio website built with the MERN stack (MongoDB, Express.js, React, Node.js) with responsive design, interactive UI, and modern features.

## Features

- **Hero Section**: Name, title, and main call-to-action
- **About Section**: Bio and tech stack icons
- **Projects Section**: Cards showcasing featured projects with links
- **DSA Section**: List of solved DSA problems and sorting algorithm visualizer
- **Contact Section**: Contact form with backend functionality
- **Dark/Light mode**: Theme toggle with persistent storage
- **Responsive design**: Mobile-friendly layout
- **Animations**: Smooth transitions using Framer Motion

## Tech Stack

### Frontend
- React with TypeScript
- React Router for navigation
- Tailwind CSS for styling
- Framer Motion for animations
- React Icons for icon components
- Axios for API requests

### Backend
- Node.js with Express
- MongoDB for database
- Mongoose for data modeling
- Nodemailer for email functionality
- Express Validator for form validation

## Getting Started

### Prerequisites
- Node.js (v14+)
- MongoDB installed and running locally (or MongoDB Atlas account)

### Installation and Setup

1. Clone the repository
```bash
git clone https://github.com/yourusername/portfolio.git
cd portfolio
```

2. Backend Setup
```bash
cd backend
npm install
# Create .env file from example
cp .env.example .env
# Edit .env file with your credentials
# Start the server
npm run dev
```

3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Configuration

You can customize your portfolio data by editing:
- `frontend/src/config/portfolioData.ts` - Update your personal information, projects, skills, etc.

## Deployment

### Backend
- Set up a MongoDB Atlas database
- Deploy to Heroku, Vercel, or similar platforms
- Set environment variables for production

### Frontend
- Build the production version: `npm run build`
- Deploy to Netlify, Vercel, or similar platforms

## License
MIT

## Acknowledgements
- Tailwind CSS
- React Icons
- Framer Motion
- All the libraries and tools used in this project 