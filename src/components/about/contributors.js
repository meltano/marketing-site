import { GatsbyImage, StaticImage } from 'gatsby-plugin-image'
import React from 'react'

const Contributors = ({ data }) => (
  <div className="contributors glow-bg section">
    <div className="container">
      <div className="contributors-illustration-wrap">
        <StaticImage
          className="contributors-illustration-img"
          src="../../assets/img/about-illustration.webp"
          alt=""
        />
      </div>

      <div className="heading illustration-offset">
        <h2
          className="title-inline"
          dangerouslySetInnerHTML={{ __html: data.aboutContributorsTitle }}
        />
        <p className="heading-description p2">{data.aboutContributorsText}</p>
      </div>

      <div className="contributors-grid ml-margins">
        {data.aboutContributorsTeam.map(member => (
          <div
            className="contributors-grid-item"
            key={member.aboutContributorsTeamMemberLinkedin.url}
          >
            <div className="contributors-grid-item-info">
              <a
                href={member.aboutContributorsTeamMemberLinkedin.url}
                className="contributors-grid-item-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                >
                  <g>
                    <path
                      d="M15.3366 15.3378H12.6697V11.1599C12.6697 10.1637 12.6518 8.88098 11.2824 8.88098C9.89339 8.88098 9.6807 9.96621 9.6807 11.0867V15.3374H7.01383V6.74816H9.57401V7.92213H9.60854C9.86481 7.48401 10.2351 7.1236 10.68 6.87929C11.1249 6.63498 11.6277 6.51592 12.1349 6.53478C14.838 6.53478 15.3366 8.31299 15.3366 10.626V15.3378ZM4.00445 5.57385C3.6983 5.57392 3.39901 5.4832 3.14442 5.31315C2.88983 5.14311 2.69138 4.90138 2.57418 4.61854C2.45697 4.3357 2.42627 4.02446 2.48596 3.72417C2.54564 3.42389 2.69303 3.14804 2.90949 2.93153C3.12595 2.71502 3.40175 2.56756 3.70201 2.5078C4.00227 2.44805 4.31351 2.47868 4.59636 2.59583C4.87921 2.71298 5.12097 2.91138 5.29107 3.16594C5.46116 3.42049 5.55195 3.71978 5.55195 4.02594C5.55195 4.43641 5.38892 4.83008 5.09872 5.12036C4.80852 5.41064 4.41491 5.57376 4.00445 5.57385ZM5.33789 15.3374H2.66825V6.74816H5.33823L5.33789 15.3374ZM16.6648 0.00165826H1.32791C1.15538 -0.000439017 0.984129 0.0315166 0.823964 0.0956957C0.663799 0.159875 0.517865 0.255017 0.394519 0.375674C0.271172 0.496331 0.172835 0.640134 0.105138 0.798849C0.0374408 0.957564 0.0017127 1.12807 0 1.30062V16.7003C0.00409804 17.0486 0.146291 17.3811 0.395342 17.6246C0.644393 17.8682 0.979934 18.0029 1.32826 17.9992H16.6648C17.0141 18.0039 17.3509 17.8697 17.6012 17.6262C17.8515 17.3826 17.9948 17.0495 17.9997 16.7003V1.29785C17.9947 0.94882 17.8512 0.616065 17.6009 0.372789C17.3506 0.129513 17.0139 -0.00435824 16.6648 0.000622446"
                      fill="white"
                    />
                  </g>
                </svg>
              </a>
              <div className="contributors-grid-item-img-wrap">
                <GatsbyImage
                  className="contributors-grid-item-img"
                  image={
                    member.aboutContributorsTeamMemberImage.localFile
                      .childImageSharp.gatsbyImageData
                  }
                  alt={member.aboutContributorsTeamMemberName}
                />
              </div>
              <h6>{member.aboutContributorsTeamMemberName}</h6>
              <p className="grid-item-location p2">
                {member.aboutContributorsTeamMemberLocation}
              </p>
              <p className="grid-item-rank">
                {member.aboutContributorsTeamMemberRole}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
)
export default Contributors
