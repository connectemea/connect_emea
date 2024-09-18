import React from 'react'

function Content() {
    return (
        <div className='flex flex-col md:flex-row justify-between w-limit gap-4 md:gap-0'>
            <div className='my-6 md:my-0 md:w-1/2 flex items-center justify-center mx-auto'>
                <div className="relative  h-[300px] w-[300px] flex items-center justify-center">
                    <div className="bg-orange-500 rotate-6 rounded-xl absolute z-10  w-[300px] h-[300px] border-2 border-white overflow-hidden" >
                        <img
                            src={`https://picsum.photos/600/350?v=2`}
                            alt=""
                            className="absolute inset-0 object-cover w-full h-full "
                        />
                    </div>
                    <div className="bg-slate-400 rounded-xl absolute w-[300px] h-[300px] border-2 border-white overflow-hidden" >
                        <img
                            src={`https://picsum.photos/600/350?v=5`}
                            alt=""
                            className="absolute inset-0 object-cover w-full h-full "
                        />
                    </div>
                </div>
            </div>
            <div className='md:w-1/2 text-white mx-auto'>
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
