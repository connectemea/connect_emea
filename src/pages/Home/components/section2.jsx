import React from 'react'
import Count from '../../../assets/avatars/count.png'

function Section2() {
  return (
    <section className='flex flex-col gap-4 p-4'>
      <h1 className=' font-semibold text-2xl text-center'>
        Your journey of growth right at your campus!
      </h1>
      <p className='text-center max-w-[700px]'>
        orem ipsum dolor sit amet, consectetur adipiscing elit,
      </p>
      <div className='flex justify-between'>
        <div>
          <h3 className='font-semibold'>Why Connect Chapter ?</h3>
          <ul>
            <li> Collaborate ,Learn and Grow together.</li>
            <li>
              Encourage involvement from the ground up
            </li>
            <li>
              Grow a sense of healthy competition
            </li>
            <li>
              Mentors and Resources
            </li>
          </ul>
        </div>
        <div>
          <img src={Count} alt='count' className='max-w-[300px]' />
        </div>
      </div>
    </section>
  )
}

export default Section2
