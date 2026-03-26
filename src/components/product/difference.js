import React from 'react'

import { ParallaxProvider, Parallax } from 'react-scroll-parallax'
import StaticImage from '@/components/compat/StaticImage'
import CubeOffIcon from '../../assets/img/cube-off-icon.svg'
import CubeOnIcon from '../../assets/img/cube-on-icon.svg'

const ProductDifference = ({ data }) => (
  <ParallaxProvider>
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
                <h3>
                  {data.productDifferenceBox[0].productDifferenceBoxTitle}
                </h3>
                <img
                  className="meltano-difference-icon"
                  src={CubeOffIcon}
                  alt=""
                  width={69}
                  height={69}
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
            <Parallax speed={50} className="meltano-difference-crystals" />
            <StaticImage
              className="meltano-way-melty"
              src="../../assets/img/meltano-way-melty.png"
              alt="Melty"
              width={318}
              height={238}
            />
            <div className="meltano-difference-table-info crystaled">
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
                  width={64}
                  height={64}
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
  </ParallaxProvider>
)

export default ProductDifference
