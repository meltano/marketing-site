import React, { useRef, useEffect } from 'react'
import { StaticImage } from 'gatsby-plugin-image'
import { useInView } from 'react-intersection-observer'

const CommunityHero = ({ data }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
  })

  const lCloudRef = useRef(null)
  const rCloudRef = useRef(null)
  const bgRef = useRef(null)

  useEffect(() => {
    const addClasses = () => {
      setTimeout(() => {
        setTimeout(() => {
          lCloudRef.current.classList.add('show')
          rCloudRef.current.classList.add('show')
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
    <div className="hero hero-scene big-scene section" ref={ref}>
      <div className="container">
        <div className="hero-info ml-margins">
          <h1
            className="hero-title"
            dangerouslySetInnerHTML={{ __html: data.communityHeroTitle }}
          />
          <p className="hero-description p1">{data.communityHeroText}</p>
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
          <div ref={bgRef} className="community-bg ready">
            <StaticImage
              alt="community"
              src="../../assets/img/community-hero-bg.webp"
              layout="fullWidth"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CommunityHero
