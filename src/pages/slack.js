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
              Unfortunately the Meltano Slack community has been inaccessible since last Friday (2023-12-08) as the result of a botched migration by Slack.
            </p>

            <p>
              As part of upgrading our company's internal Slack workspace to Slack Enterprise Grid,
              Slack inadvertently included the separate community Slack workspace as well, contrary to the project scope we'd agreed to, and without warning of the consequences.
              Post-migration, when the "I can't join Slack!" messages started flowing in, we were told that the Meltano Slack community's <strong>4,200+ members were now completely locked out</strong>,
              and we were given three unviable options:
            </p>

            <ol>
              <li>
                Adopt all 4,200+ of them into your enterprise account and <strong>start paying tens of thousands of dollars per month</strong> to keep them.
                (Note that we'd negotiated our enterprise contract for 20 seats, a full two orders of magnitude lower &mdash; it's difficult to understand how Slack could not have noticed this.)
              </li>
              <li>Engage Slack in a "<strong>paid engagement that is pretty costly</strong> and traditionally has around a <strong>4 week minimum</strong> backlog" to revert the "upgrade".</li>
              <li><strong>Start from scratch</strong> with a new Slack community and try to get 4200+ people to rejoin.</li>
            </ol>

            <p>
              While we work with Slack to get this resolved in a reasonable and timely fashion, you can:
            </p>

            <ul>
              <li>chat with other Meltano users including our team in the <strong><a href="https://getdbt.slack.com/archives/C01Q4ACBNE5" target="_blank"><code>#tools-meltano</code></a></strong> channel in the <a href="https://www.getdbt.com/community/join-the-community" target="_blank">dbt Slack</a>, or</li>
              <li>access the <a href="https://www.linen.dev/s/meltano"><strong>Meltano Slack Archive</strong></a> &mdash; there's a great chance your question has been asked before!</li>
            </ul>

            <p>
              We're really sorry for the inconvenience and hope that Slack can resolve this promptly.
              If you know anyone at Slack who could help, we'd appreciate it if you could let them know you're locked out of one of your favorite data communities and send them a link to this page.
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
