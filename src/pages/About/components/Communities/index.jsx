import React from 'react'
import TinkerHubLogo from '@/assets/icons/TinkerHub_EMEA2.png'
import SheHikeLogo from '@/assets/icons/SheHike_Logo2.png'

function Communities() {
  return (
    <div className='flex flex-col'>
      <h1 className='text-3xl font-semibold text-center my-10'>Communities for joy</h1>
      <section className='flex flex-col sm:flex-row items-center justify-center gap-16 m-10'>
        <div className='flex items-center flex-col'>

          <div className='flex flex-col items-center justify-start rounded-3xl p-4 border text-center max-w-[420px] md:max-w-[320px]  h-full min-h-[300px] md:min-h-[360px] border-gray-500 shadow-xl shadow-black/25'>
            <img src={TinkerHubLogo} alt='about' className='w-auto h-auto max-w-[190px] mb-4' />
            <p className='text-lg '>TinkerHub EMEA is a Campus Community Initiative of TinkerHub Foundation, a non profit organization registered in 2016. TinkerHub aims to reduce the gap between technology and its effective employment in lives of tech enthusiasts.</p>
          </div>
        </div>

        <div className='flex items-center flex-col'>

          <div className='flex flex-col items-center justify-start rounded-3xl p-4 border text-center max-w-[420px] md:max-w-[320px] h-full min-h-[300px] md:min-h-[360px] border-gray-500 shadow-xl shadow-black/2'>
            <img src={SheHikeLogo} alt='about' className='w-auto h-auto max-w-[190px] mb-4' />
            {/* <img src={SheHikeLogo} alt='about' className='w-auto h-auto max-w-[120px] mb-4' /> */}
            <p className='text-lg'>‘SheHike’ is a women's wing under CONNECT EMEA which is open to all the girl students in the college.The purpose of this initiative is to empower women with relevant knowledge and skills, thereby encouraging peer-to-peer learning among them.</p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Communities
