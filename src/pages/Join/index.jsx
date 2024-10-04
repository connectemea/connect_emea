import React from 'react'
import { JoinForm } from './components/Form'
import img from '@/assets/avatars/joinNowGirl.png'
import Closed from '@/assets/images/Us/closed_2.jpeg'

function Join() {
  return (
    <div className='w-limit p-3'>
       {/* <div className='max-w-4xl mx-auto p-6  rounded-lg mb-10'> */}
      <h1 className='font-bold text-center text-3xl sm:text-4xl mb-6'>
        Intern Hiring Registration 2025
      </h1>

      {/* <div className='relative'>
        <img
          src={Closed}
          alt='closed'
          className='w-full h-auto rounded-lg object-cover'
        />
        <div className='absolute top-0 left-0 bg-black bg-opacity-50 w-full h-full flex items-end justify-end rounded-md'>
          <p className='text-white text-center text-sm sm:text-xl p-2 sm:p-4 shadow'>
            The Connect intern hiring registration form is officially closed! ‼️ <br />
            All the registered candidates will be informed of further procedures, so stay tuned...👀 <br />
            Thank you for all the amazing responses. 🥰
          </p>
        </div>
      </div>

      <div className='mt-8 text-center'>
        <p className='text-lg sm:text-xl mb-4'>
          Still want to stay in touch? Join our community to get updates on our events and more exciting opportunities!
        </p>
        <a
          href='https://chat.whatsapp.com/HWUMSzHQWkyLv3VwWgnRFu'
          target='_blank'
          rel='noopener noreferrer'
        >
          <button className='px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition duration-300'>
            Join Our Community
          </button>
        </a>

      </div>
      </div> */}
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
