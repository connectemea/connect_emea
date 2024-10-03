import EventSection from './components/Events';
import Testimonials from './components/Testimonials';
import About from './components/About';
import Contact from './components/Contact';
import WtConnect from './components/WhatWe';
import WhyWe from './components/WhyWe';
import Chapter from './components/Chapter';
import Journey from './components/Journey';
import Welcome from './components/Welcome';


const Home = () => {
  return (
    <div className='w-limit bg-white'>
      <Welcome />
      <EventSection />
      <WtConnect />
      <WhyWe />
      {/* <Testimonials /> */}
      <Chapter />
      <Journey />
      <About />
      <Contact />
    </div>
  );
};
export default Home;