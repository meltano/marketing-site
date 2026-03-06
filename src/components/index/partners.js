import React from 'react'
import NetlifyIcon from '../../assets/img/netify.svg'
import HackeroneIcon from '../../assets/img/hackerone.svg'
import GitlabIcon from '../../assets/img/gitlub.svg'
import ZapierIcon from '../../assets/img/zapier.svg'
import RemoteIcon from '../../assets/img/remote.svg'
import cityprient from '../../assets/img/clientlogo/citysprint-768x271.png (1).webp'
import logo300 from '../../assets/img/clientlogo/logo-300x98.png.webp'
import ra from '../../assets/img/clientlogo/500px-ResidentAdvisor_logo.png'
import mvf from '../../assets/img/clientlogo/MVF_Logo_Navy.png.webp'
import city from '../../assets/img/clientlogo/city-logo-approved (2).svg'

import fiveXLogo from '../../assets/img/clientlogo/5x_logo.svg'
import consilLogo from '../../assets/img/clientlogo/Consil_logo.png'
import ifgLogo from '../../assets/img/clientlogo/IFG_logo.svg'
import lotusLabsLogo from '../../assets/img/clientlogo/Lotus_Labs_logo.png'
import sessionLogo from '../../assets/img/clientlogo/session-climbing_logo.png'
import vertexLogo from '../../assets/img/clientlogo/Vertex_logo.svg'
import vieveLogo from '../../assets/img/clientlogo/VIEVE_logo.svg'
import woomLogo from '../../assets/img/clientlogo/Woom_logo.svg'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper'

import 'swiper/css'

const IndexPartners = () => (
  <>
    <div className="logos-section loved-by-data-teams section">
      <div className="container">
        <p className="logos-title">Loved by data teams</p>
        <div className="logos">
          <Swiper
            modules={[Autoplay]}
            slidesPerView="auto"
            spaceBetween={60}
            loop={true}
            speed={4000}
            autoplay={{
              delay: 0,
              disableOnInteraction: false,
            }}
          >
            <SwiperSlide>
              
              <a href="#testimonials" rel="noopener noreferrer">
                <img src={cityprient} alt="Netlify" />
              </a>
            </SwiperSlide>
            <SwiperSlide>
              
              <a
                href="blog/the-little-bike-company-boosts-monthly-productivity-by-20-with-meltanos-streamlined-solution"
                rel="noopener noreferrer"
              >
                <img src={logo300} alt="little-bike" />
              </a>
            </SwiperSlide>
            <SwiperSlide>
              
              <a
                href="/blog/how-resident-advisor-escaped-year-long-etl-firefighting"
                rel="noopener noreferrer"
              >
                <img src={ra} alt="ra" />
              </a>
            </SwiperSlide>
            <SwiperSlide>
              
              <a
                href="/blog/mvf-makes-etl-7x-cheaper-while-migrating-1b-rows-across-60-sources"
                rel="noopener noreferrer"
              >
                <img src={mvf} alt="mvf" />
              </a>
            </SwiperSlide>
            <SwiperSlide>
              
              <a
                href="/blog/cbes-increased-revenue-through-customer-service-intelligence"
                rel="noopener noreferrer"
              >
                <img src={fiveXLogo} alt="5X logo" />
              </a>
            </SwiperSlide>
            <SwiperSlide>
              
              <a
                href="/blog/cbes-increased-revenue-through-customer-service-intelligence"
                rel="noopener noreferrer"
              >
                <img src={consilLogo} alt="Consil logo" />
              </a>
            </SwiperSlide>
            <SwiperSlide>
              
              <a
                href="/blog/cbes-increased-revenue-through-customer-service-intelligence"
                rel="noopener noreferrer"
              >
                <img src={ifgLogo} alt="IFG logo" />
              </a>
            </SwiperSlide>
            <SwiperSlide>
              
              <a
                href="/blog/cbes-increased-revenue-through-customer-service-intelligence"
                rel="noopener noreferrer"
              >
                <img src={lotusLabsLogo} alt="Lotus Labs logo" />
              </a>
            </SwiperSlide>
            <SwiperSlide>
              
              <a
                href="/blog/cbes-increased-revenue-through-customer-service-intelligence"
                rel="noopener noreferrer"
              >
                <img src={sessionLogo} alt="Session Climbing logo" />
              </a>
            </SwiperSlide>
            <SwiperSlide>
              
              <a
                href="/blog/cbes-increased-revenue-through-customer-service-intelligence"
                rel="noopener noreferrer"
              >
                <img src={vertexLogo} alt="Vertex logo" />
              </a>
            </SwiperSlide>
            <SwiperSlide>
              
              <a
                href="/blog/cbes-increased-revenue-through-customer-service-intelligence"
                rel="noopener noreferrer"
              >
                <img src={vieveLogo} alt="VIEVE logo" />
              </a>
            </SwiperSlide>
            <SwiperSlide>
              
              <a
                href="/blog/cbes-increased-revenue-through-customer-service-intelligence"
                rel="noopener noreferrer"
              >
                <img src={woomLogo} alt="Woom logo" />
              </a>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>
    <div className="loved-by-data-teams-split" />
  </>
)

export default IndexPartners
