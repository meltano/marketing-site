import React from 'react'
import NetlifyIcon from '../../assets/img/netify.svg'
import HackeroneIcon from '../../assets/img/hackerone.svg'
import GitlabIcon from '../../assets/img/gitlub.svg'
import ZapierIcon from '../../assets/img/zapier.svg'
import RemoteIcon from '../../assets/img/remote.svg'
import cityprient from '../../assets/img/clientlogo/citysprint-768x271.png (1).webp'
import logo300 from '../../assets/img/clientlogo/logo-300x98.png.webp'
import ra from '../../assets/img/clientlogo/ra-logo (1).png'
import mvf from '../../assets/img/clientlogo/MVF_Logo_Navy.png.webp'
import city from '../../assets/img/clientlogo/city-logo-approved (2).svg'



const IndexPartners = () => (
  <>
    <div className="logos-section loved-by-data-teams section">
      <div className="container">
        <p className="logos-title">Loved by data teams</p>
        <div className="logos">
          <a
            href="#testimonials"
            rel="noopener noreferrer"
          >
            <img src={cityprient} alt="Netlify" />
          </a>
          <a
            href="blog/the-little-bike-company-boosts-monthly-productivity-by-20-with-meltanos-streamlined-solution"
            rel="noopener noreferrer"
          >
            <img src={logo300} alt="little-bike" />
          </a>
          <a
            href="/blog/how-resident-advisor-escaped-year-long-etl-firefighting"
            rel="noopener noreferrer"
          >
            <img src={ra} alt="ra" />
          </a>
          <a
            href="/blog/mvf-makes-etl-7x-cheaper-while-migrating-1b-rows-across-60-sources"
            rel="noopener noreferrer"
          >
            <img src={mvf} alt="mvf" />
          </a>
          <a
            href="/blog/cbes-increased-revenue-through-customer-service-intelligence"
            rel="noopener noreferrer"
          >
            <img src={city} alt="city" />
          </a>
        </div>
      </div>
    </div>
    <div className="loved-by-data-teams-split" />
  </>
)

export default IndexPartners
