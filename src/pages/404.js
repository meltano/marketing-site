import React from 'react'
import { graphql } from 'gatsby'

import { Helmet } from 'react-helmet'
import { StaticImage } from 'gatsby-plugin-image'
import Layout from '../components/layout'
import Seo from '../components/seo'

const NotFoundPage = ({ data }) => {
  const { metadata, featuredImage, themePicker } = data.notfound.nodes[0]
  const metaImage = featuredImage?.node.localFile.publicURL

  return (
    <Layout>
      <Helmet
        bodyAttributes={{
          class: `page-404 light ${themePicker.themePicker}`,
        }}
      />
      <Seo
        title={metadata.metaTitle}
        description={metadata.metaDescription}
        image={metaImage}
      />

      <div className="container">
        <div className="page-content content-404 ml-margins">
          <StaticImage
            src="../assets/img/melty-flying.webp"
            class="melty-404"
            alt="Melty 404"
          />
          <h1 className="title-404 page-title">
            <span className="brackets">404</span>
          </h1>
          <h4 className="subtitle-404">Here Be Dragons</h4>
          <p className="p2 description-404">
            Do you see what you’re looking for below?
          </p>
        </div>
        {/* <!-- .page-content --> */}
      </div>
    </Layout>
  )
}

export default NotFoundPage

export const pageQuery = graphql`
  query {
    notfound: allWpPage(filter: { title: { eq: "404" } }) {
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
      }
    }
  }
`
