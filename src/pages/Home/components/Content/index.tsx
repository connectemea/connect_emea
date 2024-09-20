interface Point {
  title: string;
  content: JSX.Element;
}
function Content() {
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

  return (
    <section className="flex flex-col gap-4 p-4">
      <div className="flex flex-col gap-4 my-8">
        <h1 className="font-semibold  text-center mx-auto text-[26px] sm:text-[42px]">
          What is connect
        </h1>
        <p className="text-center max-w-[900px] mx-auto text-[18px] sm:text-[22px] font-normal">
          Connect is a vibrant, student-driven community that bridges the gap
          between academia and industry. Through collaborative learning,
          real-world experiences, and expert guidance, we provide the resources
          and environment you need to build your dream career.
        </p>
      </div>
      <div className="grid md:grid-cols-2 w-full gap-10">
        <div className="flex items-center justify-center">
          <div className="relative  h-[300px] w-[300px] flex items-center justify-center">
            <div className="bg-orange-500 rotate-6 rounded-xl absolute z-10  w-[300px] h-[300px] border-2 border-black overflow-hidden">
              <img
                src={`https://picsum.photos/600/350?v=5`}
                alt=""
                className="absolute inset-0 object-cover w-full h-full "
              />
            </div>

            <div className="bg-slate-400 rounded-xl absolute w-[300px] h-[300px] border-2 border-black overflow-hidden">
              <img
                src={`https://picsum.photos/600/350?v=2`}
                alt=""
                className="absolute inset-0 object-cover w-full h-full "
              />
            </div>
          </div>
        </div>
        <div className="flex items-start flex-col gap-8 ">
          <h1 className="font-bold   md:indent-10 mx-auto md:mx-0 my-4 md:my-0 text-[28px] sm:text-[42px]">
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

export default Content;
