import { Intern } from '@/types/internTypes';
import { Afeef, Aseel, Nahyan, Salman } from '@/assets/images/founders'
import {
    Amjad,
    Athif,
    Dayyan,
    Fabin,
    Gayathri,
    Hanana,
    Jannah,
    Marva,
    Rafeeda,
    Rashid,
    Rizwan,
    Saleel,
    Shahbana,
    Shamil,
    Shifna,
    Sibna,
    Sunain
} from '@/assets/images/interns'

const roles: { [key: number]: string } = {
    0: 'Community enthusiast',
    1: 'Community enthusiast',
    2: 'Graphic Designer',
    3: 'Developer',
    4: 'Community Manager',
    5: 'Content Writer',
    6: 'Videographer'
};

const positions: { [key: number]: string } = {
    0: 'Co-creator',
    1: 'Intern',
    2: 'CTO & TinkerHub Lead',
    3: 'CEO',
    4: 'COO',
    5: 'Convener',
    6: 'SheHike Lead',
    7: 'TinkerHub Outreach Lead',
    8: 'TinkerHub Co-Lead',

};

const FoundersData: Intern[] = [
    {
        id: 1,
        name: 'Salman Faris',
        role: roles[0],
        position: positions[0],
        image: Salman,
        social: {
            linkedin: 'https://www.linkedin.com/',
            github: 'https://www.github.com/',
            instagram: 'https://www.instagram.com/'
        },

    },
    {
        id: 2,
        name: 'Mohammed Afeef',
        role: roles[1],
        position: positions[0],
        image: Afeef,
        social: {
            linkedin: 'https://www.linkedin.com/',
            github: 'https://www.github.com/',
            instagram: 'https://www.instagram.com/'
        },
    },
    {
        id: 3,
        name: 'Nahyan Sharvin',
        role: roles[1],
        position: positions[0],
        image: Nahyan,
        social: {
            linkedin: 'https://www.linkedin.com/',
            github: 'https://www.github.com/',
            instagram: 'https://www.instagram.com/'
        },
    },
    {
        id: 4,
        name: 'Aseel KP',
        role: roles[1],
        position: positions[0],
        image: Aseel,
        social: {
            linkedin: 'https://www.linkedin.com/',
            github: 'https://www.github.com/',
            instagram: 'https://www.instagram.com/'
        },
    }

]

