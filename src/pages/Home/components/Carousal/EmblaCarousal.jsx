import React, { useCallback, useEffect, useRef } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import {
  NextButton,
  PrevButton,
  usePrevNextButtons
} from './EmblaArrowBtn'
import { ArrowUpRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import Autoplay from 'embla-carousel-autoplay'
// import { DotButton, useDotButton } from './EmblaCarouselDotButton'
import classNames from 'classnames'
import { useState } from 'react'
const TWEEN_FACTOR_BASE = 0.84

const numberWithinRange = (number, min, max) =>
  Math.min(Math.max(number, min), max)

const EmblaCarousel = (props) => {
  const { slides, options } = props
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    Autoplay({ playOnInit: true, delay: 2000 })
  ])
  const [isPlaying, setIsPlaying] = useState(true)
  const tweenFactor = useRef(0)
  const [activeIndex, setActiveIndex] = useState(0)
  const navigate = useNavigate();
  const tweenNodes = useRef([])
  //   const { selectedIndex, scrollSnaps, onDotButtonClick } =
  //     useDotButton(emblaApi)
  // console.log('slides', slides)

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  } = usePrevNextButtons(emblaApi)

  const setTweenNodes = useCallback((emblaApi) => {
    tweenNodes.current = emblaApi.slideNodes().map((slideNode) => {
      return slideNode?.querySelector('.embla__slide__number')
    }).filter(node => node) // Filter out null/undefined nodes
  }, [])

  const setTweenFactor = useCallback((emblaApi) => {
    tweenFactor.current = TWEEN_FACTOR_BASE * emblaApi.scrollSnapList().length
  }, [])

  const tweenScale = useCallback((emblaApi, eventName) => {
    const engine = emblaApi.internalEngine()
    const scrollProgress = emblaApi.scrollProgress()
    const slidesInView = emblaApi.slidesInView()
    const isScrollEvent = eventName === 'scroll'

    emblaApi.scrollSnapList().forEach((scrollSnap, snapIndex) => {
      let diffToTarget = scrollSnap - scrollProgress
      const slidesInSnap = engine.slideRegistry[snapIndex]

      slidesInSnap.forEach((slideIndex) => {
        if (isScrollEvent && !slidesInView.includes(slideIndex)) return

        if (engine.options.loop) {
          engine.slideLooper.loopPoints.forEach((loopItem) => {
            const target = loopItem.target()

            if (slideIndex === loopItem.index && target !== 0) {
              const sign = Math.sign(target)

              if (sign === -1) {
                diffToTarget = scrollSnap - (1 + scrollProgress)
              }
              if (sign === 1) {
                diffToTarget = scrollSnap + (1 - scrollProgress)
              }
            }
          })
        }

        const tweenValue = 1 - Math.abs(diffToTarget * tweenFactor.current * 0.5)
        const scale = numberWithinRange(tweenValue, 0, 1).toString()
        const tweenNode = tweenNodes.current[slideIndex]
        emblaApi.slideNodes()[slideIndex].style.transform = `scale(${scale})`
      })
    })
  }, [])

  const tweenOpacity = useCallback((emblaApi, eventName) => {
    const engine = emblaApi.internalEngine()
    const scrollProgress = emblaApi.scrollProgress()
    const slidesInView = emblaApi.slidesInView()
    const isScrollEvent = eventName === 'scroll'

    emblaApi.scrollSnapList().forEach((scrollSnap, snapIndex) => {
      let diffToTarget = scrollSnap - scrollProgress
      const slidesInSnap = engine.slideRegistry[snapIndex]

      slidesInSnap.forEach((slideIndex) => {
        if (isScrollEvent && !slidesInView.includes(slideIndex)) return

        if (engine.options.loop) {
          engine.slideLooper.loopPoints.forEach((loopItem) => {
            const target = loopItem.target()

            if (slideIndex === loopItem.index && target !== 0) {
              const sign = Math.sign(target)

              if (sign === -1) {
                diffToTarget = scrollSnap - (1 + scrollProgress)
              }
              if (sign === 1) {
                diffToTarget = scrollSnap + (1 - scrollProgress)
              }
            }
          })
        }

        const tweenValue = 1 - Math.abs(diffToTarget * tweenFactor.current)
        const opacity = numberWithinRange(tweenValue, 0, 1).toString()
        emblaApi.slideNodes()[slideIndex].style.opacity = opacity
      })
    })
  }, [])

  useEffect(() => {
    const autoplay = emblaApi?.plugins()?.autoplay
    if (!autoplay) return

    setIsPlaying(autoplay.isPlaying())
    emblaApi
      .on('autoplay:play', () => setIsPlaying(true))
      .on('autoplay:stop', () => setIsPlaying(false))
      .on('reInit', () => setIsPlaying(autoplay.isPlaying()))
  }, [emblaApi])

  const updateActiveIndex = useCallback((emblaApi) => {
    if (!emblaApi) return
    setActiveIndex(emblaApi.selectedScrollSnap())
  }, [])


   useEffect(() => {
    if (!emblaApi) return

    setTweenFactor(emblaApi)
    setTweenNodes(emblaApi)
    tweenOpacity(emblaApi)
    tweenScale(emblaApi)

    emblaApi
      .on('reInit', setTweenFactor)
      .on('reInit', tweenOpacity)
      .on('scroll', tweenOpacity)
      .on('reInit', tweenScale)
      .on('scroll', tweenScale)
      .on('slideFocus', tweenScale)
      .on('slideFocus', tweenOpacity)
      .on('select', () => updateActiveIndex(emblaApi))
  }, [emblaApi, tweenOpacity, tweenScale, updateActiveIndex])


  const handleClick = (id) => {
    // console.log('clicked')
    navigate('/event/' + id)
  }

  return (
    <div className="embla2">
      <div className="embla__viewport2" ref={emblaRef}>
        <div className="embla__container2">
          {slides.map((event, index) => (
            <div className={classNames(
              'embla__slide2 relative overflow-hidden',
              // 'lg:!opacity-100',
            )}
              key={index}
            >
              <img
                className="embla__slide__img2"
                src={`https://picsum.photos/600/350?v=${index}`}
                alt="Your alt text"
              />
              {/* card */}
              <div className="absolute z-30 bottom-4 w-[95%]  pr-2 ">
                <div className='bg-gray-200 w-[95%] rounded-xl  mx-auto py-3'>
                  <h1 className='text-md font-semibold text-center mb-2'>{event.title}</h1>
                  <div className='flex justify-around'>
                    <p className='text-sm'>Date: {event.date}</p>
                    <p className='text-sm'>Time: {event.time}</p>
                  </div>
                </div>
              </div>

              {/* arrow */}
              <div className='absolute top-2 right-2 z-30 cursor-pointer text-white bg-black/10 rounded-full' onClick={() => handleClick(index + 1)}>
                <ArrowUpRight />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="embla__controls2">
        <div className="embla__buttons2">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>

        <a href='/events' className='text-md mx-auto font-semibold z-30 -mt-4 cursor-pointer hover:text-orange-500 transition-all ease-in-out'>
          Show more
        </a>
        {/* <div className="embla__dots">
            {scrollSnaps.map((_, index) => (
              <DotButton
                key={index}
                onClick={() => onDotButtonClick(index)}
                className={'embla__dot'.concat(
                  index === selectedIndex ? ' embla__dot--selected' : ''
                )}
              />
            ))}
          </div> */}
      </div>
    </div>
  )
}

export default EmblaCarousel
