import React from 'react'
import img from '@/assets/avatars/About1.png'

function Mission() {
  return (
    <div className='flex flex-col-reverse md:flex-row-reverse justify-between mt-10 p-4'>
      <div className='md:w-1/2 flex items-start justify-center flex-col mx-auto'>
        <h1 className='text-left mx-auto md:mx-0 text-orange-500 font-black text-3xl mb-4 '>Mission</h1>
        <p className='font-semibold text-lg md:text-xl'>
        We’re on mission to create an ecosystem where every student can pursue greatness beyond the classroom. Connect empowers those who seek real-world experience, new skills, and opportunities that go beyond the traditional college curriculum.
        </p>
      </div>
      <div className='md:w-1/2 flex items-center justify-center mx-auto'>
        <img src={img} alt='about' className='w-auto max-w-[260px] mx-auto' />
      </div>
    </div>
  )
}

export default Mission
