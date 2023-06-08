import React from 'react'
import { graphql } from 'gatsby'

import { Helmet } from 'react-helmet'
import Layout from '../components/layout'
import Seo from '../components/seo'
import AboutHero from '../components/about/hero'
import Mission from '../components/about/mission'
import Quote from '../components/about/quote'
import Story from '../components/about/story'
import Values from '../components/about/values'
import SmallCta from '../components/about/smallcta'
import Contributors from '../components/about/contributors'
import Investors from '../components/about/investors'

const About = ({ data }) => {
  const {
    metadata,
    featuredImage,
    aboutHero,
    aboutMission,
    aboutQuote,
    aboutStory,
    aboutValues,
    aboutSmallCta,
    aboutContributors,
    aboutInvestors,
    themePicker,
  } = data.about.nodes[0]
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
      <AboutHero data={aboutHero} />
      <Mission data={aboutMission} />
      <Quote data={aboutQuote} />
      <Story data={aboutStory} />
      <Values data={aboutValues} />
      <SmallCta data={aboutSmallCta} />
      <Contributors data={aboutContributors} />
      <Investors data={aboutInvestors} />
    </Layout>
  )
}
export default About

export const pageQuery = graphql`
  query {
    about: allWpPage(filter: { title: { eq: "About" } }) {
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
        aboutHero {
          aboutHeroTitle
          aboutHeroText
          aboutHeroLink {
            title
            url
            target
          }
        }
        aboutMission {
          aboutMissionTitle
          aboutMissionText
        }
        aboutQuote {
          aboutQuoteImage {
            localFile {
              childImageSharp {
                gatsbyImageData
              }
            }
          }
          aboutQuoteText
          aboutQuoteAuthor
        }
        aboutStory {
          aboutStoryTitle
          aboutStoryList {
            aboutStoryListItem
          }
        }
        aboutValues {
          aboutValuesTitle
          aboutValuesList {
            aboutValuesItemIcon {
              localFile {
                publicURL
              }
            }
            aboutValuesItemTitle
            aboutValuesItemText
          }
        }
        aboutSmallCta {
          aboutSmallCtaTitle
          aboutSmallCtaLink {
            title
            url
            target
          }
        }
        aboutContributors {
          aboutContributorsTitle
          aboutContributorsText
          aboutContributorsTeam {
            aboutContributorsTeamMemberName
            aboutContributorsTeamMemberLocation
            aboutContributorsTeamMemberRole
            aboutContributorsTeamMemberLinkedin {
              url
            }
            aboutContributorsTeamMemberImage {
              localFile {
                childImageSharp {
                  gatsbyImageData
                }
              }
            }
          }
        }
        aboutInvestors {
          aboutInvestorsTitle
          aboutInvestorsText
          aboutInvestorsList {
            aboutInvestorsListLink {
              url
              target
            }
            aboutInvestorsListImage {
              localFile {
                childImageSharp {
                  gatsbyImageData
                }
              }
            }
          }
        }
      }
    }
  }
`
