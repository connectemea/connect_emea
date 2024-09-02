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
        <h1 className="font-bold text-xl sm:text-2xl md:text-3xl text-center my-4">
          Knowing more about Connect
        </h1>
        <p className="text-center max-w-[700px] px-2 mx-auto">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim
        </p>
      </div>
      <div className="flex gap-4 mx-auto m-4 flex-col lg:flex-row my-6">
        {cards.map((card, index) => (
          <div
            className="border rounded-xl p-4 bg-stone-200 mx-auto max-w-[360px] border-gray-700"
            key={index}
          >
            <h1 className="text-center font-semibold text-2xl">{card.title}</h1>
            <p>{card.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default About;
