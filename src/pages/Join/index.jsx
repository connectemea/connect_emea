import React from 'react'
import { JoinForm } from './components/Form'
import img from '@/assets/avatars/joinNowGirl.png'

function Join() {
  return (
    <div className='w-limit p-3'>
      <h1 className='font-bold py-4 flex justify-center text-2xl w-full '>Intern Hiring Registeration 2025</h1>
      <div className='flex flex-col lg:flex-row bg-gray-500  mx-auto rounded-xl my-8  p-3 w-full'>
        <div className='flex items-center flex-col justify-center max-w-[500px] lg:min-w-[350px] xl:min-w-[450px] mx-auto'>
          <h1 className='text-[48px]  text-white mx-auto  flex leading-[55px] flex-col items-center justify-center mb-10'>
            <span>Welcome</span>
            <span className='font-bold'>to Connect</span>
          </h1>
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
