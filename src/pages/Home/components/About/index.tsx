interface Card {
  title: string;
  content: string;
}

function About() {
  const cards: Card[] = [
    {
      title: "Involve",
      content:
        "µLearn is a place for everyone. A place where one could involve and evolve the most. Be a part of our intriguing events like Inspiration  Radio, Lets Chill and make the most out of it.",
    },
    {
      title: "Interact",
      content:
        "An Interactive setting where each one of you could connect with folks and mentors having a remarkable mindset. Your involvements, and dedication to the community can even get you an internship opportunity.",
    },
    {
      title: "Innovate",
      content:
        "A place brimming with possibilities for innovation and astonishing creations. A perfect spot to display your works. Here you always advance and invent yourself!",
    },
  ];
  return (
    <div className="space-y-10">
      <div className="my-6">
        <h1 className="font-bold mx-auto max-w-[600px] text-[25px] sm:text-[38px] text-center my-4 px-2">
          You’re Just One Step Away From Joining Our Community
        </h1>
        <p className="text-center max-w-[900px] px-4 mx-auto text-md sm:text-lg">
          At Connect, your journey isn’t just about your career, it’s about
          growing together as a community. Join us and be part of something
          bigger, where students unite to create opportunities, share knowledge,
          and pursue their dreams together.
        </p>
        <h2 className="font-bold text-xl sm:text-xl md:text-2xl text-center my-4 px-2">
          Your future, with friends by your side.
        </h2>
      </div>
      <div className="flex gap-4 mx-auto m-4 flex-col xl:flex-row my-6 xl:p-2 w-full max-w-[600px] p-6 xl:max-w-full">
        {cards.map((card, index) => (
          <div
            className={`border rounded-xl p-4 bg-stone-200  max-w-[360px] border-gray-700 min-h-[200px] xl:min-h-[250px] max-h-[260px] transition-all ease-in-out duration-300 hover:z-30 hover:shadow-xl 
            ${index % 2 === 0 ? "self-start xl:self-auto xl:rotate-0 -rotate-12" : "self-end rotate-12 xl:self-auto xl:rotate-0 z-10"} 
            ${index !== 0 ? "-mt-28 xl:mt-0" : ""}
            ${index === 2 ? "xl:!rotate-0 !-rotate-6 xl:-ml-10 xl:mt-6" : ""}
            ${index === 0 ? " xl:-mr-10 xl:-mt-4 xl:z-20" : ""}
            `}
            key={index}
          >
            
            <h1 className="text-center font-semibold text-2xl md:text-3xl mb-4">{card.title}</h1>
            <p className="text-md md:text-lg">{card.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default About;
