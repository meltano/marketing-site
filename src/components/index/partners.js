import React from 'react'
import NetlifyIcon from '../../assets/img/netlify.svg'
import HackeroneIcon from '../../assets/img/hackerone.svg'
import GitlabIcon from '../../assets/img/gitlub.svg'
import ZapierIcon from '../../assets/img/zapier.svg'
import RemoteIcon from '../../assets/img/remote.svg'

const IndexPartners = () => (
  <>
    <div className="logos-section loved-by-data-teams section">
      <div className="container">
        <p className="logos-title">Loved by data teams</p>
        <div className="logos">
          <a
            href="https://www.netlify.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={NetlifyIcon} alt="Netlify" />
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
          <a
            href="https://zapier.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={ZapierIcon} alt="zapier" />
          </a>
          <a
            href="https://remote.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={RemoteIcon} alt="remote" />
          </a>
        </div>
      </div>
    </div>
    <div className="loved-by-data-teams-split" />
  </>
)

export default IndexPartners
