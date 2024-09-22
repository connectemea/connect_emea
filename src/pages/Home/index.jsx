import EventSection from './components/Events';
import Testimonials from './components/Testimonials';
import About from './components/About';
import Contact from './components/Contact';
import Content from './components/Content';
import Chapter from './components/Chapter';
import Journey from './components/Journey';
import Welcome from './components/Welcome';


const Home = () => {
  return (
    <div className='w-limit bg-white'>
      <Welcome />
      <Content />
      <EventSection />  
      {/* <Testimonials /> */}
      <Chapter />
      <Journey />
      <About />
      <Contact />
    </div>
  );
};
export default Home;