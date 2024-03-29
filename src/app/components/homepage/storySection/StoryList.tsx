"use client"

import React, { useEffect, useRef, useState } from 'react'
import Story from './Story'

export default function StoryList() {
  const [leftEnd, setLeftEnd] = useState<boolean>(true)
  const [rightEnd, setRightEnd] = useState<boolean>(true)

  const scrollByValue = useRef<number>(100)
  const storyRef = useRef<HTMLDivElement | null>(null)

  function windowResizeEventListner() {
    if (storyRef.current) {
      scrollByValue.current = (storyRef.current.clientWidth * 2) / 3
    }
  }
  function onScrollEventListner() {
    if (storyRef.current) {
      const scrollLeft = storyRef.current?.scrollLeft;
      if (scrollLeft === 0) setLeftEnd(true);
      else setLeftEnd(false)

      const scrollRight = storyRef.current?.scrollWidth - storyRef.current?.clientWidth - storyRef.current?.scrollLeft;
      if (scrollRight === 0) setRightEnd(true);
      else setRightEnd(false)
    }
  }
  useEffect(() => {
    window.addEventListener('resize', windowResizeEventListner)
    storyRef.current?.addEventListener('scroll', onScrollEventListner)

    onScrollEventListner()
    windowResizeEventListner()
    return () => {
      window.removeEventListener('resize', windowResizeEventListner)
      storyRef.current?.removeEventListener('scroll', onScrollEventListner)
    }
  }, [storyRef, scrollByValue])

  return (
    <div className='relative'>
      <div className='section-heading'>
        <h3>Top Stories</h3>
        <button>See all</button>
      </div>
      <div ref={storyRef} className="overflow-x-auto scroll-smooth no-scrollbar">
        <div className="flex w-fit mt-4 py-3 pl-3 space-x-9">
          {
            topStoriesList.map((story, index) => {
              return (
                <Story story={story} key={index} index={index} />
              )
            })
          }
        </div>
        <button
          hidden={leftEnd}
          onClick={() => {
            if (storyRef.current) {
              storyRef.current.scrollLeft -= 500
              console.log("Left", storyRef.current.scrollLeft)
            }
          }}
          className='scroll-left-btn ml-0'>
          <svg className='w-4 h-2.5 sm:w-7 sm:h-4' viewBox="0 0 16 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path strokeWidth={5} d="M15.4141 1.2721C15.789 1.64715 15.9997 2.15577 15.9997 2.6861C15.9997 3.21642 15.789 3.72504 15.4141 4.1001L5.5141 14.0001L15.4141 23.9001C15.7784 24.2773 15.98 24.7825 15.9754 25.3069C15.9709 25.8313 15.7605 26.3329 15.3897 26.7037C15.0189 27.0746 14.5173 27.2849 13.9929 27.2894C13.4685 27.294 12.9633 27.0924 12.5861 26.7281L1.2721 15.4141C0.897154 15.039 0.686523 14.5304 0.686523 14.0001C0.686523 13.4698 0.897154 12.9612 1.2721 12.5861L12.5861 1.2721C12.9612 0.897154 13.4698 0.686523 14.0001 0.686523C14.5304 0.686523 15.039 0.897154 15.4141 1.2721Z" fill="white" />
          </svg>
        </button>
        <button
          hidden={rightEnd}
          onClick={() => {
            if (storyRef.current) {
              storyRef.current.scrollLeft += 500
              console.log("Right", storyRef.current.scrollLeft)
            }
          }}
          className='scroll-right-btn'>
          <svg className='w-4 h-2.5 sm:w-7 sm:h-4' viewBox="0 0 16 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path strokeWidth={5} d="M0.585904 26.7279C0.210962 26.3528 0.000331053 25.8442 0.0003311 25.3139C0.000331146 24.7836 0.210963 24.275 0.585904 23.8999L10.4859 13.9999L0.585906 4.0999C0.22159 3.7227 0.0200016 3.21749 0.0245583 2.6931C0.029115 2.16871 0.239453 1.66708 0.610269 1.29626C0.981085 0.925448 1.48271 0.715111 2.0071 0.710555C2.5315 0.705998 3.0367 0.907586 3.41391 1.2719L14.7279 12.5859C15.1028 12.961 15.3135 13.4696 15.3135 13.9999C15.3135 14.5302 15.1028 15.0388 14.7279 15.4139L3.4139 26.7279C3.03885 27.1028 2.53023 27.3135 1.9999 27.3135C1.46957 27.3135 0.960959 27.1028 0.585904 26.7279Z" fill="white" />
          </svg>
        </button>
      </div>
    </div>
  )
}

const topStoriesList = [
  { imgSrc: "/story/stories-1.jpg", name: "How 7 lines code turned into $36 Billion Empire", topic: "BUISNESS", type: "published" },
  { imgSrc: "/story/stories-2.jpg", name: "Chez pierre restaurant in Monte Carlo by Vuidafieri", topic: "BUISNESS", type: "created" },
  { imgSrc: "/story/stories-3.jpg", name: "Teknion wins Gold at 2022 International Design Awards", topic: "POLITICS", type: "draft" },
  { imgSrc: "/story/stories-4.jpg", name: "How 7 lines code turned into $36 Billion Empire", topic: "BUISNESS", type: "published" },
  { imgSrc: "/story/stories-2.jpg", name: "Chez pierre restaurant in Monte Carlo by Vuidafieri", topic: "BUISNESS", type: "created" },
]