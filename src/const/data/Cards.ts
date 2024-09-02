import { Riyad, Rasheed } from '../../assets/images/faculties'

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
        name: 'Riyad Almubarak',
        role: 'Faculty Advisor',
        image: Riyad,
        content: 'Riyad is a faculty advisor for the Connect EMEA team. He is a professor at the University '
    },
    {
        id: 2,
        name: 'Rasheed Hussain',
        role: 'Faculty Advisor',
        image: Rasheed,
        content: 'Rasheed is a faculty advisor for the Connect EMEA team. He is a professor at the University  '
    }
]

export default Cards;