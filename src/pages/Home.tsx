import React from 'react';
import Seo from '../components/Seo';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Work from '../components/Work';
import Process from '../components/Process';
import About from '../components/About';
import FAQ from '../components/FAQ';
import Contact from '../components/Contact';

const Home: React.FC = () => {
  return (
    <main id="main">
      <Seo
        title="Biszaal Tech — websites, mobile apps and custom software"
        canonical="https://www.biszaaltech.com/"
      />
      <Hero />
      <Services />
      <Work />
      <Process />
      <About />
      <FAQ />
      <Contact />
    </main>
  );
};

export default Home;
