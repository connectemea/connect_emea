import React from 'react'
import TeamCard from '../TeamCard';

function Founders({ FoundersData = [] }) {
  return (
    <div className='flex items-start justify-center md:p-2 flex-wrap'>
      {FoundersData.map((founder, index) => (
        <TeamCard key={founder.id || index} data={founder} id={founder.id} size={'small'} />
      ))}
    </div>
  )
}

export default Founders
