import React from 'react'
import EmblaCarousel from './Carousal/EmblaCarousal'
import '../../../assets/styles/embla.css'

const OPTIONS = { loop: true }
const SLIDE_COUNT = 5
const SLIDES = Array.from(Array(SLIDE_COUNT).keys())

function Events() {
  return (
    <div>
        <h1 className='mx-auto font-semibold text-2xl text-center my-10'>Upcoming Events</h1>
        <div>
        <EmblaCarousel slides={SLIDES} options={OPTIONS} />
        </div>
    </div>
  )
}

export default Events
