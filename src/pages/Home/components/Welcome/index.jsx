import React from 'react'
import Icon from '@/assets/avatars/welcome.png'
import { useNavigate } from 'react-router-dom'

function Welcome() {

    const navigate = useNavigate()
    const handleClick = () => {
        navigate('/join')
    }

    return (
        <section className='text-center flex flex-col gap-4 my-4'>
            <div className='text-center flex flex-col max-w-[500px] mx-auto'>
                <h1 className='text-[16px] sm:text-[20px] md:text-[28px] font-semibold uppercase'>
                    WHERE&nbsp; <span className='text-orange-500'>STUDENTS&nbsp; </span>TURN&nbsp; THEORY&nbsp;
                    <br />INTO&nbsp; PRACTICE&nbsp;
                </h1>
                <p className='text-sm sm:text-lg'>For students , by students.</p>
            </div>

            <button className='px-10 sm:px-14 py-1 sm:py-1.5 bg-orange-600 text-white rounded-full w-fit mx-auto font-black tracking-normal transition-all hover:bg-orange-500' onClick={handleClick}>
                Join Us
            </button>
            <img src={Icon} alt='avatar' className='w-full max-w-[700px] h-auto mx-auto mt-6' />
        </section>
    )
}

export default Welcome
