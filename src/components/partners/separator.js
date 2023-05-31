import React from 'react'
import { StaticImage } from 'gatsby-plugin-image'

const Separator = () => (
  <div className="castle-separator">
    <StaticImage
      className="castle-separator-img"
      src="../../assets/img/image-separator-castle.webp"
      layout="fixed"
      transformOptions={{ fit: 'contain' }}
      alt=""
    />
  </div>
)

export default Separator