const InternsData: Intern[] = [
    {
        id: 1,
        name: 'Saleel',
        role: roles[2],
        position: positions[4],
        image: Saleel,
        social: {
            linkedin: 'https://www.linkedin.com/in/muhammed-saleel-cp-84064524b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
            github: 'https://www.github.com/',
            instagram: 'https://www.instagram.com/'
        },
    },
    {
        id: 2,
        name: 'Muhammed Shamil',
        role: roles[3],
        position: positions[2],
        image: Shamil,
        social: {
            linkedin: 'https://www.linkedin.com/in/shamil-kp-65878227a',
            github: 'https://www.github.com/',
            instagram: ''
        },
    },
    {
        id: 6,
        name: 'Shifna Shirin',
        role: roles[5],
        position: positions[6],
        image: Shifna,
        social: {
            linkedin: 'https://www.linkedin.com/in/shifna-shirin-9654b2255?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
            github: 'https://www.github.com/',
            instagram: 'https://www.instagram.com/'
        },
    },
   
    {
        id: 4,
        name: 'Sibna shirin',
        role: roles[5],
        position: positions[5],
        image: Sibna,
        social: {
            linkedin: 'http://www.linkedin.com/in/sibna-sherin',
            github: 'https://www.github.com/',
            instagram: 'https://www.instagram.com/'
        },
    },
    {
        id: 5,
        name: 'Muhammed Rashid',
        role: roles[4],
        position: positions[3],
        image: Rashid,
        social: {
            linkedin: 'https://www.linkedin.com/in/muhammed-rashid-1044a8221?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
            github: 'https://www.github.com/',
            instagram: 'https://www.instagram.com/'
        },
    },
    
    {
        id: 3,
        name: 'Fabin',
        role: roles[4],
        position: positions[1],
        image: Fabin,
        social: {
            linkedin: 'https://www.linkedin.com/in/fabin-fasif-0554042b7/',
            github: 'https://www.github.com/',
            instagram: 'https://www.instagram.com/'
        },
    },
  
    {
        id: 12,
        name: 'Muhammed Sunain',
        role: roles[4],
        position: positions[1],
        image: Sunain,
        social: {
            linkedin: 'https://www.linkedin.com/in/muhammed-sunain-287674259?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
            github: 'https://www.github.com/',
            instagram: 'https://www.instagram.com/'
        },
    },
    {
        id: 9,
        name: 'Amjad',
        role: roles[4],
        position: positions[1],
        image: Amjad,
        social: {
            linkedin: 'https://www.linkedin.com/in/amjxd-aj?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
            github: 'https://www.github.com/',
            instagram: 'https://www.instagram.com/'
        },
    },
    {
        id: 7,
        name: 'Fathima Jannah',
        role: roles[6],
        position: positions[1],
        image: Jannah,
        social: {
            linkedin: 'http://linkedin.com/in/fathima-jannah-88533a25b',
            github: 'https://www.github.com/',
            instagram: 'https://www.instagram.com/'
        },
    },
    {
        id: 10,
        name: 'Fathima Rafeeda',
        role: roles[4],
        position: positions[1],
        image: Rafeeda,
        social: {
            linkedin: 'https://www.linkedin.com/in/fathima-rafeeda-a-87079023b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
            github: 'https://www.github.com/',
            instagram: 'https://www.instagram.com/'
        },
    },
    {
        id: 11,
        name: 'Dayyan Ali',
        role: roles[2],
        position: positions[7],
        image: Dayyan,
        social: {
            linkedin: 'https://www.linkedin.com/in/dayyan-ali?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
            github: 'https://www.github.com/',
            instagram: 'https://www.instagram.com/'
        },
    },

    {
        id: 8,
        name: 'Athif Noor',
        role: roles[4],
        position: positions[1],
        image: Athif,
        social: {
            linkedin: 'https://www.linkedin.com/in/athif-noor-ap-a879b4256?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
            github: 'https://www.github.com/',
            instagram: 'https://www.instagram.com/'
        },
    },
    
    {
        id: 13,
        name: 'Maryam Hanana',
        role: roles[5],
        position: positions[1],
        image: Hanana,
        social: {
            linkedin: 'https://www.linkedin.com/in/mariyam-hanana-v-526a032b6/',
            github: 'https://www.github.com/',
            instagram: 'https://www.instagram.com/'
        },
    },
    {
        id: 14,
        name: 'Fathima Marva',
        role: roles[4],
        position: positions[1],
        image: Marva,
        social: {
            linkedin: 'https://www.linkedin.com/in/marva-kt-4378a925b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
            github: 'https://www.github.com/',
            instagram: 'https://www.instagram.com/'
        },
    },
    {
        id: 17,
        name: 'Mohammed Rizwan',
        role: roles[2],
        position: positions[1],
        image: Rizwan,
        social: {
            linkedin: 'https://www.linkedin.com/in/mohammed-rizwan-70662a232/',
            github: 'https://www.github.com/',
            instagram: 'https://www.instagram.com/'
        },
    },
    {
        id: 16,
        name: 'Shahbana Backer',
        role: roles[4],
        position: positions[1],
        image: Shahbana,
        social: {
            linkedin: 'https://www.linkedin.com/in/shahbana-backer-5537b5293/',
            github: 'https://www.github.com/',
            instagram: 'https://www.instagram.com/'
        }
    },
    {
        id: 15,
        name: 'Gayathri',
        role: roles[4],
        position: positions[1],
        image: Gayathri,
        social: {
            linkedin: 'https://www.linkedin.com/in/gayathri-p-95a63a261?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
            github: 'https://www.github.com/',
            instagram: 'https://www.instagram.com/'
        },
    },
   
]

const TeamsData = { FoundersData, InternsData }

export default TeamsData;