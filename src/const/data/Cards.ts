import { Riyad, Rasheed, Haulath } from '@/assets/images/faculties';
import { Rashid } from '@/assets/images/interns';

interface Card {
    id: number,
    name: string,
    role: string,
    office: string,
    image: string,
    content: string
}

const Cards: Card[] = [
    {
        id: 1,
        name: 'Dr.Riyad',
        role: 'Professor & Principal of EMEA College',
        office: 'Department of Computer Science',
        image: Riyad,
        content: `“Connect” is a game-changer. It's the perfect blend of practical, hands-on learning and genuine inspiration. The focus is not just on writing code, but on understanding how to innovate, team-up, build and even get it to market. The mentorship and support for students are invaluable. For anyone looking to go beyond the classroom and into the world of innovation, “Connect” is the place to be.`
    },
    {
        id: 3,
        name: 'Haulath k',
        role: 'Assistant Professor ',
        office: 'Department of Computer Science',
        image: Haulath,
        content: 'I am truly inspired by the enthusiasm and dedication of this student community. May your passion for learning and collaboration continue to guide you toward success and new achievements'
    },
    {
        id: 2,
        name: 'Captain Abdul Rasheed P',
        role: 'Assistant Professor',
        office: 'Department of English',
        image: Rasheed,
        content: 'CONNECT is a vibrant student-led community at EMEA College that nurtures peer learning through training, boot camps on emerging technologies, and professional skill development. It is a futuristic space where collaboration and student initiative create truly magical results. I wholeheartedly wish them great success.'
    },

    {
        id: 4,
        name: 'Rashid ',
        role: 'Alumni & Senior Intern',
        office: 'Department of Computer Science',
        image: Rashid,
        content: `Connect has made a huge impact on my life, both professionally and personally. 
        It was like running a small startup in college. Every minute I spent in the community taught me more about the real world and industry than any classroom ever could. It kept me updated, opened doors to real opportunities, and gave me experiences I’ll never forget.`
    }

]

export default Cards;
