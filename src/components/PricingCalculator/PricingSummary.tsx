import { Card } from './ui/card'
import { Separator } from './ui/separator'
import * as React from 'react'

import coffeeIconSrc from '../../assets/img/coffee-icon.png'
import movieIconSrc from '../../assets/img/movie-icon.png'
import flightIconSrc from '../../assets/img/flight-icon.png'
import gymIconSrc from '../../assets/img/gym-icon.png'
import pizzaIconSrc from '../../assets/img/pizza-icon.png'

const coffeeIcon = typeof coffeeIconSrc === 'string' ? coffeeIconSrc : coffeeIconSrc.src
const movieIcon = typeof movieIconSrc === 'string' ? movieIconSrc : movieIconSrc.src
const flightIcon = typeof flightIconSrc === 'string' ? flightIconSrc : flightIconSrc.src
const gymIcon = typeof gymIconSrc === 'string' ? gymIconSrc : gymIconSrc.src
const pizzaIcon = typeof pizzaIconSrc === 'string' ? pizzaIconSrc : pizzaIconSrc.src
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Pagination } from "swiper/modules"

import "swiper/css"
import "swiper/css/pagination"
import { HubspotMeetingLink } from '@/lib/utils'

interface ConnectorCost {
  name: string
  frequency: string
  cost: number
}

interface PricingSummaryProps {
  connectorCosts: ConnectorCost[]
  totalCost: number
  competitorTotal: number
  savings: number
  onShowReceipt: () => void
}

