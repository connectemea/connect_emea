import Events from './components/Events';
import Points from './components/Points';
import About from './components/about';
import Contact from './components/contact';
import Section1 from './components/section1';
import Section2 from './components/section2';
import Section3 from './components/section3';
import Welcome from './components/welcome';


const Home = () => {
  return (
    <div className='min-h-[70vh]'>
      <Welcome />
      <Section1 />
      <Points />
      <Section2 />
      <Events />
      <Section3 />
      <About />
      <Contact />
    </div>
  );
};
export default Home;