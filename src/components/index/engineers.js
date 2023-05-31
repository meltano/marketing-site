import React, { useState, useEffect } from 'react'
import { StaticImage } from 'gatsby-plugin-image'
import MeltanoGivesScreensB from '../../assets/img/meltano-gives-b.svg'
import MeltanoGivesScreensM from '../../assets/img/meltano-gives-m.svg'
import MeltanoGivesScreensS from '../../assets/img/meltano-gives-s.svg'

const Engineers = ({ data }) => {
  const [meltanoGivesEngineers, setMeltanoGivesEngineers] = useState(null)
  const [windowSize, setWindowSize] = useState({
    width: undefined,
  })

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
      })
    }

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize)

      return () => window.removeEventListener('resize', handleResize)
    }
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setMeltanoGivesEngineers(document.querySelector('.meltano-gives-screens'))
    }
  }, [])

  function checkSize() {
    if (meltanoGivesEngineers && typeof window !== 'undefined') {
      if (window.innerWidth > 1024) {
        meltanoGivesEngineers.src = MeltanoGivesScreensB
      } else if (window.innerWidth > 768 && window.innerWidth <= 1024) {
        meltanoGivesEngineers.src = MeltanoGivesScreensM
      } else if (window.innerWidth <= 768) {
        meltanoGivesEngineers.src = MeltanoGivesScreensS
      }
    }
  }

  useEffect(() => {
    checkSize()
  }, [meltanoGivesEngineers, windowSize])

  useEffect(() => {
    checkSize()
  }, [])

  return (
    <div className="meltano-gives-engineers section">
      <div className="container">
        <div className="heading">
          <h2 dangerouslySetInnerHTML={{ __html: data.engineersTitle }} />
          <p
            className="heading-description p2"
            dangerouslySetInnerHTML={{ __html: data.engineersText }}
          />
        </div>

        <div className="meltano-gives-table ml-margins">
          <img className="meltano-gives-screens" alt="screens" />
          <StaticImage
            className="meltano-gives-melty"
            src="../../assets/img/meltano-gives-melty.webp"
            alt="melty"
          />
        </div>
      </div>
    </div>
  )
}

export default Engineers
