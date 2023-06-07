const path = require(`path`)
const loc = require(`path`)

// This is a simple debugging tool
// dd() will prettily dump to the terminal and kill the process
// const { dd } = require(`dumper.js`)

exports.createPages = async gatsbyUtilities => {
  const landingPage = loc.resolve(`./src/templates/landingPages.js`)

  const landingPageResult = await gatsbyUtilities.graphql(`
    {
      landingPages: allWpLandingPage(filter: { status: { eq: "publish" } }) {
        edges {
          node {
            id
            title
            status
            link
            slug
          }
        }
      }
    }
  `)

  if (typeof landingPageResult !== 'undefined') {
    landingPageResult.data.landingPages.edges.forEach(({ node }) => {
      gatsbyUtilities.actions.createPage({
        path: node.link,
        id: node.id,
        component: landingPage,
        context: {
          slug: node.slug,
        },
        title: node.title,
      })
    })
  }

  const posts = await getPosts(gatsbyUtilities)

  if (!posts.length) {
    return
  }

  await createIndividualBlogPostPages({ posts, gatsbyUtilities })
}

exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `WpLandingPage` && node.link !== null) {
    const slug = node.link
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}

/**
 * This function creates all the individual blog pages in this site
 */
const createIndividualBlogPostPages = async ({ posts, gatsbyUtilities }) =>
  Promise.all(
    posts.map(({ previous, post, next }) =>
      // createPage is an action passed to createPages
      // See https://www.gatsbyjs.com/docs/actions#createPage for more info
      gatsbyUtilities.actions.createPage({
        // Use the WordPress uri as the Gatsby page path
        // This is a good idea so that internal links and menus work 👍
        path: `blog${post.uri}`,

        // use the blog post template as the page component
        component: path.resolve(`./src/templates/blog-post.js`),

        // `context` is available in the template as a prop and
        // as a variable in GraphQL.
        context: {
          // we need to add the post id here
          // so our blog post template knows which blog post
          // the current page is (when you open it in a browser)
          id: post.id,

          // We also use the next and previous id's to query them and add links!
          previousPostId: previous ? previous.id : null,
          nextPostId: next ? next.id : null,
        },
      })
    )
  )

/**
 * This function queries Gatsby's GraphQL server and asks for
 * All WordPress blog posts. If there are any GraphQL error it throws an error
 * Otherwise it will return the posts 🙌
 *
 * We're passing in the utilities we got from createPages.
 * So see https://www.gatsbyjs.com/docs/node-apis/#createPages for more info!
 */
async function getPosts({ graphql, reporter }) {
  const graphqlResult = await graphql(/* GraphQL */ `
    query WpPosts {
      # Query all WordPress blog posts sorted by date
      allWpPost(sort: { date: DESC }) {
        edges {
          previous {
            id
          }
          post: node {
            id
            uri
          }
          next {
            id
          }
        }
      }
    }
  `)

  if (graphqlResult.errors) {
    reporter.panicOnBuild(
      `There was an error loading your blog posts`,
      graphqlResult.errors
    )
    return
  }

  return graphqlResult.data.allWpPost.edges
}
