/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import React, { useRef, useState } from 'react'
import Cylinder from '../../assets/img/cylinder.svg'
import Cube from '../../assets/img/cube.svg'
import Triangle from '../../assets/img/triangle.svg'

const Video = ({ data }) => {
  const [mousedown, setMousedown] = useState(false)
  const floatRef = useRef([])

  const handleParallax = e => {
    floatRef.current.forEach(move => {
      const movingValue = move.dataset.value
      const x = (e.clientX * movingValue) / 250
      const y = (e.clientY * movingValue) / 250
      move.style.transform = `translateX(${x}px) translateY(${y}px)`
    })
  }

  const handleMouseOver = () => {
    setMousedown(true)
  }

  const handleMouseLeave = () => {
    setMousedown(false)
  }

  const handleMouseMove = e => {
    if (mousedown) {
      handleParallax(e)
    }
  }

  return (
    <div
      className="video section"
      onMouseOver={handleMouseOver}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      <div className="container">
        <div className="heading">
          <h2>
            Meltano gives data engineers
            <span className="brackets">control and visibility</span> of their
            pipelines
          </h2>
          <p className="heading-description p1">
            No more black box. Let your creativity flow.
          </p>
        </div>
        <div className="video-container">
          <div className="video-wrap">
            <div className="video-poster">
              <iframe
                width="791"
                height="508"
                src="https://www.youtube.com/embed/rGlf43bAG6I"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen
              />
            </div>
          </div>
          <div className="video-objects">
            <img
              ref={el => (floatRef.current[0] = el)}
              className="video-obj-cylinder float"
              data-value="-3"
              src={Cylinder}
              alt=""
            />
            <img
              ref={el => (floatRef.current[1] = el)}
              className="video-obj-cube float"
              data-value="4"
              src={Cube}
              alt=""
            />
            <img
              ref={el => (floatRef.current[2] = el)}
              className="video-obj-triangle float"
              data-value="3"
              src={Triangle}
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Video
