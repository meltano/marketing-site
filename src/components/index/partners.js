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
            href="#testimonials"
            rel="noopener noreferrer"
          >
            <img src={logo300} alt="hackerone" />
          </a>
          <a
            href="#testimonials"
            rel="noopener noreferrer"
          >
            <img src={ra} alt="gitlab" />
          </a>
          <a
            href="#testimonials"
            rel="noopener noreferrer"
          >
            <img src={mvf} alt="zapier" />
          </a>
          <a
            href="#testimonials"
            rel="noopener noreferrer"
          >
            <img src={city} alt="remote" />
          </a>
        </div>
      </div>
    </div>
    <div className="loved-by-data-teams-split" />
  </>
)

export default IndexPartners
