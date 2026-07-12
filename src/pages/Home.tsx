import React from 'react';
import Hero from '../components/Hero';
import Products from '../components/Products';
import About from '../components/About';
import FAQ from '../components/FAQ';
import GamesDoorway from '../components/GamesDoorway';
import Contact from '../components/Contact';

const Home: React.FC = () => {
  return (
    <main id="main">
      <Hero />
      <Products />
      <About />
      <FAQ />
      <GamesDoorway />
      <Contact />
    </main>
  );
};

export default Home;
