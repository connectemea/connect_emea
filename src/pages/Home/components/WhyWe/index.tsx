import {
  BootCamp,
  inFront,
  Image3,
  Image4,
  Image5,
  Image6,
  Image7,
} from "@/assets/images/Us";
import { useState } from "react";

interface Point {
  title: string;
  content: JSX.Element;
}

function WhyWe() {
  const points: Point[] = [
    {
      title: "Beyond the Classroom",
      content: (
        <>
          True learning happens outside textbooks and lectures. While academic
          knowledge is vital,{" "}
          <span className="font-bold">community and hands-on experience</span>{" "}
          are where students truly grow.
        </>
      ),
    },
    {
      title: "Bridging the Gap",
      content: (
        <>
          The traditional education system often lacks real-world application.{" "}
          <span className="font-bold">Connect steps in</span> to fill that gap,
          offering opportunities for students to apply what they’ve learned.
        </>
      ),
    },
    {
      title: "Supportive Environment",
      content: (
        <>
          We create a space where students can{" "}
          <span className="font-bold">turn theory into practice</span>,
          surrounded by like-minded peers who share their drive for success.
        </>
      ),
    },
    {
      title: "Collaborative Growth",
      content: (
        <>
          At Connect, we{" "}
          <span className="font-bold">challenge, inspire, and support</span>{" "}
          each other, achieving more together than we could alone.
        </>
      ),
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Function to update the image index

  const images = [BootCamp, Image5, Image6, Image7, inFront, Image4, Image3];
  const handleImageChange = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length); // Loop through the images
  };

  return (
    <section className="flex flex-col gap-4 p-4">
      <div className="grid md:grid-cols-2 w-full gap-10">
        <div className="flex items-center justify-center">
          <div className="relative  h-[300px] w-[300px] flex items-center justify-center">
            <div
              className="bg-orange-500 rotate-6 rounded-xl absolute z-10  w-[300px] h-[300px] border-2 border-black overflow-hidden cursor-pointer select-none"
              onClick={handleImageChange}
            >
              <img
                src={images[currentIndex]}
                alt=""
                className="absolute inset-0 object-cover w-full h-full "
              />
            </div>

            <div className="bg-slate-400 rounded-xl absolute w-[300px] h-[300px] border-2 border-black overflow-hidden">
              <img
                src={images[currentIndex + 1]}
                alt=""
                className="absolute inset-0 object-cover w-full h-full "
              />
            </div>
          </div>
        </div>
        <div className="flex items-start flex-col gap-6 ">
          <h1 className="font-semibold   md:indent-10 mx-auto md:mx-0 my-4 md:my-0 text-[28px] sm:text-[38px]">
            Why we exist
          </h1>
          {points.map((item, index) => (
            <div key={index} className="flex gap-4 md:gap-0">
              <div className="px-2">
                <div className="w-6 h-6 flex items-center justify-center bg-white border-4 border-orange-500 rounded-full">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                </div>
              </div>
              <div className="md:px-2 space-y-1">
                <h1 className="font-semibold text-xl md:text-2xl -mt-1">
                  {/* bullet */}
                  {item.title}
                </h1>
                <p className="text-md md:text-lg">{item.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhyWe;
