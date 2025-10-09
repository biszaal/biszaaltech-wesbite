import React from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import Products from '../components/Products';
import Contact from '../components/Contact';

const Home: React.FC = () => {
  return (
    <main>
      <Hero />
      <About />
      <Products />
      <Contact />
    </main>
  );
};

export default Home;