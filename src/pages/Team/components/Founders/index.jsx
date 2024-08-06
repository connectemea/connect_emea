import React from 'react'
import TeamCard from '../TeamCard';
import  TeamsData  from '../../../../const/data/Teams';

function Founders({}) {
  // console.log(FoundersData , 'founder')
  return (
    <div className='flex items-start justify-center p-2'>
            {TeamsData.FoundersData.map((founder, index) => (
                <TeamCard key={index} data={founder} id={founder.id} size={'big'} />
            ))}
    </div>
  )
}

export default Founders
