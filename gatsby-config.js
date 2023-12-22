require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

process.env.GATSBY_SITE_URL = 'https://www.meltano.com/';

module.exports = {
  flags: {
    DEV_SSR: true,
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-google-tagmanager',
      options: {
        id: 'GTM-W3T2VJZ',
        includeInDevelopment: true,
        defaultDataLayer: { platform: 'gatsby' },
        routeChangeEventName: 'gatsby-route-change',
      },
    },
    {
      resolve: `gatsby-source-wordpress`,
      options: {
        url: process.env.WPGRAPHQL_URL,
        auth: {
          htaccess: {
            username: process.env.WPUSERNAME,
            password: process.env.WPPASSWORD,
          },
        },
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `assets`,
        path: `${__dirname}/content/assets`,
      },
    },
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        defaults: {
          placeholder: `none`,
          quality: 100,
        },
      },
    },
    `gatsby-plugin-image`,
    {
      resolve: 'gatsby-plugin-local-search',
      options: {
        name: 'pages',
        engine: 'flexsearch',
        query: `query {
                  allWpPost(sort: { date: DESC }, filter: { status: { eq: "publish" } }) {
                    nodes {
                      id
                      link
                      title
                      categories {
                        nodes {
                          name
                          link
                        }
                      }
                      date(formatString: "MM/DD/YYYY")
                      excerpt
                    }
                  }
                }`,
        ref: 'slug',
        index: ['title', 'excerpt'],
        store: [
          'title',
          'excerpt',
          'date',
          'slug',
          'link',
          'categories',
          'featuredImage',
          'id',
        ],
        normalizer: ({ data }) =>
          data.allWpPost.nodes.map(node => ({
            title: node.title,
            excerpt: node.excerpt,
            date: node.date,
            slug: node.link,
            link: node.link,
            categories: node.categories,
            featuredImage: node.featuredImage,
            id: node.id,
          })),
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Meltano - Build data-powered features in minutes, not days`,
        short_name: `Meltano`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#080216`,
        icon: `content/assets/favicon.png`,
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
        {
          site {
            siteMetadata {
              title
              description
              siteUrl
            }
          }
        }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allWpPost } }) => {
              return allWpPost.edges.map(edge => {
                const customSlug = '/blog/' + edge.node.slug
                let description = edge.node.excerpt
                description = description.replace(/<img[^>]*>/g, '')

                return Object.assign({}, edge.node.frontmatter, {
                  title: edge.node.title,
                  description: description,
                  date: edge.node.date,
                  url: site.siteMetadata.siteUrl + customSlug,
                  guid: site.siteMetadata.siteUrl + customSlug,
                  custom_elements: [{ 'content:encoded': edge.node.content }],
                })
              })
            },

            query: `
            {
              allWpPost(sort: { order: DESC, fields: [date] }) {
                edges {
                  node {
                    title
                    excerpt
                    slug
                  }
                }
              }
            }
            `,
            output: '/rss.xml',
            title: 'Meltano RSS Feed',
            setup: options => ({
              ...options,
              site_url: process.env.GATSBY_SITE_URL,
            }),
          },
        ],
      },
    },
  ],
}

// gatsby cache
