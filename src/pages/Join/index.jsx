import React from 'react'
import { JoinForm } from './components/Form'
import img from '../../assets/avatars/JoinNow.png'

function Join() {
  return (
    <div>
      <h1 className='font-bold py-10 flex justify-center text-2xl w-full'>Join page</h1>
      <div className='flex flex-col md:flex-row p-2 bg-orange-500 w-fit mx-auto rounded-xl my-10'>
        <div className='flex items-center flex-col justify-center'>
          <h1 className='text-2xl font-semibold text-white mx-auto'>Welcome <br />
            to Connect</h1>
          <img src={img} alt='join' className='w-auto ' />
        </div>
        <div className='bg-white w-full p-4 rounded-lg'>
          <JoinForm />
        </div>
      </div>
    </div>
  )
}

export default Join
