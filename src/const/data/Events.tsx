import { Event } from "@/types/eventsTypes";
import {
  LearningStation,
  Reconnect,
  InternHiring,
  LinkednandResume,
  ResumeBuilding,
  Shehike,
  UntoldStories,
  DigitalMarketing,
} from "@/assets/images/Events";

const Events: Event[] = [
  {
    id: 1,
    title: "Connect EMEA Workshop",
    date: "25/09/2024",
    time: "2:30 PM",
    location: "Seminar Hall",
    description:
      "A Event that Introduce students to various career paths and industries they may not have previously considered.",
    image: LearningStation,
    link: "https://www.eventbrite.com/e/connect-emea-workshop-tickets-1234567890",
    big_description:
      "A Event that Introduce students to various career paths and industries they may not have previously considered.",
    about: {
      objectives:
        "A Event that Introduce students to various career paths and industries they may not have previously considered.",
      highlights: (
        <ul className="list-disc list-inside space-y-1 p-2">
          <li>Networking opportunities with industry professionals.</li>
          <li>Workshops on resume building and interview preparation.</li>
          <li>Panel discussions featuring successful alumni.</li>
        </ul>
      ),
      gallery: [],
    },
  },
  {
    id: 2,
    title: "Connect EMEA Re meet",
    date: "23/07/2024",
    time: "9:30 PM",
    location: "Innovation and Incubation Center",
    description:
      "An event to connect with industry leaders and like-minded professionals.",
    image: Reconnect,
    link: "https://www.eventbrite.com/e/connect-emea-networking-event-tickets-1234567890",
    big_description:
      "An event to connect with industry leaders and like-minded professionals.",
    about: {
      objectives:
        "An event to connect with industry leaders and like-minded professionals.",
      highlights: (
        <ul className="list-disc list-inside  space-y-1 p-2">
          <li>Networking opportunities with industry professionals.</li>
          <li>Workshops on resume building and interview preparation.</li>
          <li>Panel discussions featuring successful alumni.</li>
        </ul>
      ),
      gallery: [],
    },
  },
  {
    id: 3,
    title: "Connect EMEA Internship",
    date: "09/11/2022",
    time: "1:00 PM",
    location: "Innovation and Incubation Center",
    description: "Panel discussion with tech pioneers about the future of AI.",
    image: InternHiring,
    link: "https://www.eventbrite.com/e/connect-emea-panel-discussion-tickets-1234567890",
    big_description:
      "Panel discussion with tech pioneers about the future of AI.",
    about: {
      objectives: "Panel discussion with tech pioneers about the future of AI.",
      highlights: (
        <ul className="list-disc list-inside space-y-1 p-2">
          <li>Networking opportunities with industry professionals.</li>
          <li>Workshops on resume building and interview preparation.</li>
          <li>Panel discussions featuring successful alumni.</li>
        </ul>
      ),
      gallery: [],
    },
  },
  {
    id: 4,
    title: "Connect EMEA Job Fair",
    date: "22/11/2023",
    time: "01:30 PM",
    location: "Seminar Hall",
    description: "Meet top recruiters at the Connect EMEA Job Fair.",
    image: ResumeBuilding,
    link: "https://www.eventbrite.com/e/connect-emea-job-fair-tickets-1234567890",
    big_description: "Meet top recruiters at the Connect EMEA Job Fair.",
    about: {
      objectives: "Meet top recruiters at the Connect EMEA Job Fair.",
      highlights: (
        <ul className="list-disc list-inside space-y-1 p-2">
          <li>Networking opportunities with industry professionals.</li>
          <li>Workshops on resume building and interview preparation.</li>
          <li>Panel discussions featuring successful alumni.</li>
        </ul>
      ),
      gallery: [],
    },
  },
  {
    id: 5,
    title: "Connect EMEA Job Fair",
    date: "05/12/2023",
    time: "01:30 PM",
    location: "Seminar Hall",
    description: "Elevate Your proffesional pressence with us.",
    image: LinkednandResume,
    link: "https://www.eventbrite.com/e/connect-emea-coding-challenge-tickets-1234567890",
    big_description: "Elevate Your proffesional pressence with us.",
    about: {
      objectives: "Elevate Your proffesional pressence with us.",
      highlights: (
        <ul className="list-disc list-inside space-y-1 p-2">
          <li>Networking opportunities with industry professionals.</li>
          <li>Workshops on resume building and interview preparation.</li>
          <li>Panel discussions featuring successful alumni.</li>
        </ul>
      ),
      gallery: [],
    },
  },

  {
    id: 6,
    title: "Connect EMEA Shehike",
    date: "01/12/2023",
    time: "10:00 AM",
    location: "Audio Visual Theatre",
    description:
      "Join us for an inspiring talk session that celebrates the achievements and experiences of our students who successfully juggle both their studies and their professional careers.",
    image: Shehike,
    link: "https://www.eventbrite.com/e/connect-emea-hackathon-tickets-1234567890",
    big_description:
      "Join us for an inspiring talk session that celebrates the achievements and experiences of our students who successfully juggle both their studies and their professional careers.",
    about: {
      objectives:
        "Join us for an inspiring talk session that celebrates the achievements and experiences of our students who successfully juggle both their studies and their professional careers.",
      highlights: (
        <ul className="list-disc list-inside space-y-1 p-2">
          <li>Networking opportunities with industry professionals.</li>
          <li>Workshops on resume building and interview preparation.</li>
          <li>Panel discussions featuring successful alumni.</li>
        </ul>
      ),
      gallery: [],
    },
  },
  {
    id: 7,
    title: "Connect EMEA Intracting Event",
    date: "26/02/2024",
    time: "10:00 AM",
    location: "Audio Visual Theatre",
    description:
      "Network with industry professionals and learn about internship opportunities.",
    image: UntoldStories,
    link: "https://www.eventbrite.com/e/connect-emea-networking-event-tickets-1234567890",
    big_description:
      "Network with industry professionals and learn about internship opportunities.",
    about: {
      objectives:
        "Network with industry professionals and learn about internship opportunities.",
      highlights: (
        <ul className="list-disc list-inside space-y-1 p-2">
          <li>Networking opportunities with industry professionals.</li>
          <li>Workshops on resume building and interview preparation.</li>
          <li>Panel discussions featuring successful alumni.</li>
        </ul>
      ),
      gallery: [],
    },
  },
  {
    id: 8,
    title: "Connect EMEA Levelup",
    date: "22/12/2023",
    time: "7:30 PM",
    location: "Google Meet",
    description: "An engaging workshop on digital marketing trends for 2023.",
    image: DigitalMarketing,
    link: "https://www.eventbrite.com/e/connect-emea-hackathon-tickets-1234567890",
    big_description:
      "An engaging workshop on digital marketing trends for 2023.",
    about: {
      objectives: "An engaging workshop on digital marketing trends for 2023.",
      highlights: (
        <ul className="list-disc list-inside space-y-1 p-2">
          <li>Networking opportunities with industry professionals.</li>
          <li>Workshops on resume building and interview preparation.</li>
          <li>Panel discussions featuring successful alumni.</li>
        </ul>
      ),
      gallery: [],
    },
  },
];

export default Events;
