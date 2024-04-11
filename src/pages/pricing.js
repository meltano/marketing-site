import React from 'react'
import { graphql } from 'gatsby'
import { Helmet } from 'react-helmet'
import Layout from '../components/layout'
import Seo from '../components/seo'
import PricingHero from '../components/pricing/hero'
import Partners from '../components/partners'
import PriceTable from '../components/pricing/pricetable'
import Faq from '../components/faq'

const Pricing = ({ data }) => {
  const {
    metadata,
    featuredImage,
    themePicker,
    pricingHero,
    pricingTable,
    contactFaq,
  } = data.pricing.nodes[0]
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
      <PricingHero data={pricingHero} />
      <PriceTable data={pricingTable} />
      <Partners />
      {/* <Faq data={contactFaq} /> */}
    </Layout>
  )
}

export default Pricing

export const pageQuery = graphql`
  query {
    pricing: allWpPage(filter: { title: { eq: "Pricing" } }) {
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
        pricingHero {
          pricingHeroTitle
          pricingHeroText
          pricingHeroLink {
            title
            url
            target
          }
        }
        pricingTable {
          pricingTableItem {
            pricingTableItemTitle
            pricingTableItemTier
            pricingTableItemIcon {
              localFile {
                publicURL
              }
            }
            pricingTableItemDescription
            pricingTableItemList {
              pricingTableItemListItem
            }
            pricingTableItemLink {
              title
              url
              target
            }
          }
        }
        contactFaq {
          contactFaqTitle
          contactFaqList {
            contactFaqItem {
              contactFaqItemQuestion
              contactFaqItemAnswer
            }
          }
        }
      }
    }
  }
`
