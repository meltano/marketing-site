import React from 'react'
import { graphql } from 'gatsby'

import { Helmet } from 'react-helmet'
import Layout from '../components/layout'
import Seo from '../components/seo'
import CommunityHero from '../components/community/hero'
import Build from '../components/community/build'
import Events from '../components/community/events'
import Gear from '../components/community/gear'

const Community = ({ data }) => {
  const {
    metadata,
    featuredImage,
    themePicker,
    communityHero,
    communityBuild,
    communityEvents,
    communityGear,
  } = data.community.nodes[0]
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
      <CommunityHero data={communityHero} />
      <Build data={communityBuild} />
      <Events data={communityEvents} />
      <Gear data={communityGear} />
    </Layout>
  )
}

export default Community

export const pageQuery = graphql`
  query {
    community: allWpPage(filter: { title: { eq: "Community" } }) {
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
        communityHero {
          communityHeroTitle
          communityHeroText
        }
        communityBuild {
          communityBuildTitle
          communityBuildText
          communityBuildBoxes {
            communityBuildBoxesIcon {
              localFile {
                publicURL
              }
            }
            communityBuildBoxesTitle
            communityBuildBoxesText
            communityBuildBoxesLink {
              title
              url
              target
            }
          }
        }
        communityEvents {
          communityEventsTitle
          communityEventsIcon {
            localFile {
              publicURL
            }
          }
          communityEventsText
          communityEventsLink {
            title
            url
            target
          }
        }
        communityGear {
          communityGearTitle
          communityGearText
          communityGearType {
            communityGearTypeName
            communityGearTypeItems {
              communityGearTypeItemsIcon {
                localFile {
                  publicURL
                }
              }
              communityGearTypeItemsTitle
              communityGearTypeItemsDescription
              communityGearTypeItemsLink {
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
`
