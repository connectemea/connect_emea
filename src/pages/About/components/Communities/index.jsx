import React from 'react'
import TinkerHubLogo from '../../../../assets/icons/TinkerHub_EMEA.png'
import SheHikeLogo from '../../../../assets/icons/SheHike_Logo.png'

function Communities() {
  return (
    <div className='flex flex-col'>
      <h1 className='text-2xl font-semibold text-center'>Communities for joy</h1>
      <section className='flex  items-center justify-center gap-6 m-10'>
        <div className='flex items-center flex-col'>
          <img src={TinkerHubLogo} alt='about' className='w-auto ' />
          <div className='flex flex-col items-center justify-center rounded-xl p-4 border text-center'>
            <h1 className='text-xl font-semibold text-orange-500'>TinkerHub EMEA</h1>
            <p>TinkerHub EMEA is a Campus Community Initiative of TinkerHub Foundation, a non profit organization registered in 2016. TinkerHub aims to reduce the gap between technology and its effective employment in lives of tech enthusiasts.</p>
          </div>
        </div>

        <div className='flex items-center flex-col'>
          <img src={SheHikeLogo} alt='about' className='w-auto ' />
          <div className='flex flex-col items-center justify-center rounded-xl p-4 border text-center'>
            <h1 className='text-xl font-semibold text-orange-500'>SheHike</h1>
            <p>‘SheHike’ is a women's wing under CONNECT EMEA which is open to all the girl students in the college.The purpose of this initiative is to empower women with relevant knowledge and skills, thereby encouraging peer-to-peer learning among them.</p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Communities
