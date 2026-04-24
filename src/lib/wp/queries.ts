/** WPGraphQL documents — field names mirror gatsby-source-wordpress / ACF. */

export const GENERAL_SETTINGS = `
  query GeneralSettings {
    generalSettings {
      title
      description
    }
  }
`;

/** Home page + sticky posts — uses Page title filter (WPGraphQL). */
export const HOME_PAGE = `
  query HomePage {
    pages(first: 1, where: { title: "Home" }) {
      nodes {
        title
        metadata {
          metaTitle
          metaDescription
        }
        featuredImage {
          node {
            sourceUrl
            altText
            mediaDetails { width height }
          }
        }
        themePicker {
          themePicker
        }
        hero {
          heroTitle
          heroText
          heroAlign
          heroButton1 { title url target }
          heroButton2 { title url target }
          heroLink { title url target }
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
              sourceUrl
              mediaDetails { width height }
            }
          }
        }
        sources {
          sourcesText
          sourcesTitle
          sourcesLink { title url target }
        }
        costComparison {
          costCompareLink
          costCompareTitle
          costCategoryTabs {
            categoryTabTitle
            costConnectors {
              connectorLogo { mediaItemUrl }
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
            linksLink { title url target }
          }
        }
        workflow {
          workflowHeading
          workflowDescription
          workflowArray {
            workflowTitle
            workflowSubtitle
            workflowTextArray { workflowText }
            workflowButtonArray { workflowButton { title url target } }
            workflowWindowTitle
            workflowWindowContent
            workflowWindowLanguage
            workflowVideoOrImage
            workflowUiVideo { mediaItemUrl }
            workflowUiImage { mediaItemUrl }
          }
        }
        ultimate {
          ultimateHeading
          ultimateDescription
          ultimateArray {
            ultimateIcon { sourceUrl mediaDetails { width height } }
            ultimateTitle
            ultimateText
            ultimateLink { title url target }
          }
        }
        community {
          communityArray {
            communityIcon { sourceUrl }
            communityIconLink { target title url }
            communityImage {
              sourceUrl
              altText
              mediaDetails { width height }
            }
            communityTitle
            communityDescriptionLink { title url target }
          }
        }
        testimonials {
          testimonialsHeading
          testimonialsArray {
            testimonialsText
            testimonialsAuthor
            testimonialsImage {
              sourceUrl
              altText
              mediaDetails { width height }
            }
          }
        }
        latest {
          latestTitle
          latestLink { title url target }
        }
      }
    }
    stickyPosts: posts(where: { in: [13086, 27779, 27777] }) {
      nodes {
        id
        databaseId
        uri
        title
        categories { nodes { name uri } }
        author { node { name avatar { url } } }
        date
        excerpt
        featuredImage {
          node {
            sourceUrl
            altText
            mediaDetails { width height }
          }
        }
      }
    }
  }
`;
