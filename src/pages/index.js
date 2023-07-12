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
      <Engineers data={engineers} />
      <Links data={links} />
      <Sources data={sources} />
      <Workflow data={workflow} />
      <Ultimate data={ultimate} />
      <Community data={community} />
      <Testimonials data={testimonials} />
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
      sort: { date: DESC }
      filter: { status: { eq: "publish" }, isSticky: { eq: true } }
      limit: 3
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
