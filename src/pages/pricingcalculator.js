import React from 'react'
import Layout from '../components/layout'
import { graphql } from 'gatsby'

const Pricingcalculator = ({ data }) => {

    const pricingcalculatordata = data?.pricingcalculator?.nodes[0]?.pricingCalculator

    console.log("Data inside the pricing calculator", data)
    console.log("Pricing calculator data", pricingcalculatordata)

    return (
        <Layout>
            <h1>{pricingcalculatordata?.pricingCalculatorTitle}</h1>
            <p>{pricingcalculatordata?.pricingCalculatorSmallText}</p>
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
    }
  }
}
`