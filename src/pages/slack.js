import React from 'react'
import { graphql } from 'gatsby'

import { Helmet } from 'react-helmet'
import Layout from '../components/layout'

const SlackPage = ({ data }) => {
  const { metadata, featuredImage, themePicker } = data.notfound.nodes[0]
  const metaImage = featuredImage?.node.localFile.publicURL

  return (
    <Layout>
      <Helmet
        bodyAttributes={{
          class: themePicker.themePicker,
        }}
      />

      <div className="legal-teamplate">
        <div className="container-narrow">
          <div className="legal-content ml-margins">
            <h1><strong>Meltano Slack</strong></h1>

            <p>
              We're having some trouble with our community Slack workspace and members are not currently able to sign in.
              We're working with Slack to get this resolved as soon as possible.
            </p>

            <p>
              In the mean time, you can access the <a href="https://www.linen.dev/s/meltano"><strong>Slack Archive</strong></a> that has every discussion up until about a month ago &mdash; there's a great chance your question has been asked before!
            </p>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default SlackPage

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
