import React from 'react'
import { graphql } from 'gatsby'

import { Helmet } from 'react-helmet'
import Layout from '../components/layout'
import Seo from '../components/seo'
import CloudHero from '../components/cloud/hero'
import Waitlist from '../components/cloud/waitlist'
import Focus from '../components/cloud/focus'
import Partners from '../components/partners'

const Cloud = ({ data }) => {
  const {
    metadata,
    featuredImage,
    cloudHero,
    cloudWaitlist,
    cloudFocus,
    themePicker,
  } = data.cloud.nodes[0]
  const metaImage = featuredImage?.node.localFile.publicURL

  return null
}

/*   return (
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
      <CloudHero data={cloudHero} />
      <Waitlist data={cloudWaitlist} />
      <Focus data={cloudFocus} />
      <Partners />
    </Layout>
  )
}

export default Cloud

export const pageQuery = graphql`
  query {
    cloud: allWpPage(filter: { title: { eq: "Cloud" } }) {
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
        cloudHero {
          cloudHeroTitle
          cloudHeroText
        }
        cloudWaitlist {
          cloudWaitlistTitle
          cloudWaitlistList {
            cloudWaitlistListItem
          }
          cloudWaitlistButtons {
            cloudWaitlistButtonsOne {
              title
              url
              target
            }
            cloudWaitlistButtonsTwo {
              title
              url
              target
            }
          }
        }
        cloudFocus {
          cloudFocusTitle
          cloudFocusList {
            cloudFocusListTitle
            cloudFocusListText
            cloudFocusListIcon {
              localFile {
                publicURL
              }
            }
          }
        }
      }
    }
  }
`
 */
