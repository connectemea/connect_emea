import { Afeef, Aseel } from '../../assets/images/founders'
import { Shamil } from '../../assets/images/interns'


const Founder = [
    {
        id: 1,
        name: 'Mohammed Afeef',
        role: 'Co-Founder',
        image: Afeef,
        social: {
            linkedin: 'https://www.linkedin.com/in/mohammed-afeef/',
            github: 'https://www.github.com/mohammedafeef',
            instagram: 'https://www.instagram.com/mohammedafeef'
        },

    },
    {
        id: 2,
        name: 'Aseel Alzahrani',
        role: 'Co-Founder',
        image: Aseel,
        social: {
            linkedin: 'https://www.linkedin.com/in/aseel-alzahrani/',
            github: 'https://www.github.com/aseelalzahrani',
            instagram: 'https://www.instagram.com/aseelalzahrani'
        },
    }

]


const Interns = [
    {
        id: 1,
        name: 'Shamil Almubarak',
        role: 'Intern',
        image: Shamil,
        social: {
            linkedin: 'https://www.linkedin.com/in/shamil-almubarak/',
            github: 'https://www.github.com/shamilalmubarak',
            instagram: 'https://www.instagram.com/shamilalmubarak'
        },
    }
]


export const Teams = { Founder, Interns }