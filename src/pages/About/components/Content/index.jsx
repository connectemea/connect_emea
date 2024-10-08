import React, { useState } from 'react'
import { inFront, BootCamp, Image3, Image4, Image5, Image6, Image7 } from "@/assets/images/Us";
function Content() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const images = [
        inFront,
        Image3, 
        Image7, 
        Image6,
        BootCamp,
        Image4, 
        Image5,

    ];
    const handleImageChange = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length); // Loop through the images
    };

    return (
        <div className='flex flex-col lg:flex-row justify-between w-limit gap-6 lg:gap-0'>
            <div className='my-6 lg:my-0 lg:w-1/2 flex items-center justify-center mx-auto'>
                <div className="relative  h-[300px] w-[300px] flex items-center justify-center">
                    <div className="bg-orange-500 rotate-6 rounded-xl absolute z-10  w-[300px] h-[300px] border-2 border-white overflow-hidden cursor-pointer" onClick={handleImageChange}>
                        <img
                            src={images[currentIndex]}
                            alt=""
                            className="absolute inset-0 object-cover w-full h-full "
                        />
                    </div>
                    <div className="bg-slate-400 rounded-xl absolute w-[300px] h-[300px] border-2 border-white overflow-hidden" >
                        <img
                            src={images[currentIndex + 1]}
                            alt=""
                            className="absolute inset-0 object-cover w-full h-full "
                        />
                    </div>
                </div>
            </div>

            <div className='lg:w-1/2 text-white mx-auto space-y-4 lg:space-y-2  text-lg md:text-xl lg:text-left text-center'>
                <p>
                    Four years ago, in the halls of EMEA College, four passionate students—Salman CC, Afeef, Aseel, and Nahyan—shared a common dream. They wanted to create something meaningful for their fellow students. Driven by their determination, they proposed developing a college software application to our college principal.
                </p>
                <p>
                    Recognizing their potential, the principal entrusted them with the task. They worked tirelessly, day and night, which not only strengthened their teamwork but also provided invaluable industry experience. Their hard work paid off, as the project opened doors to internships and job opportunities for them.
                </p>
                <p>
                    Inspired by their success, Salman, Afeef, Aseel, and Nahyan envisioned a platform to offer similar opportunities to all EMEA College students. Thus, Connect was born—a community dedicated to bridging the gap between industry and academia.
                </p>
            </div>
        </div>
    )
}

export default Content
