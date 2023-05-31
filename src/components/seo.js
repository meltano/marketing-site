import React from 'react'
import { Helmet } from 'react-helmet'
import { useStaticQuery, graphql } from 'gatsby'
import MetaImage from '../assets/img/ogimg.png'

const Seo = ({ title, description, image, article, summary, date }) => {
  const data = useStaticQuery(
    graphql`
      query {
        wp {
          generalSettings {
            title
            description
          }
        }
      }
    `
  )

  const site = data.wp.generalSettings
  const metaImage = MetaImage

  const seo = {
    title: title || site.title,
    description: description || site.description,
    image: `https://meltano.com${image || metaImage}`,
    article,
    summary,
    date,
  }

  return (
    <Helmet title={seo.title} defer={false}>
      <html lang="en" />
      <meta httpEquiv="content-language" content="en" />
      <title>{seo.title}</title>
      <meta name="title" content={seo.title} />
      <meta name="description" content={seo.description} />
      <meta name="image" content={seo.image} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:url" content={seo.url} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={seo.image} />
      <meta name="twitter:image:alt" content={seo.title} />
      <meta property="og:url" content={seo.url} />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:image" content={seo.image} />
      {seo.article && <meta property="og:type" content="article" />}
      {seo.summary && seo.summary.length !== 0 && (
        <meta name="summary" content={summary} />
      )}
      {seo.date && <meta name="article:published_time" content={date} />}
    </Helmet>
  )
}

export default Seo