export default function PricingSummary({
  connectorCosts,
  totalCost,
  competitorTotal,
  savings,
  onShowReceipt,
}: PricingSummaryProps) {

  const [comparison, setComparison] = React.useState("none")
  const [isAnnual, setIsAnnual] = React.useState(false)

    const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <Card className="p-6 space-y-6">
      {/* Our Price */}
      <div className="compareCheck">
        <div className="compareWrapper">
          <span className="compareLabel">Compare with:</span>

          <div className="radioGroup">
            <label className="radioCard">
              <input
                type="radio"
                name="compare"
                value="none"
                checked={comparison === "none"}
                onChange={(e) => setComparison(e.target.value)}
              />
              <span className="radioContent">
                <span className="radioCircle"></span>
                No Comparison
              </span>
            </label>

            <label className="radioCard">
              <input
                type="radio"
                name="compare"
                value="fivetran"
                checked={comparison === "fivetran"}
                onChange={(e) => setComparison(e.target.value)}
              />
              <span className="radioContent">
                <span className="radioCircle"></span>
                Fivetran
              </span>
            </label>

          </div>
        </div>
      </div>
      <div>
        <h4
          className="text-4xl font-bold tabular-nums totalCost"
          data-testid="text-total-cost"
        >
          
                  <>
                    £{isAnnual ? (totalCost * 12).toFixed(2) : totalCost.toFixed(2)}
                    <span>
                      {isAnnual ? " / annual" : " / month"}
                    </span>
                  </>
                
        </h4>
      </div>

      {/* Competitor Comparison */}
      {connectorCosts.length > 0 && (
        <>
          <div>
            <h6 className="breakdownTitle mb-3">
              Cost Summary
              <label className="toggleSwitch nolabel">
                <input
                  type="checkbox"
                  checked={isAnnual}
                  onChange={() => setIsAnnual(!isAnnual)}
                />
                <a></a>
                <span>
                  <span className="left-span">Month</span>
                  <span className="right-span">Annual</span>
                </span>
              </label>
            </h6>

            {connectorCosts.map((item, index) => (
              <div
                key={index}
                className="breakdownItem flex justify-between mb-2"
              >
                <div>
                  <p>{item.name}</p>
                  <p>
                    <small>{item.frequency}</small>
                  </p>
                </div>

                <p className="tabular-nums">
                  £ {isAnnual ? (item.cost * 12).toFixed(2) : item.cost.toFixed(2)}
                    <span>
                      {isAnnual ? " / annual" : " / Month"}
                    </span>
                </p>
              </div>
            ))}
          </div>
          <Separator />
        </>
      )}

      
      {comparison === "fivetran" && (
          <div className="comparisonPrice">
            <p className="compareComp">
              <span className="text-muted-foreground">Fivetran Charges</span>
              <span className="tabular-nums">
                <span>£{isAnnual ? (competitorTotal * 12).toFixed(2) : competitorTotal.toFixed(2)}</span>
                {isAnnual ? " / annual" : " / month"}
              </span>
            </p>

            <p className="totalSave">
              <span>Total Saved</span>
              <span className="tabular-nums">
                <span>£{isAnnual ? (savings * 12).toFixed(2) : savings.toFixed(2)}</span>
                {isAnnual ? " / annual" : " / month"}
              </span>
            </p>
            <div className='equivalentItems'>
                <p>That's equivalent to</p>
<Swiper
      modules={[Autoplay, Pagination]}
      slidesPerView={1}
      spaceBetween={20}
      speed={1000}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      pagination={{
    el: ".customPag",
    clickable: true,
    bulletClass: "custom-bullet",
    bulletActiveClass: "active",
  }}
      loop={true}
      style={{ width: "100%", padding: "40px 0" }}
    >
    <SwiperSlide>
      <div className='info'>
        <p className='value'>
          {Math.round((isAnnual ? savings * 12 : savings) / 3.3)} <img src={coffeeIcon} alt="" />
          <span>{isAnnual ? " / annual" : " / month"}</span>
        </p>
        <p className='text'>That's your team's coffee budget covered</p>
      </div>
    </SwiperSlide>

    <SwiperSlide>
      <div className='info'>
        <p className='value'>
          {Math.round((isAnnual ? savings * 12 : savings) / 800)} <img src={flightIcon} alt="" />
          <span>{isAnnual ? "/ annual" : "/ month"}</span>
        </p>
        <p className='text'>That's your London–New York round trips</p>
      </div>
    </SwiperSlide>

    <SwiperSlide>
      <div className='info'>
        <p className='value'>
          {Math.round((isAnnual ? savings * 12 : savings) / 13)} <img src={movieIcon} alt="" />
          <span>{isAnnual ? "/ annual" : "/ month"}</span>
        </p>
        <p className='text'>That's movie tickets covered</p>
      </div>
    </SwiperSlide>
    <SwiperSlide>
      <div className='info'>
        <p className='value'>
          {Math.round((isAnnual ? savings * 12 : savings) / 20)} <img src={pizzaIcon} alt="" />
          <span>{isAnnual ? "/ annual" : "/ month"}</span>
        </p>
        <p className='text'>That's your Friday all-hands lunch covered</p>
      </div>
    </SwiperSlide>
    <SwiperSlide>
      <div className='info'>
        <p className='value'>
          {Math.round((isAnnual ? savings * 12 : savings) / 15)} <img src={gymIcon} alt="" />
          <span>{isAnnual ? "/ annual" : "/ month"}</span>
        </p>
        <p className='text'>That's your whole team's wellness perks covered</p>
      </div>
    </SwiperSlide>
    </Swiper>
    <div className="customPag">
  <span className="custom-bullet"></span>
  <span className="custom-bullet active"></span>
  <span className="custom-bullet"></span>
  <span className="custom-bullet"></span>
  <span className="custom-bullet"></span>
</div>
            </div>
          </div>
      )}

      <div className='priceSummaryBtns'>
        <a
          href={HubspotMeetingLink}
          className="btn alt-blue-btn"
          target=""
        >
          Book A Call
        </a>
        <button
          type="button"
          className="btn-open-receipt btn colorful-btn"
          onClick={onShowReceipt}
        >
          <span />
          Show Email Receipt
        </button>
      </div>

    </Card>
  )
}
