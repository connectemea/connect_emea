import Communities from "./components/Communities";
import Content from "./components/Content";
import Mission from "./components/Mission";
import Vision from "./components/Vision";

const About = () => {
  return (
    <>
      <div className="bg-black p-6 py-10 my-4">
        <Content />
      </div>
      <div className="w-limit my-4">
        <Mission />
        <Vision />
        <Communities />
      </div>
    </>
  );
};
export default About;