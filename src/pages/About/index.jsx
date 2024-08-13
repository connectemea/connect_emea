import Communities from "./components/Communities";
import Mission from "./components/Mission";
import Vision from "./components/Vision";

const About = () => {
  return (
    <div>
      <h1 className='font-bold py-10 flex justify-center text-2xl w-full'>About </h1>
      <Mission />
      <Vision />
      <Communities />
    </div>
  );
};
export default About;