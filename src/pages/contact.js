import React from 'react'
import { graphql } from 'gatsby'

import { Helmet } from 'react-helmet'
import Layout from '../components/layout'
import Seo from '../components/seo'
import ContactHero from '../components/contact/hero'
import ContactForm from '../components/contact/form'
import Faq from '../components/faq'

const Contact = ({ data }) => {
  const {
    metadata,
    featuredImage,
    themePicker,
    contactHero,
    contactForm,
    contactFaq,
  } = data.contact.nodes[0]
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
      <ContactHero data={contactHero} />
      <ContactForm data={contactForm} />
    </Layout>
  )
}

export default Contact

export const pageQuery = graphql`
  query {
    contact: allWpPage(filter: { title: { eq: "Contact" } }) {
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
        contactHero {
          contactHeroTitle
          contactHeroText
        }
        contactForm {
          contactFormTitle
          contactFormText
          contactFormHubspot {
            contactFormHubspotPortalId
            contactFormHubspotFormId
          }
          contactFormLinks {
            contactFormLinksIcon {
              localFile {
                publicURL
              }
            }
            contactFormLinksTitle
            contactFormLinksLink {
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
