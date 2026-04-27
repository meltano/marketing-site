/** WPGraphQL documents for Pages Router — field names mirror ACF / gatsby-source-wordpress. */

export const ABOUT_PAGE = `
  query AboutPage {
    pages(first: 1, where: { title: "About" }) {
      nodes {
        title
        metadata { metaTitle metaDescription }
        featuredImage {
          node { sourceUrl altText mediaDetails { width height } }
        }
        themePicker { themePicker }
        aboutHero {
          aboutHeroTitle aboutHeroText
          aboutHeroLink { title url target }
        }
        aboutMission { aboutMissionTitle aboutMissionText }
        aboutQuote {
          aboutQuoteImage { sourceUrl altText mediaDetails { width height } }
          aboutQuoteText aboutQuoteAuthor
        }
        aboutStory {
          aboutStoryTitle
          aboutStoryList { aboutStoryListItem }
        }
        aboutValues {
          aboutValuesTitle
          aboutValuesList {
            aboutValuesItemIcon { sourceUrl }
            aboutValuesItemTitle aboutValuesItemText
          }
        }
        aboutSmallCta {
          aboutSmallCtaTitle
          aboutSmallCtaLink { title url target }
        }
        aboutContributors {
          aboutContributorsTitle aboutContributorsText
          aboutContributorsTeam {
            aboutContributorsTeamMemberName
            aboutContributorsTeamMemberLocation
            aboutContributorsTeamMemberRole
            aboutContributorsTeamMemberLinkedin { url }
            aboutContributorsTeamMemberImage {
              sourceUrl altText mediaDetails { width height }
            }
          }
        }
        aboutInvestors {
          aboutInvestorsTitle aboutInvestorsText
          aboutInvestorsList {
            aboutInvestorsListLink { url target }
            aboutInvestorsListImage { sourceUrl altText mediaDetails { width height } }
          }
        }
      }
    }
  }
`;

export const CONTACT_PAGE = `
  query ContactPage {
    pages(first: 1, where: { title: "Contact" }) {
      nodes {
        title
        metadata { metaTitle metaDescription }
        featuredImage {
          node { sourceUrl altText mediaDetails { width height } }
        }
        themePicker { themePicker }
        contactHero { contactHeroTitle contactHeroText }
        contactForm {
          contactFormTitle contactFormText
          contactFormHubspot {
            contactFormHubspotPortalId contactFormHubspotFormId
          }
          contactFormLinks {
            contactFormLinksIcon { sourceUrl }
            contactFormLinksTitle
            contactFormLinksLink { title url target }
          }
        }
      }
    }
  }
`;

export const COMMUNITY_PAGE = `
  query CommunityPage {
    pages(first: 1, where: { title: "Community" }) {
      nodes {
        title
        metadata { metaTitle metaDescription }
        featuredImage {
          node { sourceUrl altText mediaDetails { width height } }
        }
        themePicker { themePicker }
        communityHero { communityHeroTitle communityHeroText }
        communityBuild {
          communityBuildTitle communityBuildText
          communityBuildBoxes {
            communityBuildBoxesIcon { sourceUrl }
            communityBuildBoxesTitle communityBuildBoxesText
            communityBuildBoxesLink { title url target }
          }
        }
        communityEvents {
          communityEventsTitle
          communityEventsIcon { sourceUrl }
          communityEventsText
          communityEventsLink { title url target }
        }
        communityGear {
          communityGearTitle communityGearText
          communityGearType {
            communityGearTypeName
            communityGearTypeItems {
              communityGearTypeItemsIcon { sourceUrl }
              communityGearTypeItemsTitle
              communityGearTypeItemsDescription
              communityGearTypeItemsLink { title url target }
            }
          }
        }
      }
    }
  }
`;

