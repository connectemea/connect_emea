import React from 'react'
import { JoinForm } from './components/Form'
import img from '../../assets/avatars/JoinNow.png'

function Join() {
  return (
    <div className='p-2'>
      <h1 className='font-bold py-10 flex justify-center text-2xl w-full'>Join page</h1>
      <div className='flex flex-col xl:flex-row bg-orange-500  mx-auto rounded-xl m-8 p-6 w-full  max-w-[800px] xl:max-w-[90%]'>
        <div className='flex items-center flex-col justify-center xl:w-[50%] xl:mx-auto'>
          <h1 className='text-3xl font-bold text-white mx-auto mb-2'>Welcome 
            to Connect</h1>
          <img src={img} alt='join' className='w-auto ' />
        </div>
        <div className='bg-white w-full rounded-lg p-10 xl:w-[50%] xl:mx-auto'>
          <JoinForm />
        </div>
      </div>
    </div>
  )
}

export default Join
