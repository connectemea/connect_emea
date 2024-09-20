import { Riyad, Rasheed } from '@/assets/images/faculties';
import { Rashid, Saleel } from '@/assets/images/interns';

interface Card {
    id: number,
    name: string,
    role: string,
    image: string,
    content: string
}

const Cards: Card[] = [
    {
        id: 1,
        name: 'Riyad',
        role: 'Principal',
        image: Riyad,
        content: 'Riyad Almubarak is the Principal and a leading figure in the Connect EMEA team. As a professor at the University, he brings a wealth of knowledge and experience to the table.'
    },
    {
        id: 2,
        name: 'Rasheed ',
        role: 'Faculty Advisor',
        image: Rasheed,
        content: 'Rasheed Hussain serves as a Faculty Advisor for Connect EMEA. His role as a professor at the University enhances the academic direction and support for the team.'
    },
    {
        id: 3,
        name: 'Rashid ',
        role: 'Senior Intern',
        image: Rashid,
        content: 'Rashid Khan is a Senior Intern who plays a crucial role in the Connect EMEA team. His dedication and expertise contribute significantly to the success of our projects.'
    },
    {
        id: 4,
        name: 'Saleel',
        role: 'Junior Intern',
        image: Saleel,
        content: 'Saleel Ahmed is a Junior Intern who actively supports the Connect EMEA team. His enthusiasm and skills help drive the team’s initiatives forward.'
    }
]

export default Cards;
