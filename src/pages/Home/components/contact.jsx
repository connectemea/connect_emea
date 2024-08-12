import React from 'react'
import ContactImg from '../../../assets/avatars/Queries.png'

function Contact() {
  return (
    <div>
        <h1 className='font-semibold text-3xl mx-auto'> Any Queries</h1>
        <div className='border rounded-xl flex'>
          <img src={ContactImg} alt='about' />
          <div>
            <input type='text' placeholder='blah blach' />
          </div>
          
        </div>
    </div>
  )
}

export default Contact
