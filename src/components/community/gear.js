import React from 'react'

const Gear = ({ data }) => (
  <div className="our-gear section">
    <div className="container">
      <div className="heading">
        <h2 dangerouslySetInnerHTML={{ __html: data.communityGearTitle }} />
        <p className="heading-description p2">{data.communityGearText}</p>
      </div>
      <div className="gear-grid ml-margins">
        {data.communityGearType.map(type => (
          <div className="gear-grid-column" key={type.communityGearTypeName}>
            <h6>{type.communityGearTypeName}</h6>
            {type.communityGearTypeItems.map((item, i) => (
              <a
                href={item.communityGearTypeItemsLink?.url || '#'}
                className="gear-grid-item"
                target={item.communityGearTypeItemsLink?.target || ''}
                key={item.communityGearTypeItemsTitle + i}
              >
                <svg
                  className="gear-icon"
                  width="27"
                  height="31"
                  viewBox="0 0 27 31"
                  fill="none"
                >
                  <path
                    opacity="0.5"
                    d="M21.9205 14.0208L13.4352 22.5061C11.4857 24.4556 8.31359 24.4556 6.3641 22.5061C4.41461 20.5566 4.41461 17.3845 6.3641 15.435L14.8494 6.94975C16.0189 5.78019 17.9225 5.78019 19.092 6.94975C20.2616 8.1193 20.2616 10.0228 19.092 11.1924L12.7281 17.5563C12.3384 17.946 11.7035 17.946 11.3138 17.5563C10.9242 17.1667 10.9242 16.5318 11.3138 16.1421L16.9707 10.4853L15.5565 9.07107L9.89964 14.7279C8.72796 15.8996 8.72796 17.7989 9.89964 18.9706C11.0713 20.1422 12.9706 20.1422 14.1423 18.9706L20.5062 12.6066C22.4586 10.6543 22.4586 7.48786 20.5062 5.53553C18.5539 3.58321 15.3875 3.58321 13.4352 5.53553L4.94989 14.0208C2.21621 16.7545 2.21621 21.1866 4.94989 23.9203C7.68356 26.654 12.1157 26.654 14.8494 23.9203L23.3347 15.435L21.9205 14.0208Z"
                    fill="white"
                  />
                </svg>
                <div className="gear-grid-item-link">
                  <p className="grid-item-title">
                    {item.communityGearTypeItemsTitle}
                  </p>
                  <p className="grid-item-description p3">
                    {item.communityGearTypeItemsDescription}
                  </p>
                </div>
              </a>
            ))}
          </div>
        ))}
      </div>
    </div>
  </div>
)

export default Gear
