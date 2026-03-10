import React from 'react'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'

import Layout from '../components/layout'
import Seo from '../components/seo'
import IndexHero from '../components/index/hero'
import IndexPartners from '../components/index/partners'
import Engineers from '../components/index/engineers'
import Sources from '../components/index/sources'
import Links from '../components/index/links'
import Workflow from '../components/index/workflow'
import Ultimate from '../components/index/ultimate'
import Community from '../components/index/community'
import Testimonials from '../components/index/testimonials'
import Related from '../components/related'
import { CtaIntrigued } from '../components/cta'
import Video from '../components/index/video'
import CostComparison from '../components/index/costComparison'

const Home = ({ data }) => {
  const {
    themePicker,
    metadata,
    featuredImage,
    hero,
    engineers,
    sources,
    links,
    workflow,
    ultimate,
    community,
    testimonials,
    latest,
    costComparison
  } = data.home.nodes[0]
  const metaImage = featuredImage?.node.localFile.publicURL

  return (
    <Layout>
      <Helmet
        bodyAttributes={{
          class: `home dark ${themePicker.themePicker}`,
        }}
      />
      <Seo
        title={metadata.metaTitle}
        description={metadata.metaDescription}
        image={metaImage}
      />
      <IndexHero data={hero} />
      <IndexPartners />
      {/* <Engineers data={engineers} /> */}
      <Sources data={sources} />
      <Links data={links} />
      <Workflow data={workflow} />
      <CostComparison data={costComparison} />
      {/* <Ultimate data={ultimate} /> */}
      <Testimonials data={testimonials} />
      <Community data={community} />
      <Related data={latest} posts={data.stickyPosts} />
      <CtaIntrigued />
    </Layout>
  )
}

export default Home

export const pageQuery = graphql`
  query {
    home: allWpPage(filter: { title: { eq: "Home" } }) {
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
        hero {
          heroTitle
          heroText
          heroAlign
          heroButton1 {
            title
            url
            target
          }
          heroButton2 {
            title
            url
            target
          }
          heroLink {
            title
            url
            target
          }
        }
        engineers {
          engineersTitle
          engineersText
          engineersHead {
            engineersHeadLeft
            engineersHeadRight
          }
          engineersTable {
            engineersTableText
            engineersTableImage {
              localFile {
                publicURL
              }
            }
          }
        }
        sources {
          sourcesText
          sourcesTitle
          sourcesLink {
            title
            url
            target
          }
        }
        costComparison {
          costCompareLink
          costCompareTitle
          costCategoryTabs{
          categoryTabTitle
          costConnectors{
          connectorLogo{
            mediaItemUrl
          }
          connectorName
          ourPrice
          competitorPrice
        }
      }
    }
        links {
          linksArray {
            linksTitle
            linksText
            linksLink {
              title
              url
              target
            }
          }
        }
        workflow {
          workflowHeading
          workflowDescription
          workflowArray {
            workflowTitle
            workflowSubtitle
            workflowTextArray {
              workflowText
            }
            workflowButtonArray {
              workflowButton {
                title
                url
                target
              }
            }
            workflowWindowTitle
            workflowWindowContent
            workflowWindowLanguage
            workflowVideoOrImage
            workflowUiVideo {
             mediaItemUrl
            }
            workflowUiImage {
              mediaItemUrl
            }
          }
        }
        ultimate {
          ultimateHeading
          ultimateDescription
          ultimateArray {
            ultimateIcon {
              localFile {
                publicURL
              }
            }
            ultimateTitle
            ultimateText
            ultimateLink {
              title
              url
              target
            }
          }
        }
        community {
          communityArray {
            communityIcon {
              localFile {
                publicURL
              }
            }
            communityIconLink {
              target
              title
              url
            }
            communityImage {
              localFile {
                childImageSharp {
                  gatsbyImageData
                }
              }
            }
            communityTitle
            communityDescriptionLink {
              title
              url
              target
            }
          }
        }
        engineers {
          engineersTitle
          engineersText
        }
        testimonials {
          testimonialsHeading
          testimonialsArray {
            testimonialsText
            testimonialsAuthor
            testimonialsImage {
              localFile {
                childImageSharp {
                  gatsbyImageData
                }
              }
            }
          }
        }
        latest {
          latestTitle
          latestLink {
            title
            url
            target
          }
        }
      }
    }
    stickyPosts: allWpPost(
     filter: { databaseId: { in: [6058, 6054, 6043] } }
    ) {
      edges {
        node {
          id
          link
          title
          categories {
            nodes {
              name
              link
            }
          }
          author {
            node {
              name
              avatar {
                url
              }
            }
          }
          date(formatString: "MM/DD/YYYY")
          excerpt
          featuredImage {
            node {
              localFile {
                childImageSharp {
                  gatsbyImageData(aspectRatio: 1.34)
                }
                publicURL
              }
            }
          }
        }
      }
    }
  }
`
