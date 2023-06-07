import React, { useRef, useState, useEffect } from 'react'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'
import Layout from '../components/layout'
import Seo from '../components/seo'
import LandingHero from '../components/landing/hero'
import LandingContent from '../components/landing/content'

const LandingPage = ({ data }) => {
  const page = data.wpLandingPage
  const blocks = page.landing.landingLayouts
  const { themePicker, metadata, featuredImage, content } = data.wpLandingPage
  const metaImage = featuredImage?.node.localFile.publicURL

  return (
    <Layout>
      <Helmet
        bodyAttributes={{
          class: `dark ${themePicker.themePicker} landing-page`,
        }}
      />
      <Seo
        title={metadata.metaTitle}
        description={metadata.metaDescription}
        image={metaImage}
      />
      {content && (
        <div
          role="article"
          key="body"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      )}
      {blocks?.map(block => {
        if (
          block.__typename ===
          'WpLandingPage_Landing_LandingLayouts_LandingLayoutOne'
        ) {
          return (
            <>
              <LandingHero data={block.landingLayoutOneHero} />
              <LandingContent data={block.landingLayoutOneList} />
            </>
          )
        }
        if (
          block.__typename ===
          'WpLandingPage_Landing_LandingLayouts_LandingLayoutTwo'
        ) {
          return (
            <>
              <LandingHero data={block.landingLayoutTwoHero} />
              <LandingContent data={block.landingLayoutTwoLists} />
            </>
          )
        }
        return null
      })}
    </Layout>
  )
}

export default LandingPage

export const query = graphql`
  query ($slug: String) {
    wpLandingPage(slug: { eq: $slug }) {
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
      content
      landing {
        landingLayouts {
          ... on WpLandingPage_Landing_LandingLayouts_LandingLayoutOne {
            __typename
            landingLayoutOneHero {
              landingLayoutOneHeroTitle
              landingLayoutOneHeroSubtitle
            }
            landingLayoutOneList {
              landingLayoutOneListTitle
              landingLayoutOneListContent {
                landingLayoutOneListItem
              }
              landingLayoutOneFormTitle
              landingLayoutOneFormId
              landingLayoutOneListButton {
                title
                url
                target
              }
            }
          }
          ... on WpLandingPage_Landing_LandingLayouts_LandingLayoutTwo {
            __typename
            landingLayoutTwoHero {
              landingLayoutTwoHeroTitle
              landingLayoutTwoHeroSubtitle
              landingLayoutTwoHeroButton {
                title
                url
                target
              }
              landingLayoutTwoHeroVideo {
                publicUrl
              }
            }
            landingLayoutTwoLists {
              landingLayoutTwoListsList {
                landingLayoutTwoListsListTitle
                landingLayoutTwoListsListItems {
                  landingLayoutTwoListsListItem
                }
                landingLayoutTwoListsListButton {
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
`
