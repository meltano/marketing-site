import React from 'react'
import { graphql } from 'gatsby'

import { Helmet } from 'react-helmet'
import Layout from '../components/layout'
import Seo from '../components/seo'
import PartnersHero from '../components/partners/hero'
import Meet from '../components/partners/meet'
import Separator from '../components/partners/separator'
import Join from '../components/partners/join'

const Partners = ({ data }) => {
  const {
    metadata,
    featuredImage,
    themePicker,
    partnersHero,
    partnersMeet,
    partnersForm,
  } = data.partners.nodes[0]
  const metaImage = featuredImage?.node.localFile.publicURL

  return (
    <Layout>
      <Helmet
        bodyAttributes={{
          class: themePicker.themePicker,
        }}
      />
      <Seo
        title={metadata.metaTitle}
        description={metadata.metaDescription}
        image={metaImage}
      />
      <PartnersHero data={partnersHero} />
      <Meet data={partnersMeet} />
      <Separator />
      <Join data={partnersForm} />
    </Layout>
  )
}

export default Partners

export const pageQuery = graphql`
  query {
    partners: allWpPage(filter: { title: { eq: "Partners" } }) {
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
        partnersHero {
          partnersHeroTitle
          partnersHeroText
        }
        partnersMeet {
          partnersMeetGroup {
            partnersMeetGroupImage {
              localFile {
                childImageSharp {
                  gatsbyImageData
                }
              }
            }
            partnersMeetGroupLink {
              title
              url
              target
            }
          }
        }
        partnersForm {
          partnersFormTitle
          partnersFormText
          partnersFormHubspot {
            partnersFormHubspotPortalId
            partnersFormHubspotFormId
          }
        }
      }
    }
  }
`
