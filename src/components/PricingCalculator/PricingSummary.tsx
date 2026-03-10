import { Card } from './ui/card'
import { Separator } from './ui/separator'
import * as React from 'react'

import coffeeIcon from '../../assets/img/coffee-icon.png'
import { Swiper, SwiperSlide } from "swiper/react"
import SwiperCore, { Autoplay, Pagination } from "swiper"

import "swiper/css"
import "swiper/css/pagination"

SwiperCore.use([Autoplay, Pagination])

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
                      {isAnnual ? " / Annual" : " / Monthly"}
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
                  <span className="left-span">Monthly</span>
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
                      {isAnnual ? " / Annual" : " / Monthly"}
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
                <span>${isAnnual ? (competitorTotal * 12).toFixed(2) : competitorTotal.toFixed(2)}</span>
                {isAnnual ? " / year" : " / month"}
              </span>
            </p>

            <p className="totalSave">
              <span>Total Saved</span>
              <span className="tabular-nums">
                <span>${isAnnual ? (savings * 12).toFixed(2) : savings.toFixed(2)}</span>
                {isAnnual ? " / year" : " / month"}
              </span>
            </p>
            <div className='equivalentItems'>
                <p>That's equivalent to</p>
<Swiper
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
          <span>{isAnnual ? " / year" : " / month"}</span>
        </p>
        <p className='text'>That's your team's coffee budget covered</p>
      </div>
    </SwiperSlide>

    <SwiperSlide>
      <div className='info'>
        <p className='value'>
          {Math.round((isAnnual ? savings * 12 : savings) / 800)} <span>flights {isAnnual ? "/ year" : "/ month"}</span>
        </p>
        <p className='text'>That's London–New York round trips covered</p>
      </div>
    </SwiperSlide>

    <SwiperSlide>
      <div className='info'>
        <p className='value'>
          {Math.round((isAnnual ? savings * 12 : savings) / 13)} <span>movies {isAnnual ? "/ year" : "/ month"}</span>
        </p>
        <p className='text'>That's movie tickets covered</p>
      </div>
    </SwiperSlide>
    </Swiper>
    <div className="customPag">
  <span className="custom-bullet"></span>
  <span className="custom-bullet active"></span>
  <span className="custom-bullet"></span>
</div>
            </div>
          </div>
      )}

      <div className='priceSummaryBtns'>
        <button
          type="button"
          className="btn-open-receipt btn colorful-btn"
          onClick={onShowReceipt}
        >
          <span />
          Show Email Receipt
        </button>

        <a
          href="https://meetings.hubspot.com/aphethean/45-min-demo-meeting?uuid=ff906b81-7e0b-4c2d-ad44-cc654abd18d8"
          className="btn alt-blue-btn"
          target=""
        >
          Book A Call
        </a>
        {/* <a
          href="#"
          className="btn colorful-btn"
          target=""
          onClick={() => setShowReceipt(true)}
        >
          <span />
          Show Email Receipt
        </a> */}
      </div>

    </Card>
  )
}
