import React from 'react'
import Icon from '../../../assets/avatars/Main.png'

function Welcome() {
    return (
        <section className='text-center flex flex-col gap-4'>
            <div className='text-center flex flex-col max-w-[500px] mx-auto'>
                <h1 className='text-3xl font-semibold'>
                    Micro Learning,
                    <span className='text-orange-500'>Macro Impacts</span>  with endless collaboration
                </h1>
                <p>Your Hero’s Journey starts here!</p>
            </div>

            <button className='px-14 py-1.5 bg-orange-500 text-white rounded-full w-fit mx-auto font-semibold'>
                Join Us
            </button>
            <img src={Icon} alt='avatar' className='w-[600px] h-auto mx-auto'/>
        </section>
    )
}

export default Welcome
