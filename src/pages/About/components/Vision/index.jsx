import React from 'react'
import img from '@/assets/avatars/About2.png'

function Vision() {
  return (
    <div className='flex flex-col-reverse md:flex-row justify-between mt-10 p-4'>
      <div className='md:w-1/2 flex items-start justify-center flex-col mx-auto md:pl-4'>
        <h1 className='text-left mx-auto md:mx-0 text-orange-500 font-black text-3xl mb-4'>Vision</h1>
        <p className=' text-lg md:text-xl text-center md:text-left '>
          We envision a future where students use their college years not just for academic excellence but for life and career excellence. At Connect, we provide the resources and support to help every student become skilled, valuable, and capable of achieving their dreams—regardless of where they study.
        </p>
      </div>
      <div className='md:w-1/2 flex items-center justify-center mx-auto'>
        <img src={img} alt='about' className='w-auto max-w-[260px] mx-auto' />
      </div>
    </div>
  )
}

export default Vision
