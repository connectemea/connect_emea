// eventsTypes.ts
import { ReactNode } from 'react';

export interface Event {
    id: number;
    title: string;
    date: string;
    time: string;
    location: string;
    description: string;
    image: string;
    link: string;
    big_description: string;
    about: {
        objectives: string;
        highlights: ReactNode;
        gallery: string[];
    }
}
