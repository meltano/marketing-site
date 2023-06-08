import React from 'react'
import { StaticImage } from 'gatsby-plugin-image'

const Sources = ({ data }) => (
  <div className="sources glow-bg section">
    <div className="container">
      <div className="heading">
        <h2 dangerouslySetInnerHTML={{ __html: data.sourcesTitle }} />
        <p
          className="heading-description p2"
          dangerouslySetInnerHTML={{ __html: data.sourcesText }}
        />
      </div>

      <div className="source-logos-grid ml-margins">
        <a
          href="https://hub.meltano.com/extractors/tap-athena"
          className="logo-grid-item"
          target="_blank"
          rel="noopener noreferrer"
        >
          <StaticImage alt="" src="../../assets/img/data/amazon-athena.png" />
        </a>
        <a
          href="https://hub.meltano.com/loaders/target-kinesis"
          className="logo-grid-item"
          target="_blank"
          rel="noopener noreferrer"
        >
          <StaticImage alt="" src="../../assets/img/data/amazon-kinesis.png" />
        </a>
        <div className="logo-grid-item grid-item-blank">
          {/* <!-- Empty field --> */}
        </div>
        <div className="logo-grid-item grid-item-blank">
          {/* <!-- Empty field --> */}
        </div>
        <a
          href="https://hub.meltano.com/extractors/tap-redshift"
          className="logo-grid-item"
          target="_blank"
          rel="noopener noreferrer"
        >
          <StaticImage alt="" src="../../assets/img/data/amazon-redshift.png" />
        </a>
        <a
          href="https://hub.meltano.com/extractors/tap-appstore"
          className="logo-grid-item"
          target="_blank"
          rel="noopener noreferrer"
        >
          <StaticImage alt="" src="../../assets/img/data/apple.png" />
        </a>
        <div className="logo-grid-item grid-item-blank">
          {/* <!-- Empty field --> */}
        </div>
        <div className="logo-grid-item grid-item-blank">
          {/* <!-- Empty field --> */}
        </div>
        <a
          href="https://hub.meltano.com/extractors/tap-bamboohr"
          className="logo-grid-item"
          target="_blank"
          rel="noopener noreferrer"
        >
          <StaticImage alt="" src="../../assets/img/data/bamboo.png" />
        </a>
        <a
          href="https://hub.meltano.com/extractors/tap-chargebee"
          className="logo-grid-item"
          target="_blank"
          rel="noopener noreferrer"
        >
          <StaticImage alt="" src="../../assets/img/data/chargebee.png" />
        </a>
        <div className="logo-grid-item grid-item-blank">
          {/* <!-- Empty field --> */}
        </div>
        <div className="logo-grid-item grid-item-blank">
          {/* <!-- Empty field --> */}
        </div>
        <a href="#" className="logo-grid-item" target="_blank" rel="noopener">
          <StaticImage alt="" src="../../assets/img/data/cloudera.png" />
        </a>
        <a
          href="https://hub.meltano.com/extractors/tap-confluence"
          className="logo-grid-item"
          target="_blank"
          rel="noopener noreferrer"
        >
          <StaticImage alt="" src="../../assets/img/data/confluence.png" />
        </a>
        <a
          href="https://hub.meltano.com/extractors/tap-contentful"
          className="logo-grid-item"
          target="_blank"
          rel="noopener noreferrer"
        >
          <StaticImage alt="" src="../../assets/img/data/contentful.png" />
        </a>
        <a
          href="https://hub.meltano.com/extractors/tap-datadog"
          className="logo-grid-item"
          target="_blank"
          rel="noopener noreferrer"
        >
          <StaticImage alt="" src="../../assets/img/data/datadog.png" />
        </a>
        <a
          href="https://hub.meltano.com/extractors/tap-dbt"
          className="logo-grid-item"
          target="_blank"
          rel="noopener noreferrer"
        >
          <StaticImage alt="" src="../../assets/img/data/dbt.png" />
        </a>
        <a
          href="https://hub.meltano.com/extractors/tap-duckdb"
          className="logo-grid-item"
          target="_blank"
          rel="noopener noreferrer"
        >
          <StaticImage alt="" src="../../assets/img/data/duck-db.png" />
        </a>
        <a
          href="https://hub.meltano.com/extractors/tap-dynamodb"
          className="logo-grid-item"
          target="_blank"
          rel="noopener noreferrer"
        >
          <StaticImage alt="" src="../../assets/img/data/dynamo-db.png" />
        </a>
        <a
          href="https://hub.meltano.com/extractors/tap-ebay"
          className="logo-grid-item"
          target="_blank"
          rel="noopener noreferrer"
        >
          <StaticImage alt="" src="../../assets/img/data/ebay.png" />
        </a>
        <a
          href="https://hub.meltano.com/extractors/tap-facebook"
          className="logo-grid-item"
          target="_blank"
          rel="noopener noreferrer"
        >
          <StaticImage alt="" src="../../assets/img/data/facebook.png" />
        </a>
        <a
          href="https://hub.meltano.com/extractors/tap-freshdesk"
          className="logo-grid-item"
          target="_blank"
          rel="noopener noreferrer"
        >
          <StaticImage alt="" src="../../assets/img/data/freshdesk.png" />
        </a>
        <a
          href="https://hub.meltano.com/extractors/tap-github"
          className="logo-grid-item"
          target="_blank"
          rel="noopener noreferrer"
        >
          <StaticImage alt="" src="../../assets/img/data/github.png" />
        </a>
        <a
          href="https://hub.meltano.com/extractors/tap-gmail"
          className="logo-grid-item"
          target="_blank"
          rel="noopener noreferrer"
        >
          <StaticImage alt="" src="../../assets/img/data/gmail.png" />
        </a>
        <a
          href="gmail-1.png"
          className="logo-grid-item"
          target="_blank"
          rel="noopener"
        >
          <StaticImage alt="" src="../../assets/img/data/gmail-1.png" />
        </a>
        <a
          href="https://hub.meltano.com/extractors/tap-google-analytics"
          className="logo-grid-item"
          target="_blank"
          rel="noopener noreferrer"
        >
          <StaticImage alt="" src="../../assets/img/data/gmail-2.png" />
        </a>
        <a
          href="https://hub.meltano.com/extractors/tap-google-sheets"
          className="logo-grid-item"
          target="_blank"
          rel="noopener noreferrer"
        >
          <StaticImage alt="" src="../../assets/img/data/gmail-3.png" />
        </a>
        <a
          href="https://hub.meltano.com/extractors/tap-greenhouse"
          className="logo-grid-item"
          target="_blank"
          rel="noopener noreferrer"
        >
          <StaticImage alt="" src="../../assets/img/data/greenhouse.png" />
        </a>
        <div className="logo-grid-item grid-item-blank">
          {/* <!-- Empty field --> */}
        </div>
        <a
          href="https://hub.meltano.com/extractors/tap-hubspot"
          className="logo-grid-item"
          target="_blank"
          rel="noopener noreferrer"
        >
          <StaticImage alt="" src="../../assets/img/data/hubspot.png" />
        </a>
        <a
          href="https://hub.meltano.com/extractors/tap-intercom"
          className="logo-grid-item"
          target="_blank"
          rel="noopener noreferrer"
        >
          <StaticImage alt="" src="../../assets/img/data/intercom.png" />
        </a>
        <a
          href="https://hub.meltano.com/extractors/tap-jira"
          className="logo-grid-item"
          target="_blank"
          rel="noopener noreferrer"
        >
          <StaticImage alt="" src="../../assets/img/data/jira.png" />
        </a>
        <a
          href="https://hub.meltano.com/extractors/tap-kafka"
          className="logo-grid-item"
          target="_blank"
          rel="noopener noreferrer"
        >
          <StaticImage alt="" src="../../assets/img/data/kafka.png" />
        </a>
        <a
          href="https://hub.meltano.com/extractors/tap-lever"
          className="logo-grid-item"
          target="_blank"
          rel="noopener noreferrer"
        >
          <StaticImage alt="" src="../../assets/img/data/lever.png" />
        </a>
        <a
          href="https://hub.meltano.com/extractors/tap-linkedin-ads"
          className="logo-grid-item"
          target="_blank"
          rel="noopener noreferrer"
        >
          <StaticImage alt="" src="../../assets/img/data/linkedin.png" />
        </a>
        <a
          href="https://hub.meltano.com/extractors/tap-mailchimp"
          className="logo-grid-item"
          target="_blank"
          rel="noopener noreferrer"
        >
          <StaticImage alt="" src="../../assets/img/data/mailchimp.png" />
        </a>
        <a
          href="https://hub.meltano.com/extractors/tap-marketo"
          className="logo-grid-item"
          target="_blank"
          rel="noopener noreferrer"
        >
          <StaticImage alt="" src="../../assets/img/data/marketo.png" />
        </a>
        <a
          href="https://hub.meltano.com/loaders/target-azureblobstorage"
          className="logo-grid-item"
          target="_blank"
          rel="noopener noreferrer"
        >
          <StaticImage alt="" src="../../assets/img/data/microsoft-azure.png" />
        </a>
        <a
          href="https://hub.meltano.com/extractors/tap-mixpanel"
          className="logo-grid-item"
          target="_blank"
          rel="noopener noreferrer"
        >
          <StaticImage alt="" src="../../assets/img/data/mixpanel.png" />
        </a>
        <a
          href="https://hub.meltano.com/extractors/tap-mongodb"
          className="logo-grid-item"
          target="_blank"
          rel="noopener noreferrer"
        >
          <StaticImage alt="" src="../../assets/img/data/mixpanel-1.png" />
        </a>
        <a
          href="https://hub.meltano.com/extractors/tap-mssql"
          className="logo-grid-item"
          target="_blank"
          rel="noopener noreferrer"
        >
          <StaticImage alt="" src="../../assets/img/data/ms-sql.png" />
        </a>
        <div className="logo-grid-item grid-item-blank">
          {/* <!-- Empty field --> */}
        </div>
        <div className="logo-grid-item grid-item-blank">
          {/* <!-- Empty field --> */}
        </div>
        <a
          href="https://hub.meltano.com/extractors/tap-mysql"
          className="logo-grid-item"
          target="_blank"
          rel="noopener noreferrer"
        >
          <StaticImage alt="" src="../../assets/img/data/ms-sql-1.png" />
        </a>
        <a
          href="https://hub.meltano.com/extractors/tap-oracle"
          className="logo-grid-item"
          target="_blank"
          rel="noopener noreferrer"
        >
          <StaticImage alt="" src="../../assets/img/data/oracle.png" />
        </a>
        <a
          href="https://hub.meltano.com/extractors/tap-salesforce"
          className="logo-grid-item"
          target="_blank"
          rel="noopener noreferrer"
        >
          <StaticImage alt="" src="../../assets/img/data/salesforce.png" />
        </a>
        <a
          href="https://hub.meltano.com/extractors/tap-s3-csv"
          className="logo-grid-item"
          target="_blank"
          rel="noopener noreferrer"
        >
          <StaticImage alt="" src="../../assets/img/data/s3.png" />
        </a>
        <a
          href="https://hub.meltano.com/extractors/tap-segment"
          className="logo-grid-item"
          target="_blank"
          rel="noopener noreferrer"
        >
          <StaticImage alt="" src="../../assets/img/data/segment.png" />
        </a>
        <a
          href="https://hub.meltano.com/extractors/tap-shopify"
          className="logo-grid-item"
          target="_blank"
          rel="noopener noreferrer"
        >
          <StaticImage alt="" src="../../assets/img/data/shopify.png" />
        </a>
        <a
          href="https://hub.meltano.com/extractors/tap-snowflake"
          className="logo-grid-item"
          target="_blank"
          rel="noopener noreferrer"
        >
          <StaticImage alt="" src="../../assets/img/data/snowflake.png" />
        </a>
        <a
          href="https://hub.meltano.com/loaders/target-stitch"
          className="logo-grid-item"
          target="_blank"
          rel="noopener noreferrer"
        >
          <StaticImage alt="" src="../../assets/img/data/stitch.png" />
        </a>
        <a
          href="https://hub.meltano.com/extractors/tap-surveymonkey"
          className="logo-grid-item"
          target="_blank"
          rel="noopener noreferrer"
        >
          <StaticImage alt="" src="../../assets/img/data/survey-monkey.png" />
        </a>
        <a
          href="https://hub.meltano.com/extractors/tap-workday-raas"
          className="logo-grid-item"
          target="_blank"
          rel="noopener noreferrer"
        >
          <StaticImage alt="" src="../../assets/img/data/workday.png" />
        </a>
        <a
          href="https://hub.meltano.com/extractors/tap-xero"
          className="logo-grid-item"
          target="_blank"
          rel="noopener noreferrer"
        >
          <StaticImage alt="" src="../../assets/img/data/xero.png" />
        </a>
        <a
          href="https://hub.meltano.com/extractors/tap-zendesk-talk"
          className="logo-grid-item"
          target="_blank"
          rel="noopener noreferrer"
        >
          <StaticImage alt="" src="../../assets/img/data/zendesk-talk.png" />
        </a>
        <div className="logo-grid-item grid-item-blank">
          {/* <!-- Empty field --> */}
        </div>
        <div className="logo-grid-item grid-item-blank">
          {/* <!-- Empty field --> */}
        </div>
        <a
          href="https://hub.meltano.com/extractors/tap-zoom"
          className="logo-grid-item"
          target="_blank"
          rel="noopener noreferrer"
        >
          <StaticImage alt="" src="../../assets/img/data/zoom.png" />
        </a>
        <a
          href="https://hub.meltano.com/extractors/tap-zuora"
          className="logo-grid-item"
          target="_blank"
          rel="noopener noreferrer"
        >
          <StaticImage alt="" src="../../assets/img/data/zuora.png" />
        </a>
        <a
          href="https://hub.meltano.com/extractors/tap-airtable"
          className="logo-grid-item"
          target="_blank"
          rel="noopener noreferrer"
        >
          <StaticImage alt="" src="../../assets/img/data/airtable.png" />
        </a>
        <a
          href="https://hub.meltano.com/extractors/tap-anaplan"
          className="logo-grid-item"
          target="_blank"
          rel="noopener noreferrer"
        >
          <StaticImage alt="" src="../../assets/img/data/airtable-2.png" />
        </a>
        <a
          href="https://hub.meltano.com/extractors/tap-asana/"
          className="logo-grid-item"
          target="_blank"
          rel="noopener noreferrer"
        >
          <StaticImage alt="" src="../../assets/img/data/asana.png" />
        </a>
        <a
          href="https://hub.meltano.com/extractors/tap-canvas"
          className="logo-grid-item"
          target="_blank"
          rel="noopener noreferrer"
        >
          <StaticImage alt="" src="../../assets/img/data/canvas.png" />
        </a>
        <a
          href="https://hub.meltano.com/extractors/tap-gainsightpx"
          className="logo-grid-item"
          target="_blank"
          rel="noopener noreferrer"
        >
          <StaticImage alt="" src="../../assets/img/data/gainsight.png" />
        </a>
        <a
          href="https://hub.meltano.com/extractors/tap-instagram"
          className="logo-grid-item"
          target="_blank"
          rel="noopener noreferrer"
        >
          <StaticImage alt="" src="../../assets/img/data/instagram.png" />
        </a>
        <a
          href="https://hub.meltano.com/extractors/tap-iterable"
          className="logo-grid-item"
          target="_blank"
          rel="noopener noreferrer"
        >
          <StaticImage alt="" src="../../assets/img/data/iterable.png" />
        </a>
        <a
          href="https://hub.meltano.com/extractors/tap-outreach"
          className="logo-grid-item"
          target="_blank"
          rel="noopener noreferrer"
        >
          <StaticImage alt="" src="../../assets/img/data/outreach.png" />
        </a>
        <a
          href="https://hub.meltano.com/extractors/tap-pagerduty"
          className="logo-grid-item"
          target="_blank"
          rel="noopener noreferrer"
        >
          <StaticImage alt="" src="../../assets/img/data/outreach-1.png" />
        </a>
        <a
          href="https://hub.meltano.com/extractors/tap-parquet"
          className="logo-grid-item"
          target="_blank"
          rel="noopener noreferrer"
        >
          <StaticImage alt="" src="../../assets/img/data/parquet.png" />
        </a>
        <div className="logo-grid-item grid-item-blank">
          {/* <!-- Empty field --> */}
        </div>
        <div className="logo-grid-item grid-item-blank">
          {/* <!-- Empty field --> */}
        </div>
        <a
          href="https://hub.meltano.com/extractors/tap-paypal"
          className="logo-grid-item"
          target="_blank"
          rel="noopener noreferrer"
        >
          <StaticImage alt="" src="../../assets/img/data/paypal.png" />
        </a>
        <a
          href="https://hub.meltano.com/extractors/tap-pinterest-ads"
          className="logo-grid-item"
          target="_blank"
          rel="noopener noreferrer"
        >
          <StaticImage alt="" src="../../assets/img/data/pinterest.png" />
        </a>
        <a
          href="https://hub.meltano.com/loaders/target-apprise"
          className="logo-grid-item"
          target="_blank"
          rel="noopener noreferrer"
        >
          <StaticImage alt="" src="../../assets/img/data/pinterest-1.png" />
        </a>
        <a
          href="https://hub.meltano.com/extractors/tap-postgres"
          className="logo-grid-item"
          target="_blank"
          rel="noopener noreferrer"
        >
          <StaticImage alt="" src="../../assets/img/data/postgres.png" />
        </a>
        <a
          href="https://hub.meltano.com/extractors/tap-quickbooks"
          className="logo-grid-item"
          target="_blank"
          rel="noopener noreferrer"
        >
          <StaticImage alt="" src="../../assets/img/data/quickbooks.png" />
        </a>
        <a
          href="https://hub.meltano.com/extractors/tap-tiktok"
          className="logo-grid-item"
          target="_blank"
          rel="noopener noreferrer"
        >
          <StaticImage alt="" src="../../assets/img/data/tiktok.png" />
        </a>
        <a
          href="https://hub.meltano.com/extractors/tap-twitter"
          className="logo-grid-item"
          target="_blank"
          rel="noopener noreferrer"
        >
          <StaticImage alt="" src="../../assets/img/data/twitter.png" />
        </a>
        <a
          href="https://hub.meltano.com/extractors/tap-typeform"
          className="logo-grid-item"
          target="_blank"
          rel="noopener noreferrer"
        >
          <StaticImage alt="" src="../../assets/img/data/typeform.png" />
        </a>
        <a
          href="https://hub.meltano.com/extractors/tap-zenefits"
          className="logo-grid-item"
          target="_blank"
          rel="noopener noreferrer"
        >
          <StaticImage alt="" src="../../assets/img/data/zenefits.png" />
        </a>
        <a
          href="https://hub.meltano.com/extractors/tap-redis"
          className="logo-grid-item"
          target="_blank"
          rel="noopener noreferrer"
        >
          <StaticImage alt="" src="../../assets/img/data/redis.png" />
        </a>
        <a
          href="https://hub.meltano.com/extractors/tap-liveperson"
          className="logo-grid-item"
          target="_blank"
          rel="noopener noreferrer"
        >
          <StaticImage alt="" src="../../assets/img/data/liveperson.png" />
        </a>
        <a
          href="https://hub.meltano.com/loaders/target-bigquery"
          className="logo-grid-item"
          target="_blank"
          rel="noopener noreferrer"
        >
          <StaticImage alt="" src="../../assets/img/data/bigquery.png" />
        </a>
        <div className="logo-grid-item grid-item-blank">
          {/* <!-- Empty field --> */}
        </div>
      </div>

      <div className="sources-buttons">
        <a
          href={data.sourcesLink.url}
          target={data.sourcesLink.target}
          className="btn alt-blue-btn middle"
        >
          {data.sourcesLink.title}
        </a>
      </div>
    </div>
  </div>
)

export default Sources
