import React from 'react'
import Layout from '../components/layout'
import { graphql } from 'gatsby'
import PricingCalculator from '../components/PricingCalculator/PricingCalculator'

const Pricingcalculator = ({ data }) => {

    const pricingcalculatordata = data?.pricingcalculator?.nodes[0]?.pricingCalculator
  const connectorPricing = data?.pricingcalculator?.nodes[0]?.connectorPricing?.connectors


    // console.log("Data inside the pricing calculator", data)
  // console.log("Pricing calculator data", costComparisondata)

    return (
        <Layout>
            <h1>{pricingcalculatordata?.pricingCalculatorTitle}</h1>
            <p>{pricingcalculatordata?.pricingCalculatorSmallText}</p>
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
      }
    }

    }
  }
}
`