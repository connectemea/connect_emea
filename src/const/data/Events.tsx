import { Event } from "@/types/eventsTypes";
import {
  LearningStation,
  Discord_session,
  UntoldStories01,
  UntoldStories02,
  UntoldStories03,
  BuildEMEA,
  BuildEMEA_QNA,
  BuildEMEA_github,
  buildemea_exclusive,
  buildemea_onbording,
  buildemea_web,
  LinkednandResume,
  ResumeBuilding,
  LevelUp01,
  LevelUp02,
  DigitalMarketing,
  ChitChat01,
  ChitChat02,
  ChitChat03,
  Shehike02,
  Shehike01,
  BootCamp2022,
  BootCamp2023,
  Reconnect,
  InternHiring,
  Intern_hiring05,
  OpenMic01
} from "@/assets/images/Events";

const Events: Event[] = [
  {
    id: 1,
    title: "Learning Station",
    date: "25/09/2024",
    time: "2:30 PM",
    location: "Seminar Hall",
    description:
      "An interactive event where skilled students share their knowledge about various career paths and industries, helping their peers discover new professional opportunities.",
    image: LearningStation,
    link: "",
    big_description:
      "Learning Station is an event where skilled and experienced students introduce their peers to diverse career paths and industries. The event aims to inspire students to explore opportunities they may not have considered and provide practical advice on navigating their future careers.",
    about: {
      objectives:
        "Learning Station aims to empower students by providing peer-led sessions that showcase different career paths and industries. Skilled students share their experiences and knowledge, giving their fellow students practical guidance and motivation for future career planning.",
      highlights: (
        <ul className="list-disc list-inside space-y-1 p-2">
          <li>
            Peer-led sessions where skilled students share their insights and
            experiences.
          </li>
          <li>
            Hands-on workshops on resume building and interview preparation by
            students.
          </li>
          <li>
            Interactive discussions about emerging career paths and industry
            trends.
          </li>
          <li>
            Networking opportunities with fellow students who have industry
            experience.
          </li>
          <li>
            Q&A sessions where students can engage with their skilled peers
            directly.
          </li>
        </ul>
      ),
      gallery: [],
    },
  },
  {
    id: 2,
    title: "Reconnect",
    date: "23/07/2024",
    time: "9:30 AM",
    location: "Innovation and Incubation Center",
    description:
      "An engaging event to reconnect interns with the community, strengthen team bonds, and enhance creative and strategic skills through interactive projects and networking.",
    image: Reconnect,
    link: "",
    big_description:
      "Re-Meet is a unique event designed to bring interns back into the fold of the community, fostering stronger connections and team spirit. Through interactive activities and networking opportunities, interns will refine their basic and creative skills, work in teams on fun and strategic projects, and contribute to a collaborative future.",
    about: {
      objectives:
        "Re-Meet is all about reconnecting interns with the community and enhancing their teamwork and creativity. Through collaborative projects, participants will build bonds, sharpen their skills, and come up with creative campaigns. The event fosters teamwork, strategic thinking, and leadership as interns work on real-world challenges.",
      highlights: (
        <ul className="list-disc list-inside space-y-1 p-2">
          <li>
            Reconnecting with fellow interns to improve team spirit and
            collaboration.
          </li>
          <li>
            Creative workshops and engaging team-based activities that enhance
            strategic and creative thinking.
          </li>
          <li>
            A meme campaign challenge where teams develop creative assets
            (posters, videos, carousels, etc.) based on a theme.
          </li>
          <li>
            Teams compete by posting their campaigns on social media, with a
            poll determining the winner.
          </li>
          <li>
            Day 2 focuses on group planning for orientation, campaigning, and
            future intern hiring strategies.
          </li>
        </ul>
      ),
      gallery: [],
    },
  },
  {
    id: 3,
    title: "Internship Insights: Opening Doors",
    date: "09/11/2022",
    time: "1:00 PM",
    location: "Innovation and Incubation Center",
    description:
      "Join us for an insightful panel discussion with leading tech pioneers on the future of AI and the role of internships in shaping your career.",
    image: InternHiring,
    link: "",
    big_description:
      "Dive into the world of artificial intelligence with industry leaders who will share their experiences and insights on how internships can be a gateway to career success. This session will cover the latest trends in AI, the skills that matter, and how to leverage internships for future opportunities.",
    about: {
      objectives:
        "To explore the future of AI through the lens of internship experiences and career pathways.",
      highlights: (
        <ul className="list-disc list-inside space-y-1 p-2">
          <li>
            Engage with industry experts during a dynamic panel discussion.
          </li>
          <li>
            Discover valuable networking opportunities to connect with
            professionals.
          </li>
          <li>
            Participate in workshops focused on resume building and interview
            preparation.
          </li>
          <li>
            Gain insights from successful alumni about their career journeys.
          </li>
          <li>
            Learn how to position yourself for internships in the tech industry.
          </li>
        </ul>
      ),
      gallery: [],
    },
  },
  {
    id: 4,
    title: "Resume Building for Interns",
    date: "22/11/2023",
    time: "01:30 PM",
    location: "Seminar Hall",
    description:
      "A practical workshop designed to help interns craft standout resumes, optimize their LinkedIn profiles, and explore top job and internship platforms.",
    image: ResumeBuilding,
    link: "",
    big_description:
      "This resume-building workshop is specifically designed for new interns. It introduces key resume essentials, teaches how to optimize LinkedIn profiles, and guides participants through the most effective job and internship search platforms. The session provides interns with the tools they need to make a lasting impression on recruiters and navigate the competitive job market.",
    about: {
      objectives:
        "Equip interns with the knowledge and skills to build strong resumes, optimize their professional profiles, and effectively navigate job and internship opportunities.",
      highlights: (
        <ul className="list-disc list-inside space-y-1 p-2">
          <li>
            Step-by-step guidance on creating a professional and impactful
            resume.
          </li>
          <li>Tips on optimizing LinkedIn profiles for maximum visibility.</li>
          <li>Introduction to the best job and internship search platforms.</li>
          <li>
            Practical advice from experienced recruiters and career coaches.
          </li>
          <li>
            Opportunities to network with peers and gain feedback on resumes.
          </li>
        </ul>
      ),
      gallery: [],
    },
  },
  {
    id: 5,
    title: "Resume Building Workshop",
    date: "05/12/2023",
    time: "01:30 PM",
    location: "Seminar Hall",
    description:
      "Join us for a comprehensive workshop designed to equip students with the skills to create standout resumes and professional LinkedIn profiles.",
    image: LinkednandResume,
    link: "",
    big_description:
      "Elevate your professional presence with our hands-on resume building workshop. Learn how to effectively showcase your skills, experiences, and achievements to stand out to potential employers. This session will also cover the essentials of creating a compelling LinkedIn profile that attracts recruiters and enhances your job search.",
    about: {
      objectives:
        "To empower students with the tools and knowledge to build impactful resumes and LinkedIn profiles.",
      highlights: (
        <ul className="list-disc list-inside space-y-1 p-2">
          <li>
            Engage in interactive workshops focusing on effective resume
            writing.
          </li>
          <li>Discover tips for creating an impressive LinkedIn profile.</li>
          <li>
            Network with industry professionals and gain valuable insights.
          </li>
          <li>
            Participate in discussions on interview preparation and job search
            strategies.
          </li>
          <li>
            Receive personalized feedback on your resume from experienced
            mentors.
          </li>
        </ul>
      ),
      gallery: [],
    },
  },
  {
    id: 6,
    title: "SheHike Talk Session 02",
    date: "01/12/2023",
    time: "10:00 AM",
    location: "Audio Visual Theatre",
    description:
      "SheHike is an exclusive talk session where selected female students from EMEA College share their experiences of balancing internships and academics to inspire and motivate their peers.",
    image: Shehike02,
    link: "",
    big_description:
      "Join us for a motivational talk session where our bright and driven female students share their personal journeys of managing internships alongside their studies. This event aims to inspire, connect, and empower students as they navigate both academic and professional landscapes.",
    about: {
      objectives:
        "The SheHike Talk Session celebrates the resilience and achievements of female students who have excelled both academically and professionally. It provides a platform for them to share their stories and offer advice, encouraging others to pursue similar paths.",
      highlights: (
        <ul className="list-disc list-inside space-y-1 p-2">
          <li>
            Exclusive session for female students to share their internship
            experiences.
          </li>
          <li>
            Inspiration and guidance for managing studies and professional work
            effectively.
          </li>
          <li>Networking with industry professionals and successful alumni.</li>
          <li>
            Workshops on resume building, interview preparation, and career
            growth strategies.
          </li>
          <li>
            Q&A sessions for students to interact directly with the speakers.
          </li>
        </ul>
      ),
      gallery: [],
    },
  },
  {
    id: 7,
    title: "Untold Stories",
    date: "26/02/2024",
    time: "10:00 AM",
    location: "Audio Visual Theatre",
    description:
      "Join us for the third chapter of 'Untold Stories,' featuring Usmanul Haffan, a karate expert and fashion influencer, as he shares his journey of overcoming challenges to pursue his passion.",
    image: UntoldStories03,
    link: "",
    big_description:
      "In this chapter of 'Untold Stories,' we welcome Usmanul Haffan, a renowned karate expert and fashion influencer. Usmanul will share the untold stories of his struggles, the perseverance it took to overcome obstacles, and how he turned his passion into a successful career. This session aims to inspire students to pursue their dreams, embrace their unique paths, and overcome any challenges that come their way.",
    about: {
      objectives:
        "To inspire students through the real-life journey of Usmanul Haffan, encouraging them to follow their passions, overcome obstacles, and embrace their individual paths to success.",
      highlights: (
        <ul className="list-disc list-inside space-y-1 p-2">
          <li>
            An inspiring talk by Usmanul Haffan, a karate expert and fashion
            influencer.
          </li>
          <li>
            Insights into the challenges and successes of building a personal
            brand.
          </li>
          <li>
            Inspiration for students to persevere through their own obstacles
            and pursue their passions.
          </li>
          <li>
            Opportunities for students to ask questions and engage with the
            speaker.
          </li>
          <li>
            Networking opportunities with peers and like-minded individuals.
          </li>
        </ul>
      ),
      gallery: [],
    },
  },
  {
    id: 8,
    title: "LevelUp: Digital Marketing Trends 2023",
    date: "22/12/2023",
    time: "7:30 PM",
    location: "Google Meet",
    description:
      "A hands-on workshop focused on the latest digital marketing trends and strategies that will shape 2023.",
    image: DigitalMarketing,
    link: "",
    big_description:
      "LevelUp is an engaging virtual workshop that delves into the most important digital marketing trends for 2023. Attendees will gain valuable insights into emerging strategies and tools to stay ahead in the fast-paced digital marketing world.",
    about: {
      objectives:
        "The primary goal of this workshop is to equip participants with knowledge of the latest digital marketing trends for 2023, providing actionable insights that can be implemented to stay competitive in the digital landscape.",
      highlights: (
        <ul className="list-disc list-inside space-y-1 p-2">
          <li>
            Deep dive into 2023's most impactful digital marketing trends.
          </li>
          <li>
            Hands-on learning with practical strategies and real-world
            applications.
          </li>
          <li>
            Opportunities for participants to share their experiences and ideas
            in breakout sessions.
          </li>
          <li>
            Interactive discussions on leveraging AI, social media, and SEO in
            marketing strategies.
          </li>
          <li>Networking with peers and digital marketing enthusiasts.</li>
        </ul>
      ),
      gallery: [],
    },
  },
  {
    id: 12,
    title: "SheHike Empowerment Talk Session",
    date: "04-01-2023",
    time: "10:00 AM",
    location: "Audio Visual Theatre",
    description:
      "Join us for the SheHike Empowerment Talk Session, an inspiring event where remarkable women in college share their personal stories of resilience, achievement, and empowerment.",
    image: Shehike01,
    link: "",
    big_description:
      "The SheHike Empowerment Talk Session is designed to uplift and inspire female students by showcasing the journeys of women who balance academic excellence with professional pursuits. This event provides a supportive platform for participants to gain valuable insights, foster connections, and explore opportunities for growth in their careers and studies.",
    about: {
      objectives:
        "This session aims to celebrate the accomplishments of female students, empowering them to pursue their goals with confidence. By sharing real-life experiences, we hope to encourage participants to embrace challenges and seek out opportunities for personal and professional development.",
      highlights: (
        <ul className="list-disc list-inside space-y-1 p-2">
          <li>
            Exclusive insights from female students sharing their internship
            journeys and professional experiences.
          </li>
          <li>
            Inspirational discussions on balancing academic commitments with
            career aspirations.
          </li>
          <li>
            Opportunities for networking with industry professionals and
            successful alumni.
          </li>
          <li>
            Practical workshops covering resume building, interview techniques,
            and strategies for career advancement.
          </li>
          <li>
            Engaging Q&A sessions, allowing participants to interact directly
            with our inspiring speakers.
          </li>
        </ul>
      ),
      gallery: [],
    },
  },
  {
    id: 13,
    title: "Untold Stories",
    date: "25/01/2023",
    time: "01:30 PM",
    location: "Audio Visual Theatre",
    description:
      "Untold Stories is one of Connect's most celebrated events, where students share their entrepreneurial journeys. Join us as Foodward Faiz, a successful food vlogger, reveals his path to success and the lessons learned along the way.",
    image: UntoldStories01,
    link: "",
    big_description:
      "Untold Stories is one of Connect's most celebrated events, where students share their entrepreneurial journeys. Experience an inspiring session with Foodward Faiz as he shares his story as a food vlogger, offering insights into his journey and the challenges he overcame to achieve success.",
    about: {
      objectives:
        "Untold Stories aims to inspire students through real-life success stories of fellow peers. This event provides a platform for students to connect, learn, and be motivated by the experiences of their contemporaries.",
      highlights: (
        <ul className="list-disc list-inside space-y-1 p-2">
          <li>
            An inspiring talk by Foodward Faiz, a renowned food vlogger, on
            building a personal brand in the digital age.
          </li>
          <li>
            Insightful discussions on the challenges of entrepreneurship and
            strategies for overcoming obstacles.
          </li>
          <li>
            Interactive Q&A session where students can engage with the speaker
            and gain personalized advice.
          </li>
          <li>
            Opportunities for networking with like-minded individuals and
            potential collaborators.
          </li>
          <li>
            Takeaway tips for students to harness their passions and transform
            them into successful ventures.
          </li>
        </ul>
      ),
      gallery: [],
    },
  },
  {
    id: 14,
    title: "Untold Stories",
    date: "26/02/2023",
    time: "02:30 PM",
    location: "Audio Visual Theatre",
    description:
      "Untold Stories is Connect's flagship event that celebrates the journeys of student entrepreneurs. Join us as Salmanul Faris, CEO & Founder of 'YAARA', shares his remarkable story of success and the lessons learned along the way.",
    image: UntoldStories02,
    link: "",
    big_description:
      "Untold Stories is Connect's flagship event, where student entrepreneurs take center stage to share their journeys. In this edition, Salmanul Faris, the visionary behind 'YAARA', will discuss his entrepreneurial path, the challenges he faced, and the strategies that led to his success. This is an unmissable opportunity for aspiring entrepreneurs to gain insight and inspiration.",
    about: {
      objectives:
        "The objective of Untold Stories is to empower students by sharing real-life experiences of success and resilience. This event aims to inspire future entrepreneurs to pursue their dreams and navigate the challenges of starting a business.",
      highlights: (
        <ul className="list-disc list-inside space-y-1 p-2">
          <li>
            A captivating talk by Salmanul Faris, delving into the journey of
            building 'YAARA' and establishing a personal brand.
          </li>
          <li>
            Engaging discussions about the ups and downs of entrepreneurship and
            how to overcome common hurdles.
          </li>
          <li>
            Interactive Q&A session, providing students with the chance to ask
            questions and receive tailored advice from the speaker.
          </li>
          <li>
            Networking opportunities to connect with peers, industry
            professionals, and potential collaborators.
          </li>
          <li>
            Practical tips and strategies for harnessing personal passions into
            successful entrepreneurial ventures.
          </li>
        </ul>
      ),
      gallery: [],
    },
  },
  {
    id: 15,
    title: "BuildEMEA",
    date: "12/12/2023",
    time: "1 month",
    location: "Online Event",
    description:
      "BuildEMEA is a premier tech event at EMEA College, featuring a 30-day coding challenge where over 20 teams created 6 innovative projects. It offers beginners the chance to work on real-world projects under the guidance of experienced mentors.",
    image: BuildEMEA,
    link: "",
    big_description:
      "Join BuildEMEA, the largest tech event at EMEA College, a 30-day coding challenge with 20+ teams building 6 projects. Gain hands-on experience and mentorship from industry experts.",
    about: {
      objectives:
        "BuildEMEA aims to empower participants with practical coding skills and project experience through collaboration and mentorship.",
      highlights: (
        <ul className="list-disc list-inside space-y-1 p-2">
          <li>
            Connect with peers and industry professionals to enhance your
            network.
          </li>
          <li>Collaborate on diverse projects to boost your coding skills.</li>
          <li>
            Receive mentorship from experienced developers and tech leaders.
          </li>
        </ul>
      ),
      gallery: [],
    },
  },
  {
    id: 16,
    title: "BuildEMEA Onboarding Session",
    date: "12/12/2023",
    time: "8:00 PM",
    location: "Google Meet",
    description:
      "Join us for the BuildEMEA Onboarding Session, where participants will receive essential information and guidance to kickstart their journey in the BuildEMEA event.",
    image: buildemea_onbording,
    link: "",
    big_description:
      "The BuildEMEA Onboarding Session is designed to welcome participants and provide them with a comprehensive orientation about the upcoming BuildEMEA event. This session will cover key details, expectations, and how to maximize your experience during the event. Don't miss this opportunity to connect with fellow participants and gain valuable insights!",
    about: {
      objectives:
        "To introduce participants to the BuildEMEA event, outline the schedule, and clarify roles and expectations to ensure a smooth and enriching experience for everyone involved.",
      highlights: (
        <ul className="list-disc list-inside space-y-1 p-2">
          <li>
            Welcome remarks and introductions to set a positive tone for the
            event.
          </li>
          <li>
            Overview of the BuildEMEA schedule, including key sessions and
            activities.
          </li>
          <li>
            Guidance on how to engage effectively with peers and mentors during
            the event.
          </li>
          <li>
            Tips for maximizing participation and making the most out of the
            BuildEMEA experience.
          </li>
          <li>
            Q&A session to address any questions or concerns participants may
            have.
          </li>
        </ul>
      ),
      gallery: [],
    },
  },
  {
    id: 17,
    title: "BuildEMEA Interactive Q&A Session",
    date: "09/12/2023",
    time: "8:00 PM",
    location: "Google Meet",
    description:
      "Join us for the BuildEMEA Interactive Q&A Session, where participants will have the opportunity to engage directly with organizers and mentors. This session is designed to clarify any doubts and provide insights into the event.",
    image: BuildEMEA_QNA,
    link: "",
    big_description:
      "The BuildEMEA Interactive Q&A Session is a unique opportunity for participants to connect with the event's organizers and mentors. This interactive forum will allow you to ask questions, seek clarifications, and gain deeper insights into the event's structure and expectations. Don’t miss this chance to engage and prepare yourself for an enriching experience!",
    about: {
      objectives:
        "To foster an open dialogue between participants and organizers, ensuring all queries are addressed and participants feel confident and informed leading up to the BuildEMEA event.",
      highlights: (
        <ul className="list-disc list-inside space-y-1 p-2">
          <li>
            Direct interaction with organizers and mentors to discuss event
            details and expectations.
          </li>
          <li>
            A platform for participants to ask questions and seek clarifications
            on any aspect of the event.
          </li>
          <li>
            Insightful tips and advice from experienced mentors to help
            participants navigate the event successfully.
          </li>
          <li>
            Encouragement of peer networking, allowing participants to connect
            with each other before the event.
          </li>
          <li>
            Resources and materials shared during the session to assist
            participants in their preparation.
          </li>
        </ul>
      ),
      gallery: [],
    },
  },
  {
    id: 18,
    title: "BuildEMEA: Git & GitHub Essentials",
    date: "13/12/2023",
    time: "8:00 PM",
    location: "Google Meet",
    description:
      "Join us for an engaging and interactive introductory session on Git and GitHub, where you'll learn the fundamentals of version control and collaborative coding.",
    image: BuildEMEA_github,
    link: "",
    big_description:
      "This session will provide a comprehensive introduction to Git and GitHub, essential tools for modern software development. Participants will explore key concepts such as version control, branching, and collaboration, all in an interactive format that encourages questions and hands-on learning. Whether you're new to coding or looking to enhance your skills, this session is designed for you!",
    about: {
      objectives:
        "To equip participants with a foundational understanding of Git and GitHub, enabling them to effectively manage code versions and collaborate with others in their projects.",
      highlights: (
        <ul className="list-disc list-inside space-y-1 p-2">
          <li>
            Explore the fundamentals of Git and its role in version control.
          </li>
          <li>
            Understand how GitHub facilitates collaboration in coding projects.
          </li>
          <li>
            Hands-on demonstrations of key commands and workflows for effective
            use of Git and GitHub.
          </li>
          <li>
            Opportunity for participants to ask questions and clarify concepts
            in real-time.
          </li>
          <li>
            Resources provided for further learning and practice after the
            session.
          </li>
        </ul>
      ),
      gallery: [],
    },
  },
  {
    id: 19,
    title: "BuildEMEA: Introduction to Web Development",
    date: "14/12/2023",
    time: "8:00 PM",
    location: "Google Meet",
    description:
      "Dive into the world of web development with this interactive session designed specifically for beginners. Learn the essential skills to start building your own websites from scratch!",
    image: buildemea_web,
    link: "",
    big_description:
      "This introductory web development session will guide participants through the fundamental concepts of web development, including HTML, CSS, and JavaScript. Whether you're looking to launch your first project or gain a better understanding of how websites work, this session will provide you with the foundational knowledge and resources to get started.",
    about: {
      objectives:
        "To provide beginners with a solid foundation in web development concepts, empowering them to create simple web applications and understand the basics of frontend development.",
      highlights: (
        <ul className="list-disc list-inside space-y-1 p-2">
          <li>
            Understand the key components of web development: HTML, CSS, and
            JavaScript.
          </li>
          <li>Learn how to set up a simple web project from scratch.</li>
          <li>
            Engage in hands-on activities to reinforce learning through
            practical examples.
          </li>
          <li>
            Participate in an interactive Q&A session to address any questions
            or concerns.
          </li>
          <li>
            Receive additional resources for continued learning and development
            beyond the session.
          </li>
        </ul>
      ),
      gallery: [],
    },
  },
  {
    id: 20,
    title: "BuildEMEA: Introduction to Backend Development",
    date: "06/01/2024",
    time: "7:30 PM",
    location: "Google Meet",
    description:
      "Join us for an engaging session on the fundamentals of backend development. Discover the key concepts and technologies that power the server-side of applications!",
    image: buildemea_exclusive,
    link: "",
    big_description:
      "This interactive session will introduce participants to the basics of backend development, covering essential topics such as server architecture, databases, and API creation. Whether you're interested in pursuing a career in development or simply want to understand how the backend of applications works, this session will provide you with the foundational knowledge needed to get started.",
    about: {
      objectives:
        "To equip participants with a foundational understanding of backend development, focusing on core concepts and technologies that are essential for building server-side applications.",
      highlights: (
        <ul className="list-disc list-inside space-y-1 p-2">
          <li>
            Gain insights into server architecture and the role of backend
            development in application performance.
          </li>
          <li>
            Explore popular backend technologies and frameworks used in the
            industry.
          </li>
          <li>
            Learn about databases, data storage, and how to interact with them
            through APIs.
          </li>
          <li>
            Participate in interactive discussions and Q&A sessions to clarify
            concepts and address questions.
          </li>
          <li>
            Access additional resources and guidance for further exploration in
            backend development.
          </li>
        </ul>
      ),
      gallery: [],
    },
  },
  {
    id: 21,
    title: "ChitChat: Insights from an Academic Topper",
    date: "24/01/2024",
    time: "8:00 PM",
    location: "Google Meet",
    description:
      "Join us for the second chapter of ChitChat, a series of fun and interactive sessions on Discord. This episode features Kadeejathul Mubashira, who will share her inspiring journey as an academic topper and provide valuable insights into effective study strategies.",
    image: ChitChat02,
    link: "",
    big_description:
      "ChitChat is a vibrant series of interactive sessions designed to engage participants in lively discussions. In this second chapter, we have the pleasure of hosting Kadeejathul Mubashira, an academic achiever known for her excellence. She will share her experiences, challenges, and the study techniques that helped her excel. Participants will have the opportunity to ask questions and gain practical advice to enhance their own academic journeys.",
    about: {
      objectives:
        "To provide participants with insights into effective study strategies and inspire them through the experiences of successful individuals like Kadeejathul Mubashira.",
      highlights: (
        <ul className="list-disc list-inside space-y-1 p-2">
          <li>
            Engage in an interactive conversation with Kadeejathul Mubashira
            about her academic success.
          </li>
          <li>
            Learn practical study tips and strategies that can help improve
            academic performance.
          </li>
          <li>
            Participate in a Q&A session to address any questions and gain
            personalized advice.
          </li>
          <li>
            Network with fellow participants and share experiences in a
            supportive environment.
          </li>
        </ul>
      ),
      gallery: [],
    },
  },
  {
    id: 22,
    title: "ChitChat: Experiences from the WIT Meetup",
    date: "24/11/2023",
    time: "8:00 PM",
    location: "Discord",
    description:
      "Join us for the inaugural chapter of ChitChat, a series of engaging and interactive Discord sessions. In this episode, Sibna and Shifna will share their experiences attending the WIT meetup at Tinkerspace, discussing key takeaways and insights gained from the event.",
    image: ChitChat01,
    link: "",
    big_description:
      "ChitChat is a lively series of interactive sessions aimed at fostering discussions and sharing experiences. This first chapter features Sibna and Shifna, who will recount their journey to the WIT meetup at Tinkerspace. They will delve into the highlights of the event, the inspiring speakers they encountered, and how it has influenced their perspectives. Participants are encouraged to join the conversation, ask questions, and share their own experiences in a supportive and fun environment.",
    about: {
      objectives:
        "To create a platform for sharing experiences and insights from the WIT meetup, encouraging participants to engage in meaningful discussions.",
      highlights: (
        <ul className="list-disc list-inside space-y-1 p-2">
          <li>
            Hear firsthand accounts from Sibna and Shifna about their
            experiences at the WIT meetup.
          </li>
          <li>
            Discover valuable insights and learnings that can inspire your own
            journey.
          </li>
          <li>
            Participate in a Q&A session to engage with the speakers and ask
            your burning questions.
          </li>
          <li>
            Network with fellow participants and share your own stories in a
            friendly atmosphere.
          </li>
        </ul>
      ),
      gallery: [],
    },
  },
  {
    id: 23,
    title: "ChitChat: Journey of a Developer with Mohammed Dilshad",
    date: "07/09/2024",
    time: "8:00 PM",
    location: "Google Meet",
    description:
      "Join us for the third chapter of ChitChat, a lively series of interactive sessions. This time, we have Mohammed Dilshad sharing his inspiring journey as a developer, including the challenges he faced and the milestones he achieved.",
    image: ChitChat03,
    link: "",
    big_description:
      "ChitChat is an engaging platform designed for sharing experiences and insights in a fun and interactive manner. In this third chapter, Mohammed Dilshad will take us through his unique journey as a developer. He will discuss key moments that shaped his career, the skills he acquired along the way, and the lessons learned from both successes and failures. Attendees will have the opportunity to engage in a dialogue, ask questions, and gain valuable insights from his experience.",
    about: {
      objectives:
        "To inspire participants by sharing Mohammed Dilshad's journey as a developer, while fostering a supportive environment for discussion and learning.",
      highlights: (
        <ul className="list-disc list-inside space-y-1 p-2">
          <li>
            Explore Mohammed's journey from a novice to an accomplished
            developer.
          </li>
          <li>
            Learn about the skills and technologies that played a pivotal role
            in his career.
          </li>
          <li>
            Participate in an interactive Q&A session to gain deeper insights
            and ask your questions.
          </li>
          <li>
            Network with fellow attendees and share your own experiences in a
            collaborative environment.
          </li>
        </ul>
      ),
      gallery: [],
    },
  },
  {
    id: 24,
    title: "Learn Discord through Among Us!",
    date: "12/08/23",
    time: "8:00 PM",
    location: "Discord",
    description:
      "Join us for a unique and entertaining way to learn the fundamentals of Discord! This interactive session will guide you through the basics of using Discord while playing Among Us with fellow participants.",
    image: Discord_session,
    link: "",
    big_description:
      "Discover the exciting world of Discord in a fun and engaging manner! In this session, you'll learn how to navigate Discord, join channels, and communicate effectively, all while enjoying a game of Among Us. Whether you're new to Discord or looking to sharpen your skills, this session offers a relaxed environment to learn and play together with friends and fellow gamers.",
    about: {
      objectives:
        "To introduce participants to the fundamentals of Discord, fostering familiarity and confidence through an interactive gaming experience.",
      highlights: (
        <ul className="list-disc list-inside space-y-1 p-2">
          <li>
            Learn how to set up and use Discord effectively while playing Among
            Us.
          </li>
          <li>
            Engage in a fun, interactive game that promotes teamwork and
            communication.
          </li>
          <li>
            Ask questions and receive tips on navigating Discord and its
            features.
          </li>
          <li>
            Meet new friends and connect with fellow gamers in a relaxed
            atmosphere.
          </li>
        </ul>
      ),
      gallery: [],
    },
  },
  {
    id: 25,
    title: "2022 Intern Welcome Boot Camp",
    date: "16/12/2022",
    time: "10:00 AM",
    location: "Seminar Hall",
    description:
      "Join us for the 2022 Intern Welcome Boot Camp, an engaging and interactive event designed to welcome new interns and provide them with a comprehensive orientation on our Connect platform.",
    image: BootCamp2022,
    link: "",
    big_description:
      "The 2022 Intern Welcome Boot Camp is an exciting opportunity for new interns to get acquainted with our organization and its culture. Through a series of interactive activities and presentations, interns will learn about the Connect platform, gain insights into their roles, and build connections with their peers and mentors.",
    about: {
      objectives:
        "This event aims to create a welcoming environment for the 2022 interns, ensuring they feel supported and informed as they embark on their journey with us. Participants will leave with a clear understanding of the Connect platform and the resources available to them.",
      highlights: (
        <ul className="list-disc list-inside space-y-1 p-2">
          <li>
            Interactive sessions to familiarize interns with the Connect
            platform and its features.
          </li>
          <li>
            Networking opportunities to meet fellow interns and key team
            members.
          </li>
          <li>
            Engaging activities designed to foster team building and
            collaboration.
          </li>
          <li>
            Insights from past interns sharing their experiences and tips for
            success.
          </li>
        </ul>
      ),
      gallery: [],
    },
  },
  {
    id: 26,
    title: "2023 Intern Welcome Boot Camp",
    date: "06/11/2023",
    time: "10:00 AM",
    location: "Seminar Hall",
    description:
      "Join us for the 2023 Intern Welcome Boot Camp, an engaging and interactive event designed to welcome new interns and provide them with essential orientation on the Connect platform.",
    image: BootCamp2023,
    link: "",
    big_description:
      "The 2023 Intern Welcome Boot Camp is a vibrant and interactive experience tailored for new interns. This event will familiarize participants with our organization, its culture, and the Connect platform. Through a series of fun activities, presentations, and networking opportunities, interns will gain valuable insights and make lasting connections with their peers and mentors.",
    about: {
      objectives:
        "This event aims to create a supportive environment for the 2023 interns, ensuring they feel informed and excited about their new roles. Participants will learn about the Connect platform and the resources available to them as they embark on their journey.",
      highlights: (
        <ul className="list-disc list-inside space-y-1 p-2">
          <li>
            Interactive sessions to explore the features of the Connect platform
            and how to make the most of it.
          </li>
          <li>
            Networking opportunities to meet fellow interns and key team members
            in a relaxed setting.
          </li>
          <li>
            Engaging activities focused on team building and collaboration,
            fostering strong relationships from the start.
          </li>
          <li>
            Insights and tips from previous interns who will share their
            experiences and best practices for success.
          </li>
        </ul>
      ),
      gallery: [],
    },
  },
  {
    id: 27,
    title: "Level Up: Enhance Your Digital Marketing Skills",
    date: "22/12/2023",
    time: "07:30 PM",
    location: "Google Meet",
    description:
      "Join us for Chapter 02 of the Level-Up series, where you'll sharpen your digital marketing skills through interactive sessions and expert insights.",
    image: LevelUp02,
    link: "",
    big_description:
      "Level-Up is an ongoing series dedicated to skill development. In Chapter 02, we focus on enhancing your digital marketing abilities. This session will cover essential topics such as social media strategies, content creation, SEO basics, and more, providing you with the tools you need to succeed in the digital landscape.",
    about: {
      objectives:
        "The objective of the Level-Up series is to empower participants with practical skills and knowledge in various domains. Chapter 02 aims specifically to elevate your understanding of digital marketing, equipping you with actionable strategies to implement in real-world scenarios.",
      highlights: (
        <ul className="list-disc list-inside space-y-1 p-2">
          <li>
            Interactive workshops led by industry experts, focusing on the
            latest trends in digital marketing.
          </li>
          <li>
            Hands-on activities to apply new concepts in real-time, fostering
            practical learning experiences.
          </li>
          <li>
            Networking opportunities with peers and professionals, allowing you
            to build valuable connections in the industry.
          </li>
          <li>
            Q&A sessions to address your specific questions and challenges in
            digital marketing.
          </li>
        </ul>
      ),
      gallery: [],
    },
  },
  {
    id: 27,
    title: "Level Up: Mastering Content Writing",
    date: "27/01/2023",
    time: "08:00 PM",
    location: "Google Meet",
    description:
      "Join us for Chapter 01 of the Level-Up series, where we dive into the essential skills and strategies of effective content writing.",
    image: LevelUp01,
    link: "",
    big_description:
      "Level-Up is a series of interactive skill development sessions designed to enhance your professional abilities. In Chapter 01, we will explore the fundamentals of content writing, covering key topics such as crafting compelling narratives, understanding audience engagement, and optimizing content for SEO. Whether you're a beginner or looking to refine your skills, this session is perfect for anyone interested in the art of writing.",
    about: {
      objectives:
        "The objective of this session is to provide participants with a comprehensive understanding of content writing principles, enabling them to create engaging and effective written material for various platforms.",
      highlights: (
        <ul className="list-disc list-inside space-y-1 p-2">
          <li>
            Insightful discussions on the importance of storytelling and tone in
            content writing.
          </li>
          <li>
            Practical exercises to develop your writing style and enhance
            clarity and coherence.
          </li>
          <li>
            Tips and techniques for researching topics and creating
            well-informed content.
          </li>
          <li>
            Strategies for optimizing your writing for search engines and
            improving visibility.
          </li>
          <li>
            Q&A session to address your writing challenges and get personalized
            feedback.
          </li>
        </ul>
      ),
      gallery: [],
    },
  },
  {
    id: 28,
    title: "Interns Hiring 2024",
    date: "15/10/2024",
    location: "",
    time: "",
    description:
      "Join us for a month-long internship hiring process designed to select the most qualified students to become part of our dynamic team!",
    image: Intern_hiring05,
    link: "https://connectemea.in/join",
    big_description:
      "Join us for a month-long internship hiring process designed to select the most qualified students to become part of our dynamic team! This is your chance to gain valuable experience and connect with industry professionals.",
    about: {
      objectives:
        "We seek passionate students eager for community engagement and personal growth.",
      highlights: (
        <ul className="list-disc list-inside space-y-1 p-2">
          <li>Engaging discussions on impactful content creation.</li>
          <li>Hands-on writing exercises to enhance clarity.</li>
          <li>Research techniques for producing quality content.</li>
          <li>SEO strategies to boost online visibility.</li>
          <li>Interactive Q&A sessions for personalized guidance.</li>
        </ul>
      ),
      gallery: [],
    },
  },
  {
    id: 29,
    title: "Open Mic: Empowering Voices of Women in Tech",
    date: "27/09/2024",
    time: "08:00 PM",
    location: "Google Meet",
    description:
      "🌟 Calling all incredible women eager to share, connect, and inspire! 🌟\n\nTinkerHub invites you to **Open Mic** — a vibrant platform dedicated to celebrating women in tech and beyond. This weekly discussion series is designed for everyone, from beginners to seasoned professionals, to share their ideas, experiences, and stories in a supportive and uplifting environment.",
    image: OpenMic01,
    link: "",
    big_description:
      "Join us for Open Mic, where we provide a welcoming space to express your thoughts and connect with like-minded women. Each session encourages open dialogue about the challenges and triumphs in our journeys through tech and other fields. Let's empower each other, share insights, and foster a community where every voice matters.",
    about: {
      objectives:
        "To create an inclusive community where women can connect, collaborate, and amplify their voices from the comfort of their own spaces. Don’t miss this opportunity to learn, grow, and build lasting connections.",
      highlights: (
        <ul className="list-disc list-inside space-y-1 p-2">
          <li>
            Engaging discussions on personal experiences and challenges faced by
            women in various industries.
          </li>
          <li>
            Opportunities for networking and building relationships with fellow
            women in tech.
          </li>
          <li>
            Sharing valuable resources and strategies for career growth and
            empowerment.
          </li>
          <li>
            An open floor for participants to present their projects, ideas, or
            simply share their stories.
          </li>
        </ul>
      ),
      gallery: [],
    },
  },
];

export default Events;
