import React from 'react'
import img from '../../../../assets/avatars/About1.png'

function Mission() {
    return (
        <div className='flex justify-between'>
            <div className='w-1/2 flex items-center justify-center'>
                <img src={img} alt='about' className='w-auto max-w-[300px] mx-auto'/>
            </div>
            <div className='w-1/2'>
                <h1 className='text-left text-orange-500 font-semibold text-xl'>Mission</h1>
                <p>
                    Connect tries to nourish the latent talents and creative abilities of students by providing a platform to learn emerging skill sets and equip them to be the faces of the future. The initiative imbibes leadership quality, eloquence and entrepreneurship skills, encouraging peer-to-peer learning and provides internship programs. By organizing talks, fests, job fairs, hackathons, workshops and webinars, Connect aims at creating a focused platform to hasten
                </p>
            </div>
        </div>
    )
}

export default Mission
