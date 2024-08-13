import React from 'react'

function Content() {

  const points = [
    {
      title: 'orem ipsum dolor sit amet, ',
      content: 'orem ipsum dolor sit amet, consectetur adipiscing elit, sed do',
    },
    {
      title: 'orem ipsum dolor sit amet, ',
      content: 'orem ipsum dolor sit amet, consectetur adipiscing elit, sed do',
    },
    {
      title: 'orem ipsum dolor sit amet, ',
      content: 'orem ipsum dolor sit amet, consectetur adipiscing elit, sed do',
    },
  ]
  return (
    <section className='flex flex-col gap-4 p-4'>
      <h1 className='max-w-[600px] font-semibold text-2xl text-left'>
        orem ipsum dolor sit amet, consectetur
        adipiscing elit,
      </h1>
      <p className='text-left max-w-[700px]'>
        orem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
      </p>
      <div className='flex flex-col md:flex-row gap-10 w-full justify-center md:justify-between my-10 items-center'>
        <div className='relative flex min-h-[260px]'>
          <div className='bg-orange-500 rotate-6 rounded-xl absolute z-10 w-[300px] h-[260px] left-1/2 transform -translate-x-1/2  md:translate-x-0' />
          <div className='bg-slate-400 rounded-xl absolute w-[300px] h-[260px] left-1/2 transform -translate-x-1/2 md:translate-x-0' />
        </div>
        <div className='flex items-start flex-col gap-10'>
          {points.map((item, index) => (
            <div key={index}>
              <h1 className='font-semibold'>{item.title}</h1>
              <p>{item.content}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Content
