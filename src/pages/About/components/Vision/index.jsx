import React from 'react'
import img from '../../../../assets/avatars/About2.png'

function Vision() {
  return (
    <div className='flex flex-col-reverse md:flex-row justify-between mt-10 p-4'>
      <div className='md:w-1/2 flex items-start justify-center flex-col mx-auto'>
        <h1 className='text-left text-orange-500 font-black text-3xl mb-4'>Vision</h1>
        <p>
        We paint a larger picture of the student community to create a network with clusters of their area of interests and thus creating a potent workforce capable of unlocking the vast reservoir of untapped potential. By improving specific learning outcomes, it essentially places people first by empowering them with technical and creative skills to make sustainable choices and multi-dimensional solutions that the complex new world needs.
        </p>
      </div>
      <div className='md:w-1/2 flex items-center justify-center mx-auto'>
        <img src={img} alt='about' className='w-auto max-w-[260px] mx-auto' />
      </div>
    </div>
  )
}

export default Vision
