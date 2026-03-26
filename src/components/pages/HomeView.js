'use client'

import React from 'react'

import Seo from '../seo'
import BodyClass from '../BodyClass'
import IndexHero from '../index/hero'
import IndexPartners from '../index/partners'
import Sources from '../index/sources'
import Links from '../index/links'
import Workflow from '../index/workflow'
import Community from '../index/community'
import Testimonials from '../index/testimonials'
import Related from '../related'
import { CtaIntrigued } from '../cta'
import CostComparison from '../index/costComparison'

const HomeView = ({ data }) => {
  const {
    themePicker,
    metadata,
    featuredImage,
    hero,
    sources,
    links,
    workflow,
    community,
    testimonials,
    latest,
    costComparison
  } = data.home.nodes[0]
  const metaImage = featuredImage?.node.localFile.publicURL

  return (
    <>
      <BodyClass className={`home dark ${themePicker?.themePicker ?? ""}`} />
      <Seo
        title={metadata.metaTitle}
        description={metadata.metaDescription}
        image={metaImage}
      />
      <IndexHero data={hero} />
      <IndexPartners />
      <Sources data={sources} />
      <Links data={links} />
      <Workflow data={workflow} />
      <CostComparison data={costComparison} />
      <Testimonials data={testimonials} />
      <Community data={community} />
      <Related data={latest} posts={data.stickyPosts} />
      <CtaIntrigued />
    </>
  )
}

export default HomeView
