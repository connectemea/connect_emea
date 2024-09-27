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
    Sunain,
    Nasrin,
    Anshif,
    Muhsina
} from '@/assets/images/interns'

const roles: { [key: number]: string } = {
    0: 'Community enthusiast',
    1: 'Community enthusiast',
    2: 'Graphic Designer',
    3: 'Developer',
    4: 'Community Manager',
    5: 'Content Writer',
    6: 'Media'
    
};

const positions: { [key: number]: string } = {
    0: 'Co-creator',
    1: 'Intern',
    2: 'CTO & TinkerHub Lead',
    3: 'CEO',
    4: 'CMO',
    5: 'Convener',
    6: 'SheHike Lead',
    7: 'TinkerHub Outreach Lead',
    8: 'TinkerHub Co-Lead',
    9: 'TinkerHub Wit-lead',
};

const FoundersData: Intern[] = [
    {
        id: 1,
        name: 'Salman Faris',
        role: roles[0],
        position: positions[0],
        image: Salman,
        social: {
            linkedin: 'https://www.linkedin.com/in/salmanulfariscc/',
            github: 'https://github.com/SALMANULFARISCC',
            instagram: 'https://www.instagram.com/salman__fari/'
        },

    },
    {
        id: 2,
        name: 'Mohammed Afeef',
        role: roles[1],
        position: positions[0],
        image: Afeef,
        social: {
            linkedin: 'https://www.linkedin.com/in/mohammedafeef/',
            github: 'https://github.com/mohammedafeef',
            instagram: 'https://www.instagram.com/afeefev'
        },
    },
    {
        id: 3,
        name: 'Nahyan Sharvin',
        role: roles[1],
        position: positions[0],
        image: Nahyan,
        social: {
            linkedin: 'https://www.linkedin.com/in/nahyansharvin',
            github: 'https://github.com/nahyansharvin',
            instagram: 'https://www.instagram.com/_nhyn.__'
        },
    },
    {
        id: 4,
        name: 'Aseel KP',
        role: roles[1],
        position: positions[0],
        image: Aseel,
        social: {
            linkedin: 'https://www.linkedin.com/in/aseelkp/',
            github: 'https://github.com/aseelkp',
            instagram: 'https://www.instagram.com/aseelkp/'
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
            linkedin: 'https://www.linkedin.com/in/muhammed-saleel-cp-84064524b',
            github: 'https://github.com/Saleel10',
            instagram: 'https://www.instagram.com/saleel_gds?igsh=Z2EzYWRhenZqZnd0'
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
            github: 'https://github.com/muhammedshamil8',
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
            linkedin: 'https://www.linkedin.com/in/shifna-shirin-9654b2255',
            github: 'https://github.com/shifnashirin',
            instagram: 'https://www.instagram.com/shifnafasil?igsh=bTVhZnB6Z2d1YjZt&utm_source=qr'
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
            github: 'https://github.com/Sibna-sherin',
            instagram: 'https://www.instagram.com/_sibna_?igsh=Mjk1OWVkandmOGY4'
        },
    },
    {
        id: 5,
        name: 'Muhammed Rashid',
        role: roles[4],
        position: positions[3],
        image: Rashid,
        social: {
            linkedin: 'https://www.linkedin.com/in/muhammed-rashid-1044a8221/',
            github: 'https://github.com/Muhammed-Rashid-07',
            instagram: ''
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
            github: 'https://github.com/Abufabin',
            instagram: 'https://www.instagram.com/abufabin?igsh=Z3diaGhrdWlqZWRv'
        },
    },
  
    {
        id: 12,
        name: 'Muhammed Sunain',
        role: roles[4],
        position: positions[1],
        image: Sunain,
        social: {
            linkedin: 'https://www.linkedin.com/in/muhammed-sunain-287674259',
            github: 'https://github.com/MUHAMMED13690',
            instagram: 'https://www.instagram.com/_sunain_x2?igsh=MWdpd3J5Z2djMmVlNQ=='
        },
    },
    {
        id: 9,
        name: 'Amjad',
        role: roles[4],
        position: positions[1],
        image: Amjad,
        social: {
            linkedin: 'https://www.linkedin.com/in/amjxd-aj',
            github: 'https://github.com/amjxdaj',
            instagram: 'https://www.instagram.com/amjxd_aj'
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
            github: 'https://github.com/Jnnah11',
            instagram: 'https://www.instagram.com/j.nnah__?igsh=MXYwODF1dzkwNGM5Yg=='
        },
    },
    {
        id: 10,
        name: 'Fathima Rafeeda',
        role: roles[4],
        position: positions[1],
        image: Rafeeda,
        social: {
            linkedin: 'https://www.linkedin.com/in/fathima-rafeeda-a-87079023b',
            github: 'https://github.com/Rafeeda-rafee',
            instagram: 'https://www.instagram.com/_ra_fee?igsh=MWppaDYza2N2NXQwYg=='
        },
    },
    {
        id: 11,
        name: 'Dayyan Ali',
        role: roles[2],
        position: positions[7],
        image: Dayyan,
        social: {
            linkedin: 'https://www.linkedin.com/in/dayyan-ali',
            github: 'https://github.com/Dayyan404',
            instagram: 'https://www.instagram.com/dayyan._ali?igsh=MXdvbmw2OHFkNjhmdw=='
        },
    },

    {
        id: 8,
        name: 'Athif Noor',
        role: roles[4],
        position: positions[1],
        image: Athif,
        social: {
            linkedin: 'https://www.linkedin.com/in/athif-noor-ap-a879b4256',
            github: '',
            instagram: 'https://www.instagram.com/athif_noor_ap?igsh=OHQ0djI4d2Fwam1y'
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
            github: 'https://github.com/MariyamHanana',
            instagram: 'https://www.instagram.com/hanana_aa/'
        },
    },
    {
        id: 14,
        name: 'Fathima Marva',
        role: roles[4],
        position: positions[1],
        image: Marva,
        social: {
            linkedin: 'https://www.linkedin.com/in/marva-kt-4378a925b',
            github: 'https://github.com/marvakt',
            instagram: 'https://instagram.com/fathima__marva__?igshid=NmQ2ZmYxZjA='
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
            github: 'https://github.com/rizwnkt',
            instagram: 'https://www.instagram.com/rizwnkt/'
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
            github: '',
            instagram: ''
        }
    },
    {
        id: 15,
        name: 'Gayathri',
        role: roles[4],
        position: positions[1],
        image: Gayathri,
        social: {
            linkedin: 'https://www.linkedin.com/in/gayathri-p-95a63a261',
            github: '',
            instagram: 'https://www.instagram.com/h_.e_r._a?igsh=ZHlkYXdmOHhpbTNm'
        },
    },
    {
        id: 15,
        name: 'Muhsina',
        role: roles[4],
        position: positions[8],
        image: Muhsina,
        social: {
            linkedin: '',
            github: '',
            instagram: ''
        },
    },
    {
        id: 15,
        name: 'Anshif',
        role: roles[4],
        position: positions[8],
        image: Anshif,
        social: {
            linkedin: 'https://www.linkedin.com/in/muhammed-anshif-350703323/',
            github: '',
            instagram: 'https://www.instagram.com/anshhi._f'
        },
    },
    {
        id: 15,
        name: 'Fathima Nasrin',
        role: roles[4],
        position: positions[9],
        image: Nasrin,
        social: {
            linkedin: 'https://www.linkedin.com/in/fathima-nasrin-c-4202932a2/',
            github: 'https://github.com/Fathimanasrinc',
            instagram: 'https://www.instagram.com/ftmnasrinc?igsh=MTdxc3k1aHNxMDhoZg=='
        },
    },
   
]

const TeamsData = { FoundersData, InternsData }

export default TeamsData;