import React, { useEffect, useRef } from 'react'
import { StaticImage } from 'gatsby-plugin-image'
import { useInView } from 'react-intersection-observer'

const IndexHero = ({ data }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
  })

  const lCloudRef = useRef(null)
  const rCloudRef = useRef(null)
  const castleRef = useRef(null)
  const waterfallRef = useRef(null)
  const bgRef = useRef(null)

  useEffect(() => {
    const addClasses = () => {
      setTimeout(() => {
        setTimeout(() => {
          lCloudRef.current.classList.add('show')
          rCloudRef.current.classList.add('show')
          castleRef.current.classList.add('show')
          waterfallRef.current.classList.add('show')
        }, 100)

        setTimeout(() => {
          bgRef.current.classList.add('show')
        }, 300)
      }, 200)
    }

    if (inView) {
      addClasses()
    }

    return () => {}
  }, [inView])

  return (
    <div className="hero hero-scene section" ref={ref}>
      <div className="container">
        <div className="hero-info ml-margins">
          <h1
            className="hero-title"
            dangerouslySetInnerHTML={{ __html: data.heroTitle }}
          />
          <p
            className="hero-description p1"
            dangerouslySetInnerHTML={{ __html: data.heroText }}
          />
          <div className="hero-buttons">
            <a
              href={data.heroButton1.url}
              className="btn main-btn"
              target={data.heroButton1.target}
              rel="noopener noreferrer"
            >
              {data.heroButton1.title}
            </a>
            <a
              href={data.heroButton2.url}
              className="btn colorful-btn"
              target={data.heroButton2.target}
              rel="noopener noreferrer"
            >
              <span />
              {data.heroButton2.title}
            </a>
          </div>
          <a
            href={data.heroLink.url}
            className="main-link btn-with-arrow"
            target={data.heroLink.target}
            rel="noopener noreferrer"
          >
            {data.heroLink.title}
            <span className="right-arrow">
              <span />
              <span />
              <span />
            </span>
          </a>
        </div>

        <div className="background-elements">
          <div ref={lCloudRef} className="cloud-left ready">
            <StaticImage
              alt="cloud left"
              src="../../assets/img/clouds-1.webp"
              layout="constrained"
            />
          </div>
          <div ref={rCloudRef} className="cloud-right ready">
            <StaticImage
              alt="cloud right"
              src="../../assets/img/clouds-2.webp"
              layout="constrained"
            />
          </div>
          <div ref={castleRef} className="hero-castle ready">
            <StaticImage
              alt="castle"
              src="../../assets/img/hero-castle.webp"
              layout="constrained"
            />
          </div>
          <div ref={waterfallRef} className="hero-waterfall ready">
            <StaticImage
              alt="waterfall"
              src="../../assets/img/hero-waterfall.webp"
              layout="constrained"
            />
          </div>
          <div ref={bgRef} className="hero-bg ready">
            <StaticImage
              alt="mountain"
              src="../../assets/img/hero-mountain.webp"
              layout="fullWidth"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default IndexHero