export const PRICING_PAGE = `
  query PricingPage {
    pages(first: 1, where: { title: "Pricing" }) {
      nodes {
        title
        metadata { metaTitle metaDescription }
        featuredImage {
          node { sourceUrl altText mediaDetails { width height } }
        }
        themePicker { themePicker }
        pricingHero {
          pricingHeroTitle
          pricingHeroText
        }
        pricingTable {
          pricingTableItem {
            pricingTableItemTitle pricingTableItemTier
            pricingTableItemIcon { sourceUrl }
            pricingTableItemDescription
            pricingTableItemList { pricingTableItemListItem }
            pricingTableItemLink { title url target }
          }
        }
        costComparison {
          costCompareLink costCompareTitle
          costCategoryTabs {
            categoryTabTitle
            costConnectors {
              connectorLogo { mediaItemUrl }
              connectorName ourPrice competitorPrice
            }
          }
        }
        contactFaq {
          contactFaqTitle
          contactFaqList {
            contactFaqItem {
              contactFaqItemQuestion contactFaqItemAnswer
            }
          }
        }
      }
    }
  }
`;

export const PRODUCT_PAGE = `
  query ProductPage {
    pages(first: 1, where: { title: "Product" }) {
      nodes {
        title
        metadata { metaTitle metaDescription }
        featuredImage {
          node { sourceUrl altText mediaDetails { width height } }
        }
        themePicker { themePicker }
        productHero {
          productHeroTitle productHeroText
          productHeroButton1 { title url target }
          productHeroButton2 { title url target }
          productHeroBox {
            productHeroBoxCategory productHeroBoxTitle productHeroBoxText
            productHeroBoxLink { title url target }
          }
        }
        productTabs {
          productTabsTitle
          productTab {
            productTabNumber productTabTitle productTabExperienceTitle
            productTabBenefits {
              productTabBenefitsTitle
              productTabBenefitsItems {
                productTabBenefitsItemImage {
                  sourceUrl
                  mediaDetails {
                    width
                    height
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
              productTabExperienceContentLink { title url target }
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
          productDifferenceTitle productDifferenceDescription
          productDifferenceBox {
            productDifferenceBoxTitle
            productDifferenceBoxList { productDifferenceBoxListItem }
          }
        }
        latest {
          latestTitle
          latestLink { title url target }
        }
      }
    }
    latestPosts: posts(first: 3, where: { status: PUBLISH }) {
      nodes {
        id databaseId uri title excerpt date
        categories { nodes { name uri } }
        author { node { name avatar { url } } }
        featuredImage {
          node { sourceUrl altText mediaDetails { width height } }
        }
      }
    }
  }
`;

export const PRESS_PAGE = `
  query PressPage {
    pages(first: 1, where: { title: "Press" }) {
      nodes {
        title
        metadata { metaTitle metaDescription }
        featuredImage {
          node { sourceUrl altText mediaDetails { width height } }
        }
        themePicker { themePicker }
        pressHero { pressHeroTitle pressHeroText }
        pressTabs {
          pressTabsTab {
            pressTabsTabTitle
            pressTabsTabContent {
              pressTabsTabContentTitle pressTabsTabContentText
              pressTabsTabContentLink { title url target }
              pressTabsTabContentImage {
                sourceUrl altText mediaDetails { width height }
              }
            }
            pressTabsTabContentLogos {
              pressTabsTabContentLogosTitle pressTabsTabContentLogosText
              pressTabsTabContentLogosList {
                pressTabsTabContentLogosListTitle
                pressTabsTabContentLogosListImage {
                  mediaItemUrl sourceUrl
                  mediaDetails { width height }
                }
                pressTabsTabContentLogosListLinks {
                  pressTabsTabContentLogosListLinksItem {
                    mediaItemUrl sourceUrl
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const PARTNERS_PAGE = `
  query PartnersPage {
    pages(first: 1, where: { title: "Partners" }) {
      nodes {
        title
        metadata { metaTitle metaDescription }
        featuredImage {
          node { sourceUrl altText mediaDetails { width height } }
        }
        themePicker { themePicker }
        partnersHero { partnersHeroTitle partnersHeroText }
        partnersMeet {
          partnersMeetGroup {
            partnersMeetGroupImage {
              sourceUrl altText mediaDetails { width height }
            }
            partnersMeetGroupLink { title url target }
          }
        }
        partnersForm {
          partnersFormTitle partnersFormText
          partnersFormHubspot {
            partnersFormHubspotPortalId partnersFormHubspotFormId
          }
        }
      }
    }
  }
