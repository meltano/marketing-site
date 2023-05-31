import React, { useEffect, useRef } from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'
import { StaticImage } from 'gatsby-plugin-image'
import CubeOffIcon from '../../assets/img/cube-off-icon.svg'
import CubeOnIcon from '../../assets/img/cube-on-icon.svg'

const ProductDifference = ({ data }) => (
  <div className="meltano-difference section">
    <div className="container">
      <div className="heading">
        <h2
          className="title-inline"
          dangerouslySetInnerHTML={{ __html: data.productDifferenceTitle }}
        />
        <p className="heading-description p2">
          {data.productDifferenceDescription}
        </p>
      </div>

      <div className="meltano-difference-table ml-margins">
        <div className="meltano-difference-table-item meltano-others">
          <div className="meltano-difference-table-info">
            <div className="meltano-difference-table-heading">
              <h3>{data.productDifferenceBox[0].productDifferenceBoxTitle}</h3>
              <img
                className="meltano-difference-icon"
                src={CubeOffIcon}
                alt=""
              />
            </div>
            <ul>
              {data.productDifferenceBox[0].productDifferenceBoxList.map(
                item => (
                  <li
                    dangerouslySetInnerHTML={{
                      __html: item.productDifferenceBoxListItem,
                    }}
                    key={item.productDifferenceBoxListItem}
                  />
                )
              )}
            </ul>
          </div>
        </div>
        <div className="meltano-difference-table-item meltano-way">
          <StaticImage
            class="meltano-way-melty"
            src="../../assets/img/meltano-way-melty.webp"
            alt="Melty"
          />
          <div className="meltano-difference-table-info">
            <div className="meltano-difference-table-heading">
              <h3
                className="title-inline"
                dangerouslySetInnerHTML={{
                  __html:
                    data.productDifferenceBox[1].productDifferenceBoxTitle,
                }}
              />
              <img
                className="meltano-difference-icon"
                src={CubeOnIcon}
                alt=""
              />
            </div>
            <ul>
              {data.productDifferenceBox[1].productDifferenceBoxList.map(
                item => (
                  <li
                    dangerouslySetInnerHTML={{
                      __html: item.productDifferenceBoxListItem,
                    }}
                    key={item.productDifferenceBoxListItem}
                  />
                )
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
)

export default ProductDifference
