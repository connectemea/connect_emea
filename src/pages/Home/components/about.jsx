import React from 'react'

function About() {

    const cards = [
        {
            title: 'Involve',
            content: 'µLearn is a place for everyone. A place where one could involve and evolve the most. Be a part of our intriguing events like Inspiration  Radio, Lets Chill and make the most out of it.',
        },
        {
            title: 'Interact',
            content: 'An Interactive setting where each one of you could connect with folks and mentors having a remarkable mindset. Your involvements, and dedication to the community can even get you an internship opportunity.',
        },
        {
            title: 'Innovate',
            content: 'A place brimming with possibilities for innovation and astonishing creations. A perfect spot to display your works. Here you always advance and invent yourself!',
        },
    ]
    return (
        <div>
            <h1 className=' font-semibold text-2xl text-center'>
                Your journey of growth right at your campus!
            </h1>
            <p className='text-center max-w-[700px]  mx-auto'>
                orem ipsum dolor sit amet, consectetur adipiscing elit,
            </p>
            <div className='flex gap-4 mx-auto m-4 flex-wrap '>
                {cards.map((card, index) => (
                    <div className='border rounded-xl p-4 bg-slate-200 mx-auto max-w-[300px]' key={index} >
                        <h1 className='text-center font-semibold text-xl'>{card.title}</h1>
                        <p>{card.content}</p>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default About;
