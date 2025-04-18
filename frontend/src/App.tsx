import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Layout from './components/layout/Layout';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Projects from './components/sections/Projects';
import DSA from './components/sections/DSA';
import Contact from './components/sections/Contact';

function App() {
  return (
    <Router>
      <ThemeProvider>
        <Layout>
          <Hero />
          <About />
          <Projects />
          <DSA />
          <Contact />
        </Layout>
      </ThemeProvider>
    </Router>
  );
}

export default App;
