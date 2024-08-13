import Events from './components/Events';
import Points from './components/Points';
import About from './components/about';
import Contact from './components/contact';
import Content from './components/Content';
import Chapter from './components/chapter';
import Journey from './components/Journey';
import Welcome from './components/welcome';


const Home = () => {
  return (
    <div className='min-h-[70vh] max-w-[1000px] mx-auto'>
      <Welcome />
      <Content />
      <Points />
      <Chapter />
      <Events />
      <Journey />
      <About />
      <Contact />
    </div>
  );
};
export default Home;