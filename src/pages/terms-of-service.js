import React from 'react'
import { graphql } from 'gatsby'

import { Helmet } from 'react-helmet'
import Layout from '../components/layout'
import Seo from '../components/seo'

const TermsOfService = ({ data }) => {
  const { metadata, featuredImage, themePicker, content } = data.tos.nodes[0]
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
      <div className="legal-teamplate">
        <div className="container-narrow">
          <div
            className="legal-content ml-margins"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
      </div>
    </Layout>
  )
}

export default TermsOfService

export const pageQuery = graphql`
  query {
    tos: allWpPage(filter: { title: { eq: "Terms of service" } }) {
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
        content
      }
    }
  }
`
