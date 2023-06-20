import React, { useRef, useEffect } from 'react'
import { GatsbyImage } from 'gatsby-plugin-image'

const Community = ({ data }) => {
  const parentRef = useRef(null)
  const gradientRef = useRef([])

  let mousePositions = []
  let isAnimating = false

  function getElementOffset(element) {
    const rect = element.getBoundingClientRect()
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop
    return {
      top: rect.top + scrollTop,
      left: rect.left + scrollLeft,
    }
  }

  const handleMouseMove = event => {
    const timestamp = new Date().getTime()

    mousePositions.push({
      x: event.pageX,
      y: event.pageY,
      timestamp,
    })

    if (!isAnimating) {
      isAnimating = true
      updateGradient()
    }
  }

  const updateGradient = () => {
    const timestamp = new Date().getTime()
    mousePositions = mousePositions.filter(
      pos => timestamp - pos.timestamp <= 100
    )

    const position = mousePositions[0]

    if (position) {
      gradientRef?.current.forEach(element => {
        const windowWidth = element.clientWidth
        const windowHeight = element.clientHeight
        const offset = getElementOffset(element)

        const mouseXpercentage = Math.round(
          ((position.x - offset.left) / windowWidth) * 100
        )
        const mouseYpercentage = Math.round(
          ((position.y - offset.top) / windowHeight) * 100
        )

        element.style.background = `radial-gradient(circle 260px at ${mouseXpercentage}% ${mouseYpercentage}%, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.02)`
      })
    }

    if (mousePositions.length > 0) {
      requestAnimationFrame(updateGradient)
    } else {
      isAnimating = false
    }
  }

  useEffect(() => {
    const parentElement = parentRef.current
    if (parentElement) {
      parentElement.addEventListener('mousemove', handleMouseMove)
    }

    return () => {
      if (parentElement) {
        parentElement.removeEventListener('mousemove', handleMouseMove)
      }
    }
  }, [])

  return (
    <div className="community section" ref={parentRef}>
      <div className="container">
        <div className="community-extras">
          {data.communityArray.map(community => (
            <a
              href={community.communityIconLink.url}
              className="community-item"
              ref={el => gradientRef.current.push(el)}
              key={community.communityIconLink.url}
            >
              <div className="community-info">
                <span className="community-item-btn">
                  <img
                    src={community.communityIcon.localFile.publicURL}
                    alt={community.communityIconLink.title}
                  />
                </span>
                <GatsbyImage
                  className="community-item-image"
                  image={
                    community.communityImage.localFile.childImageSharp
                      .gatsbyImageData
                  }
                  alt={community.communityTitle}
                />
                <h4
                  className="title-inline"
                  dangerouslySetInnerHTML={{
                    __html: community.communityTitle,
                  }}
                />
                <span className="btn-with-arrow">
                  {community.communityDescriptionLink.title}
                </span>
              </div>
            </a>
          ))}
          {/* <div className="community-item">
            <div className="community-info">
              <a
                href="https://discuss.dgraph.io/"
                className="community-item-btn"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={CommunitySlack} alt="slack" />
              </a>
              <StaticImage
                className="community-item-image"
                src="../../assets/img/community-slack.webp"
                alt="slack"
              />
              <h4 className="title-inline">
                <span className="brackets">Join</span> 3,000+ <br />
                on Slack
              </h4>
              <a
                href="https://meltano.com/slack"
                className="btn-with-arrow"
                target="_blank"
                rel="noopener noreferrer"
              >
                Chat and learn from our users
                <span className="right-arrow">
                  <span />
                  <span />
                  <span />
                </span>
              </a>
            </div>
          </div>

          <div className="community-item">
            <div className="community-info">
              <a
                href="https://github.com/meltano/meltano"
                className="community-item-btn"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={CommunityGithub} alt="github" />
              </a>
              <StaticImage
                className="community-item-image"
                src="../../assets/img/community-github.webp"
                alt="github"
              />
              <h4 className="title-inline">
                <span className="brackets">Contribute</span> <br />
                on GitHub
              </h4>
              <a
                href="https://github.com/meltano/meltano"
                className="btn-with-arrow"
                target="_blank"
                rel="noopener noreferrer"
              >
                View code and issue tracker
                <span className="right-arrow">
                  <span />
                  <span />
                  <span />
                </span>
              </a>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  )
}

export default Community
