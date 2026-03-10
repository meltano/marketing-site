import React from 'react'
import Layout from '../components/layout'
import { graphql } from 'gatsby'
import PricingCalculator from '../components/PricingCalculator/PricingCalculator'
import { Helmet } from 'react-helmet'

const Pricingcalculator = ({ data }) => {

  const pricingcalculatordata = data?.pricingcalculator?.nodes[0]?.pricingCalculator
  const connectorPricing = data?.pricingcalculator?.nodes[0]?.connectorPricing?.connectors

  const node = data?.pricingcalculator?.nodes[0]
  const themePicker = node?.themePicker?.themePicker
  // console.log("Pricing calculator data", data)
  // const themePicker = data?.pricingcalculator?.node[0]
  // console.log("Data inside the pricing calculator ,themePicker", themePicker)
  return (
    <Layout>
      <Helmet
        bodyAttributes={{
          class: `dark ${themePicker}`,
        }}
      />
      <PricingCalculator data={connectorPricing} />
    </Layout>
  )
}

export default Pricingcalculator

export const pageQuery = graphql`
query {
  pricingcalculator: allWpPage(filter: { title: { eq: "pricingcalculator" } }) {
    nodes {
      title
      themePicker {
          themePicker
        }
      pricingCalculator {
        pricingCalculatorTitle
        pricingCalculatorSmallText
        pricingCalculatorSubtitle
        pricingCalculatorSubtitleSmallText
      }
    connectorPricing {
      connectors {
        connectorLogo {
          mediaItemUrl
        }
        connectorName
        pricePerMinute
        competitorPricePerMinute
      }
    }

    }
  }
}
`