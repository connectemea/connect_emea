import React from 'react';
import Cards from '@/const/data/Cards';
import Card from './Card';

function Points() {
    return (
        <div className="mx-auto px-4 my-4">
            <h1 className='font-semibold text-center my-8 text-[25px] sm:text-[38px]'>
                Your journey of growth right <br />
                at your campus!
            </h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {Cards.map((item) => (
                    <Card item={item} key={item.id} />
                ))}
            </div>
        </div>
    );
}

export default Points;
