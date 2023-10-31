import React from 'react'
import NetlifyIcon from '../assets/img/netlify.svg'
import HackeroneIcon from '../assets/img/hackerone.svg'
import GitlabIcon from '../assets/img/gitlub.svg'
import ZapierIcon from '../assets/img/zapier.svg'
import RemoteIcon from '../assets/img/remote.svg'

const Partners = ({ data }) => (
  <div className="logos-section logos-diamond-bg section">
    <div className="container">
      <div className="heading">
        <h2>1,000+ organizations</h2>
        <h4>integrate their data using Meltano</h4>
      </div>
      <div className="logos">
        <a
          href="https://www.netlify.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={NetlifyIcon} alt="netlify" />
        </a>
        <a
          href="https://www.hackerone.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={HackeroneIcon} alt="hackerone" />
        </a>
        <a
          href="https://about.gitlab.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={GitlabIcon} alt="gitlab" />
        </a>
        <a href="https://zapier.com/" target="_blank" rel="noopener noreferrer">
          <img src={ZapierIcon} alt="zapier" />
        </a>
        <a href="https://remote.com/" target="_blank" rel="noopener noreferrer">
          <img src={RemoteIcon} alt="remote" />
        </a>
      </div>
    </div>
  </div>
)

export default Partners
