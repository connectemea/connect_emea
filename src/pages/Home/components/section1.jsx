import React from 'react'

function section1() {

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
      <div className='flex flex-col sm:flex-row gap-10 w-full justify-between my-10 '>
        <div className='relative flex '>
          <div className='bg-orange-500 rotate-6 rounded-xl absolute z-10 w-[300px] h-[260px]' />
          <div className='bg-slate-400 rounded-xl absolute w-[300px] h-[260px]' />
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

export default section1
