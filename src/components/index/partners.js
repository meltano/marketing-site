import React from 'react'
import { Link } from "gatsby"
import cityprient from '../../assets/img/clientlogo/citysprint_logo.webp'
import logo300 from '../../assets/img/clientlogo/logo-300x98.webp'
import ra from '../../assets/img/clientlogo/a500px-ResidentAdvisor_logo.png'
import mvf from '../../assets/img/clientlogo/MVF_Logo_Navy.webp'
import fiveXLogo from '../../assets/img/clientlogo/fivex_logo.svg'
import consilLogo from '../../assets/img/clientlogo/Consil_logo.png'
import ifgLogo from '../../assets/img/clientlogo/IFG_logo.svg'
import lotusLabsLogo from '../../assets/img/clientlogo/Lotus_Labs_logo.png'
import sessionLogo from '../../assets/img/clientlogo/session-climbing_logo.png'
import vertexLogo from '../../assets/img/clientlogo/Vertex_logo.svg'
import vieveLogo from '../../assets/img/clientlogo/VIEVE_logo.svg'
import woomLogo from '../../assets/img/clientlogo/Woom_logo.svg'

const logos = [
  { img: cityprient, link: "#testimonials", alt: "CitySprint", type: "anchor" },
  { img: logo300, link: "blog/the-little-bike-company-boosts-monthly-productivity-by-20-with-meltanos-streamlined-solution/", alt: "Little Bike", type: "anchor" },
  { img: ra, link: "/blog/how-resident-advisor-escaped-year-long-etl-firefighting/", alt: "Resident Advisor", type: "anchor" },
  { img: mvf, link: "/blog/mvf-makes-etl-7x-cheaper-while-migrating-1b-rows-across-60-sources/", alt: "MVF", type: "anchor" },
  { img: fiveXLogo, link: "/blog/", alt: "5X", type: "anchor" },
  { img: consilLogo, link: "/blog/", alt: "Consil", type: "anchor" },
  { img: ifgLogo, link: "/blog/", alt: "IFG", type: "anchor" },
  { img: lotusLabsLogo, link: "/blog/", alt: "Lotus Labs", type: "anchor" },
  { img: sessionLogo, link: "/blog/", alt: "Session Climbing", type: "anchor" },
  { img: vertexLogo, link: "/blog/", alt: "Vertex", type: "anchor" },
  { img: vieveLogo, link: "/blog/", alt: "VIEVE", type: "anchor" },
  { img: woomLogo, link: "/blog/", alt: "Woom", type: "anchor" },
]

const IndexPartners = () => (
  <>
    <div className="logos-section loved-by-data-teams section">
      <div className="container">
        <p className="logos-title">Loved by data teams</p>
        <div className="logos">
          <div className="logo-marquee">
            <div className="logo-track">
              {[...logos, ...logos].map((logo, i) => {
                const Wrapper =
                  logo.type === "anchor" ? (
                    <a href={logo.link}>
                      <img src={logo.img} alt={logo.alt} />
                    </a>
                  ) : (
                    <Link to={logo.link}>
                      <img src={logo.img} alt={logo.alt} />
                    </Link>
                  )

                return (
                  <div className="logo-item" key={i}>
                    {Wrapper}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="loved-by-data-teams-split" />
  </>
)

export default IndexPartners
