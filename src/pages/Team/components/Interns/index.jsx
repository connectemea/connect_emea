import React from 'react';
import TeamCard from '../TeamCard';

function Interns({ InternsData }) {

    return (
        <div className='flex items-start justify-center py-4 md:p-4 gap-1 sm:gap-4 flex-wrap'>
            {InternsData.map((intern, index) => (
                <TeamCard key={index} data={intern} id={intern.id} size={'small'} />
            ))}
        </div>
    );
}

export default Interns;
