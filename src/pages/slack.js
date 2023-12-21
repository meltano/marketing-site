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
              TL;DR: Looking for our community Slack? You can find it on <a href="https://discuss.meltano.com" target="_blank">discuss.meltano.com</a> while we resolve an issue with Slack. We'll be back on meltano.slack.com in the new year!
            </p>

            <hr />

            <p>
              Unfortunately the Meltano Slack community at meltano.slack.com is currently inaccessible as the result of an improper migration by Slack.
            </p>

            <p>
              As part of upgrading our company's internal Slack workspace to Slack Enterprise Grid,
              Slack inadvertently included the separate community Slack workspace as well.
              Post-migration, when the "I can't join Slack!" messages started flowing in, we were told that the Meltano Slack community's <strong>4,200+ members were now completely locked out</strong>,
              and we were given three suboptimal options:
            </p>

            <ol>
              <li>
                Adopt all 4,200+ of them into your enterprise account and <strong>start paying tens of thousands of dollars per month</strong> to keep them.
              </li>
              <li>Engage Slack in a "<strong>paid engagement that is pretty costly</strong> and traditionally has around a <strong>4 week minimum</strong> backlog" to revert the "upgrade".</li>
              <li><strong>Start from scratch</strong> with a new Slack workspace and reinvite everyone.</li>
            </ol>

            <p>
              After trying to work with Slack to find a workable solution, we've decided to go with least-bad option 3 and start a new Slack workspace.
              Slack is helping us transfer over all channels, messages and members, so <strong>expect an invite to reclaim your account after the holidays</strong>!
            </p>

            <p>
              In the mean time, you can access the community via <strong><a href="https://discuss.meltano.com/" target="_blank">discuss.meltano.com</a></strong>, an alternative Slack frontend powered by <a href="https://linen.dev/" target="_blank">Linen.dev</a>.
              Here, you can browse the entire history anonymously or sign in with GitHub or email and start a new conversation.
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
