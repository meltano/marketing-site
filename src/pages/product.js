import React from 'react'
import { graphql } from 'gatsby'

import { Helmet } from 'react-helmet'
import Layout from '../components/layout'
import Seo from '../components/seo'
import ProductHero from '../components/product/hero'
import ProductTabs from '../components/product/tabs'
import ProductDifference from '../components/product/difference'
import { CtaYourself } from '../components/cta'
import Related from '../components/related'

const Product = ({ data, location }) => {
  const {
    metadata,
    featuredImage,
    themePicker,
    productHero,
    productTabs,
    productDifference,
    latest,
  } = data.product.nodes[0]
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
      <ProductHero data={productHero} />
      <ProductTabs data={productTabs} location={location} />
      <ProductDifference data={productDifference} />
      <CtaYourself />
      <Related data={latest} posts={data.stickyPosts} />
    </Layout>
  )
}

export default Product

export const pageQuery = graphql`
  query {
    product: allWpPage(filter: { title: { eq: "Product" } }) {
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
        productHero {
          productHeroTitle
          productHeroText
          productHeroButton1 {
            title
            url
            target
          }
          productHeroButton2 {
            title
            url
            target
          }
          productHeroBox {
            productHeroBoxCategory
            productHeroBoxTitle
            productHeroBoxText
            productHeroBoxLink {
              title
              url
              target
            }
          }
        }
        productTabs {
          productTabsTitle
          productTab {
            productTabNumber
            productTabTitle
            productTabExperienceTitle
            productTabBenefits {
              productTabBenefitsTitle
              productTabBenefitsItems {
                productTabBenefitsItemImage {
                  localFile {
                    publicURL
                  }
                }
                productTabBenefitsItemText
              }
            }
            productTabExperienceContent {
              productTabExperienceContentNumber
              productTabExperienceContentTitle
              productTabExperienceContentColor
              productTabExperienceContentDescription
              productTabExperienceContentLink {
                title
                url
                target
              }
              productTabExperienceContentTabs {
                productTabExperienceContentTabNumber
                productTabExperienceContentTabTitle
                productTabExperienceContentTabWindows {
                  productTabExperienceContentTabWindowTitle
                  productTabExperienceContentTabWindowContent
                  productTabExperienceContentTabWindowHighlight
                  productTabExperienceContentTabWindowLanguage
                }
              }
            }
          }
        }
        productDifference {
          productDifferenceTitle
          productDifferenceDescription
          productDifferenceBox {
            productDifferenceBoxTitle
            productDifferenceBoxList {
              productDifferenceBoxListItem
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
