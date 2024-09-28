import { Lightbulb, Users, Code } from 'lucide-react';

interface Card {
  title: string;
  content: string;
  icon: JSX.Element;
}

function About() {
  const cards: Card[] = [
    {
      title: "Involve",
      content:
        "Connect is a place for everyone. A place where one could involve and evolve the most. Be a part of our intriguing events like Untold Stories , Lets Chill and make the most out of it.",
      icon: <Users className="text-orange-500 w-10 h-10 mb-4 mx-auto" />,
    },
    {
      title: "Interact",
      content:
        "An Interactive setting where each one of you could connect with folks and mentors having a remarkable mindset. Your involvements, and dedication to the community can even get you an internship opportunity.",
      icon: <Lightbulb className="text-blue-500 w-10 h-10 mb-4 mx-auto" />,
    },
    {
      title: "Innovate",
      content:
        "A place brimming with possibilities for innovation and astonishing creations. A perfect spot to display your works. Here you always advance and invent yourself!",
      icon: <Code className="text-green-500 w-10 h-10 mb-4 mx-auto" />,
    },
  ];

  return (
    <div className="space-y-10">
      <div className="my-6">
        <h1 className="font-semibold text-center max-w-[600px] text-[25px] sm:text-[38px] mx-auto px-2 my-4">
          You’re Just One Step Away From Joining Our Community
        </h1>
        <p className="text-center max-w-[1100px] px-4 mx-auto text-md sm:text-lg">
          At Connect, your journey isn’t just about your career, it’s about
          growing together as a community. Join us and be part of something
          bigger, where students unite to create opportunities, share knowledge,
          and pursue their dreams together.
        </p>
       
      </div>
      <div className="flex flex-col gap-8 xl:flex-row xl:justify-center mx-auto p-6 ">
        {cards.map((card, index) => (
          <div
            className="border rounded-xl p-6 bg-white shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out max-w-[360px] mx-auto xl:mx-0 min-h-[280px] hover:scale-105"
            key={index}
          >
            <div className="flex flex-col items-center text-left cursor-default">
              {card.icon}
              <h1 className="font-bold text-xl md:text-2xl mb-4">{card.title}</h1>
              <p className="text-md md:text-lg text-gray-600">{card.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default About;
