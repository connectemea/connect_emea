import React, { useCallback, useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from "framer-motion";
import useEmblaCarousel from 'embla-carousel-react'
import {
  NextButton,
  PrevButton,
  usePrevNextButtons
} from './EmblaArrowBtn'
import { ArrowUpRight, ChevronsRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import Autoplay from 'embla-carousel-autoplay'
// import { DotButton, useDotButton } from './EmblaCarouselDotButton'
import classNames from 'classnames'
import { set } from 'react-hook-form';
const TWEEN_FACTOR_BASE = 0.84

// Animation presets
const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

const gridItemVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  show: (i) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: "easeOut", delay: i * 0.05 },
  }),
};

const numberWithinRange = (number, min, max) =>
  Math.min(Math.max(number, min), max)

const EmblaCarousel = (props) => {
  const { slides, options } = props
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    Autoplay({ playOnInit: true, delay: 3000, stopOnInteraction: false })
  ])
  const [isPlaying, setIsPlaying] = useState(true)
  const tweenFactor = useRef(0)
  const [activeIndex, setActiveIndex] = useState(0)
  const navigate = useNavigate();
  const tweenNodes = useRef([])
  const [loading, setLoading] = useState(true);
  const [imgLoaded, setImgLoaded] = useState(false);
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
  const [selected, setSelected] = useState(null);
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
    setLoading(false);
    emblaApi.scrollTo(1, false);
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


  const handleClick = (id, index) => {
    // console.log('clicked')
    if (activeIndex === index) {
      setSelected(slides.find(slide => slide._id === id));
    }
    // navigate('/event/' + id)
  }
  const handleClickAction = (id) => {
    // console.log('clicked')
    navigate('/event/' + id)
  }

  return (
    <div className="embla2">
      <div className="embla__viewport2" ref={emblaRef}>
        <div className="embla__container2">

          {slides.map((event, index) => (
            <motion.div
              key={event._id}
              layoutId={`card-${event._id}`}
              className="embla__slide2 relative overflow-hidden rounded-2xl border cursor-pointer"
              onClick={() => handleClick(event._id, index)}
            >
              {/* Skeleton Loader */}
              {!imgLoaded && (
                <div className="absolute top-0 left-0 w-full h-[300px] bg-gray-200 animate-pulse rounded-2xl" />
              )}

              {/* Image */}
              <motion.img
                layoutId={`image-${event._id}`}
                className={classNames(
                  "embla__slide__img2 transition-opacity duration-500",
                  imgLoaded ? "opacity-100" : "opacity-0"
                )}
                src={event.image}
                alt={event.title}
                loading="lazy"
                onLoad={() => setImgLoaded(true)}
              />

              {/* Card content */}
              <div className="absolute z-30 bottom-4 w-full mx-auto">
                <div className="bg-white/70 w-[95%] rounded-xl mx-auto py-3 backdrop-blur-sm border">
                  <h1 className="text-md font-semibold text-center mb-2">
                    {event.title}
                  </h1>
                  <div className="flex justify-around">
                    <p className="text-sm">Date: {event.date}</p>
                    <p className="text-sm">Time: {event.time}</p>
                  </div>
                </div>
              </div>

              {/* Arrow */}
              <div
                className="absolute top-2 right-2 z-30 cursor-pointer text-white bg-black/10 rounded-full"
                onClick={() => handleClick(event._id)}
              >
                <ArrowUpRight />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="embla__controls2">
        <div className="embla__buttons2">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>
        <div className='flex items-center justify-center mt-2 mx-auto'>
          <a href='/events' className='text-md mr-12 font-semibold z-30  cursor-pointer text-white px-3 py-1 rounded-md hover:bg-orange-400  transition-all ease-in-out bg-orange-500 mt-3'>
            Show more
          </a>
        </div>

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

        {/* Expanded Event Modal */}
        <AnimatePresence>
          {selected && (
            <motion.div
              className="fixed inset-0 bg-black/60 z-40 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelected(null)}
            >
              <motion.div
                layoutId={`card-${selected._id}`}
                className="w-full max-w-sm bg-white rounded-2xl shadow-xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
                transition={{ layout: { duration: 0.5, ease: "easeInOut" } }}
              >
                <motion.img
                 layoutId={`image-${selected._id}`}
                  src={selected.image}
                  alt={selected.title}
                  className="w-full max-h-[300px] object-contain bg-black"
                />
                <div className="p-5">
                  <p className="text-xs uppercase text-gray-500">
                    {selected.category}
                  </p>
                  <h2 className="text-xl font-bold mb-2">{selected.title}</h2>
                  <p className="text-gray-600">{selected.description}</p>
                  <div className="flex items-center justify-between mt-4">
                    <button
                      className="px-4 py-1 bg-black text-white rounded-lg"
                      onClick={() => setSelected(null)}
                    >
                      Close
                    </button>
                    <div className='flex justify-end w-full'>
                      <button onClick={() => handleClickAction(selected.id)} className=' bg-orange-500 rounded-md px-4 py-1 uppercase flex gap-2 items-center text-[12px] justify-center font-semibold text-white transition-all ease-in-out hover:bg-orange-400 '>open<ChevronsRight className='w-4' /></button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default EmblaCarousel
