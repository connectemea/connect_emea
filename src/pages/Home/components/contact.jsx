import React from 'react';
import ContactImg from '../../../assets/avatars/Queries.png';

function Contact() {
  return (
    <div className="flex text-center flex-col my-10">
       <h2 className="text-2xl font-bold mb-4 text-center">Any Queries</h2>
       <div className='flex bg-white rounded-lg shadow-md overflow-hidden mx-auto'>
        <div className='w-[50%] bg-gray-500'>
          <img src={ContactImg} alt="Queries" className="object-cover h-full w-full" />
        </div>
      <div className="w-[60%] max-w-md  p-6 ">
        <h2 className="text-2xl font-bold mb-4 text-center">Any Queries</h2>
        <p className="text-gray-600 mb-6 text-center">
          Let's align our constellations! Reach out and let the
          magic of collaboration illuminate our skies.
        </p>
        <form className="space-y-4">
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900">
              Queries
            </label>
            <textarea
              id="message"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your queries"
            ></textarea>
          </div>
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus-shadow-outline"
            >
              Send Now
            </button>
          </div>
        </form>
      </div>
      </div>
    </div>
  );
}

export default Contact;