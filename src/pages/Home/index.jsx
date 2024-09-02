import Events from './components/Events';
import Testimonials from './components/Testimonials';
import About from './components/About';
import Contact from './components/Contact';
import Content from './components/Content';
import Chapter from './components/Chapter';
import Journey from './components/Journey';
import Welcome from './components/Welcome';


const Home = () => {
  return (
    <div className='min-h-[70vh] max-w-[1000px] mx-auto '>
      <Welcome />
      <Content />
      <Testimonials />
      <Chapter />
      <Events />
      <Journey />
      <About />
      <Contact />
    </div>
  );
};
export default Home;