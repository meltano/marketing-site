import React from 'react'
import { Link } from 'gatsby'
import SidebarBG from '../../assets/img/hero-sidebar-bg.svg'

const ProductHero = ({ data }) => (
  <div className="hero hero-sidebar section">
    <div className="container">
      <div className="hero-sidebar-container ml-margins">
        <div className="hero-info">
          <h1
            className="hero-title title-inline"
            dangerouslySetInnerHTML={{ __html: data.productHeroTitle }}
          />
          <p className="hero-description p1">{data.productHeroText}</p>
          <div className="hero-buttons">
            <a
              href={data.productHeroButton1.url}
              className="btn alt-blue-btn"
              target={data.productHeroButton1.target}
            >
              {data.productHeroButton1.title}
            </a>
            <a
              href={data.productHeroButton2.url}
              className="btn colorful-btn"
              target={data.productHeroButton2.target}
            >
              <span />
              {data.productHeroButton2.title}
            </a>
          </div>
        </div>
        <div className="hero-sidebar">
          {data.productHeroBox.map(box => (
            <div className="hero-mini-box" key={box.productHeroBoxTitle}>
              <span href="#" className="hero-mini-box-btn">
                {box.productHeroBoxCategory}
              </span>
              <h5
                className="title-inline"
                dangerouslySetInnerHTML={{ __html: box.productHeroBoxTitle }}
              />
              <p className="p2">{box.productHeroBoxText}</p>
              <Link to={box.productHeroBoxLink.url} className="arrow-link">
                {box.productHeroBoxLink.title}{' '}
                <img src="../../assets/img/simple-arrow-right.svg" alt="" />
              </Link>
            </div>
          ))}
        </div>
      </div>
      <div className="hero-sidebar-bg-wrap">
        <img className="hero-sidebar-bg" src={SidebarBG} alt="" />
      </div>
    </div>
  </div>
)

export default ProductHero
