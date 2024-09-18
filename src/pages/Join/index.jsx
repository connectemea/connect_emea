import React from 'react'
import { JoinForm } from './components/Form'
import img from '@/assets/avatars/JoinNow.png'

function Join() {
  return (
    <div className='w-limit p-3'>
      <h1 className='font-bold py-10 flex justify-center text-2xl w-full '>Intern Hiring Registeration 2025</h1>
      <div className='flex flex-col xl:flex-row bg-orange-500  mx-auto rounded-xl my-10  p-3 w-full'>
        <div className='flex items-center flex-col justify-center max-w-[600px] lg:w-[600px] mx-auto'>
          <h1 className='text-3xl font-bold text-white mx-auto mb-2'>Welcome
            to Connect</h1>
          <img src={img} alt='join' className='w-auto' />
        </div>
        <div className='bg-white w-full rounded-lg p-4 md:p-10 flex-grow mx-auto'>
          <JoinForm />
        </div>
      </div>
    </div>
  )
}

export default Join
