import React from 'react'
import Count from '../../../assets/avatars/count.png'
import Timeline from './Timeline';
function Journey() {

  const eventsData = [
    { title: 'Start' },
    { title: 'In Progress' },
    { title: 'Milestone 1' },
    { title: 'In Progress' },
    { title: 'Milestone 2' },
    { title: 'In Progress' },
    { title: 'End' },
  ];

  return (
    <section className='flex flex-col gap-4 p-4 mx-auto'>
      <h1 className='max-w-[500px] font-semibold text-2xl text-center  mx-auto'>
        Your journey of growth right at your campus!
      </h1>
      <div className=' mx-auto'>
      <Timeline events={eventsData} />
      </div>
    </section>
  )
}

export default Journey
