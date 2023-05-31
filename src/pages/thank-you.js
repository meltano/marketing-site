import React, { useEffect, useRef } from 'react'
import { graphql } from 'gatsby'

import { StaticImage } from 'gatsby-plugin-image'
import { useInView } from 'react-intersection-observer'
import { Helmet } from 'react-helmet'
import Seo from '../components/seo'
import Layout from '../components/layout'

const ThankYou = ({ data }) => {
  const { metadata, featuredImage, themePicker, thankYouHero } =
    data.thankyou.nodes[0]
  const metaImage = featuredImage?.node.localFile.publicURL

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
    <Layout>
      <Helmet
        bodyAttributes={{
          class: `light ${themePicker.themePicker}`,
        }}
      />
      <Seo
        title={metadata.metaTitle}
        description={metadata.metaDescription}
        image={metaImage}
      />
      <div className="hero hero-scene section" ref={ref}>
        <div className="container">
          <div className="hero-info ml-margins">
            <h1
              className="hero-title"
              dangerouslySetInnerHTML={{
                __html: thankYouHero.thankYouHeroTitle,
              }}
            />
            <p className="hero-description p1">
              {thankYouHero.thankYouHeroText}
            </p>
          </div>

          <div className="background-elements">
            <div ref={lCloudRef} className="cloud-left ready">
              <StaticImage
                alt="cloud left"
                src="../assets/img/clouds-1.webp"
                layout="constrained"
              />
            </div>
            <div ref={rCloudRef} className="cloud-right ready">
              <StaticImage
                alt="cloud right"
                src="../assets/img/clouds-2.webp"
                layout="constrained"
              />
            </div>
            <div ref={castleRef} className="hero-castle ready">
              <StaticImage
                alt="castle"
                src="../assets/img/hero-castle.webp"
                layout="constrained"
              />
            </div>
            <div ref={waterfallRef} className="hero-waterfall ready">
              <StaticImage
                alt="waterfall"
                src="../assets/img/hero-waterfall.webp"
                layout="constrained"
              />
            </div>
            <div ref={bgRef} className="hero-bg ready">
              <StaticImage
                alt="mountain"
                src="../assets/img/hero-mountain.webp"
                layout="fullWidth"
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default ThankYou

export const pageQuery = graphql`
  query {
    thankyou: allWpPage(filter: { title: { eq: "Thank you" } }) {
      nodes {
        title
        metadata {
          metaTitle
          metaDescription
        }
        featuredImage {
          node {
            localFile {
              publicURL
            }
          }
        }
        themePicker {
          themePicker
        }
        thankYouHero {
          thankYouHeroTitle
          thankYouHeroText
        }
      }
    }
  }
`
