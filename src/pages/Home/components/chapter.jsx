import React from 'react'
import Count from '../../../assets/avatars/count.png'

function Chapter() {
  return (
    <section className='flex flex-col gap-4 p-4'>
      <h1 className=' font-semibold text-2xl text-center'>
        Your journey of growth right at your campus!
      </h1>
      <p className='text-center max-w-[700px] mx-auto'>
        orem ipsum dolor sit amet, consectetur adipiscing elit,
      </p>
      <div className='flex justify-between md:flex-row flex-col mx-auto items-start gap-10'>
        <div>
          <h3 className='font-semibold my-4'>Why Connect Chapter ?</h3>
          <ul className='flex flex-col gap-4 list-disc'>
            <li className='list-disc'> Collaborate ,Learn and <br /> Grow together.</li>
            <li>
              Encourage involvement <br />from the ground up
            </li>
            <li>
              Grow a sense of healthy<br /> competition
            </li>
            <li>
              Mentors and Resources
            </li>
          </ul>
        </div>
        <div className='relative'>
          <div className='bg-transparent  absolute z-10 w-full h-full' />
          <img src={Count} alt='count' className='max-w-[300px]' />
        </div>
      </div>
    </section>
  )
}

export default Chapter
