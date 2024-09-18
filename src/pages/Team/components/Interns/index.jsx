import React from 'react';
import TeamCard from '../TeamCard';
import  TeamsData  from '@/const/data/Teams';

function Interns({}) {
  
    return (
        <div className='flex items-start justify-center py-4 md:p-4 gap-1 sm:gap-4 flex-wrap'>
            {TeamsData.InternsData.map((intern, index) => (
                <TeamCard key={index} data={intern} id={intern.id} size={'small'} />
            ))}
        </div>
    );
}

export default Interns;
