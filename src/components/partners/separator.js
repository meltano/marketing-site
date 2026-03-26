import React from 'react'
import StaticImage from '@/components/compat/StaticImage'

const Separator = () => (
  <div className="castle-separator">
    <StaticImage
      className="castle-separator-img"
      src="../../assets/img/image-separator-castle.webp"
      transformOptions={{ fit: 'contain' }}
      alt=""
    />
  </div>
)

export default Separator
