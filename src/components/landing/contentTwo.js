import React from 'react'

const LandingContentTwo = ({ data }) => (
  <div className="container">
    <div className="ml-margins">
      <div className="row col-2">
        test
        {data.map(list => (
          <div
            className="contact-form-sidebar"
            key={list.landingLayoutTwoListsList.landingLayoutTwoListsListTitle}
          >
            <h4
              className="title-inline"
              dangerouslySetInnerHTML={{
                __html:
                  list.landingLayoutTwoListsList.landingLayoutTwoListsListTitle,
              }}
            />
            <ol className="contact-form-sidebar-list">
              {list.landingLayoutTwoListsList.landingLayoutTwoListsListItems.map(
                item => (
                  <li className="p3" key={item.landingLayoutTwoListsListItem}>
                    {item.landingLayoutTwoListsListItem}
                  </li>
                )
              )}
            </ol>
            {list.landingLayoutTwoListsList.landingLayoutTwoListsListButton && (
              <a
                href={
                  list.landingLayoutTwoListsList.landingLayoutTwoListsListButton
                    .url
                }
                target={
                  list.landingLayoutTwoListsList.landingLayoutTwoListsListButton
                    .target
                }
                className="btn alt-blue-btn"
              >
                {
                  list.landingLayoutTwoListsList.landingLayoutTwoListsListButton
                    .title
                }
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  </div>
)

export default LandingContentTwo
