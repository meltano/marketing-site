import React from 'react'
import { graphql } from 'gatsby'

import { Helmet } from 'react-helmet'
import Layout from '../components/layout'
import Seo from '../components/seo'
import PressHero from '../components/press/hero'
import PressTabs from '../components/press/tabs'

const Press = ({ data }) => {
  const { metadata, featuredImage, themePicker, pressHero, pressTabs } =
    data.press.nodes[0]
  const metaImage = featuredImage?.node.localFile.publicURL

  return (
    <Layout>
      <Helmet
        bodyAttributes={{
          class: `dark ${themePicker.themePicker}`,
        }}
      />
      <Seo
        title={metadata.metaTitle}
        description={metadata.metaDescription}
        image={metaImage}
      />
      <PressHero data={pressHero} />
      <PressTabs data={pressTabs} />
    </Layout>
  )
}

export default Press

export const pageQuery = graphql`
  query {
    press: allWpPage(filter: { title: { eq: "Press" } }) {
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
        pressHero {
          pressHeroTitle
          pressHeroText
        }
        pressTabs {
          pressTabsTab {
            pressTabsTabTitle
            pressTabsTabContent {
              pressTabsTabContentTitle
              pressTabsTabContentText
              pressTabsTabContentLink {
                title
                url
                target
              }
              pressTabsTabContentImage {
                localFile {
                  childImageSharp {
                    gatsbyImageData
                  }
                }
              }
            }
            pressTabsTabContentLogos {
              pressTabsTabContentLogosTitle
              pressTabsTabContentLogosText
              pressTabsTabContentLogosList {
                pressTabsTabContentLogosListTitle
                pressTabsTabContentLogosListImage {
                  width
                  height
                  localFile {
                    publicURL
                  }
                }
                pressTabsTabContentLogosListLinks {
                  pressTabsTabContentLogosListLinksItem {
                    title
                    url
                    target
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`
