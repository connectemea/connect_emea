export interface Intern {
    id: number;
    name: string;
    role: string;
    position: string;
    image: string | null;
    email: string;
    phone: string;
    status: string;
    place: string;
    social: {
        linkedin: string;
        github: string;
        instagram: string;
    };
}

