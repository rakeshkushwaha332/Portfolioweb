# Rakesh Kushwaha's Portfolio

A personal portfolio website built with React, TypeScript, and Tailwind CSS to showcase my projects, skills, and experience.

## Technologies Used

- React
- TypeScript
- Tailwind CSS
- Framer Motion (animations)
- Vite (build tool)

## Getting Started

### Prerequisites

- Node.js (v14+)
- npm or yarn

### Installation

1. Clone this repository
   ```
   git clone https://github.com/rakeshkushwaha332/portfolio.git
   cd portfolio/frontend
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Start development server
   ```
   npm run dev
   ```

## Deploying to Netlify

### Option 1: Manual deployment with Netlify CLI

1. Build the project locally:
   ```
   npm run build
   ```

2. Deploy to Netlify:
   ```
   npm run deploy
   ```

### Option 2: Set up continuous deployment

1. Push your code to GitHub
2. Log in to [Netlify](https://app.netlify.com/)
3. Click "New site from Git"
4. Select your GitHub repository
5. Configure build settings:
   - Build command: `cd frontend && npm run build`
   - Publish directory: `frontend/dist`
6. Click "Deploy site"

### Important Netlify Settings

- Make sure to set up proper redirect rules. The `netlify.toml` file in this repository already configures redirects for React Router.
- Set the following environment variables in your Netlify site settings if needed:
  - `NODE_VERSION`: 16 (or your preferred Node.js version)

## Project Structure

- `/frontend/src/components` - React components
- `/frontend/src/config` - Configuration files including portfolio data
- `/frontend/public` - Static assets

## Adding Your Profile Images

The portfolio uses the following images:
- `profile.jpg` - Your profile picture
- `project1.jpg`, `project3.jpg` - Project images

Place your images in the `/frontend/public/assets/images/` directory.

## Customizing Content

Edit the `src/config/portfolioData.ts` file to update:
- Personal information
- Skills
- Projects
- Contact information