`;

/** Only fields that exist on `Page` in your WPGraphQL schema. If ACF exposes
 *  calculator copy / `connectorPricing` under different names, add them here
 *  (see WPGraphQL → Schema or GraphiQL introspection). */
export const PRICING_CALCULATOR_PAGE = `
  query PricingCalculatorPage {
    pages(first: 1, where: { title: "pricingcalculator" }) {
      nodes {
        title
        themePicker { themePicker }
      }
    }
  }
`;

export const TERMS_PAGE = `
  query TermsPage {
    pages(first: 1, where: { title: "Terms of service" }) {
      nodes {
        title
        metadata { metaTitle metaDescription }
        featuredImage {
          node { sourceUrl altText mediaDetails { width height } }
        }
        themePicker { themePicker }
        content(format: RENDERED)
      }
    }
  }
`;

export const PRIVACY_PAGE = `
  query PrivacyPage {
    pages(first: 1, where: { title: "Privacy policy" }) {
      nodes {
        title
        metadata { metaTitle metaDescription }
        featuredImage {
          node { sourceUrl altText mediaDetails { width height } }
        }
        themePicker { themePicker }
        content(format: RENDERED)
      }
    }
  }
`;

export const DPA_PAGE = `
  query DpaPage {
    pages(first: 1, where: { title: "Data Processing Addendum" }) {
      nodes {
        title
        metadata { metaTitle metaDescription }
        featuredImage {
          node { sourceUrl altText mediaDetails { width height } }
        }
        themePicker { themePicker }
        content(format: RENDERED)
      }
    }
  }
`;

export const THANK_YOU_PAGE = `
  query ThankYouPage {
    pages(first: 1, where: { title: "Thank you" }) {
      nodes {
        title
        metadata { metaTitle metaDescription }
        featuredImage {
          node { sourceUrl altText mediaDetails { width height } }
        }
        themePicker { themePicker }
        thankYouHero { thankYouHeroTitle thankYouHeroText }
      }
    }
  }
`;

export const NOT_FOUND_PAGE = `
  query NotFoundPage {
    pages(first: 1, where: { title: "404" }) {
      nodes {
        title
        metadata { metaTitle metaDescription }
        featuredImage {
          node { sourceUrl altText mediaDetails { width height } }
        }
        themePicker { themePicker }
      }
    }
  }
`;

export const BLOG_PAGE = `
  query BlogPage {
    pages(first: 1, where: { title: "Blog" }) {
      nodes {
        title
        metadata { metaTitle metaDescription }
        featuredBlogImage: featuredImage {
          node { sourceUrl altText mediaDetails { width height } }
        }
        themePicker { themePicker }
        blogHero { blogHeroTitle blogHeroDescription blogHeroSubDescription }
      }
    }
    posts(first: 200, where: { status: PUBLISH }) {
      nodes {
        id databaseId uri title excerpt date
        posts { shortDescription longDescription }
        categories { nodes { name uri } }
        author { node { name avatar { url } } }
        featuredImage {
          node { sourceUrl altText mediaDetails { width height } }
        }
      }
    }
    categories(first: 100, where: { hideEmpty: true }) {
      nodes { name }
    }
  }
`;

export const BLOG_POST_SLUGS = `
  query BlogPostSlugs($after: String) {
    posts(first: 100, after: $after, where: { status: PUBLISH }) {
      nodes {
        slug
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

export const BLOG_POST_PAGE = `
  query BlogPostPage($slug: ID!) {
    post(id: $slug, idType: SLUG) {
      id
      databaseId
      uri
      slug
      title
      excerpt
      content(format: RENDERED)
      posts { shortDescription longDescription }
      date
      categories { nodes { name uri } }
      author { node { name avatar { url } } }
      featuredImage {
        node { sourceUrl altText mediaDetails { width height } }
      }
    }
    posts(first: 200, where: { status: PUBLISH }) {
      nodes {
        id
        uri
        slug
        date
        title
      }
    }
  }
`;
