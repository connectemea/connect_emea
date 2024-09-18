interface Point {
  title: string;
  content: string;
}
function Content() {
  const points: Point[] = [
    {
      title: "Ancient educational syllabus",
      content:
        "It’s the loophole in our education system. As humans, we bought development on everything except in our college education syllabus.",
    },
    {
      title: "Theory will take you so far.",
      content: `Theoretical knowledge might help us pass exams, but it’s not enough for real-world
      success. To thrive, we need to apply what we learned.`,
    },
    {
      title: "Wrong exposure.",
      content:
        "The wrong crowd will drown our dreams, lose our way, lose our purpose. Your life depends on the environment you choose to fit in.",
    },
  ];
  return (
    <section className="flex flex-col gap-4 p-4">
      <div className="flex flex-col gap-4 my-8">
        <h1 className="font-semibold text-3xl text-center mx-auto">
          What we are?
        </h1>
        <p className="text-center max-w-[900px] mx-auto text-xl font-normal">
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
        <div className="flex items-start flex-col gap-4">
          <h1 className="font-bold text-3xl  md:indent-10 mx-auto md:mx-0 my-4 md:my-0">
            Why we exist?
          </h1>
          {points.map((item, index) => (
            <div key={index} className="flex gap-2 md:gap-0">
              <div className="px-2">
                <div className="w-6 h-6 flex items-center justify-center bg-white border-4 border-orange-500 rounded-full">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                </div>
              </div>
              <div>
                <h1 className="font-semibold text-xl">
                  {/* bullet */}
                  <div className=""></div>
                  {item.title}
                </h1>
                <p className="">{item.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Content;
