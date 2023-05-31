import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper'
import 'swiper/swiper.min.css'

const Story = ({ data }) => (
  <div className="meltano-story section">
    <div className="container">
      <div className="heading header-align-left">
        <h2
          className="title-inline"
          dangerouslySetInnerHTML={{ __html: data.aboutStoryTitle }}
        />
      </div>

      <div className="meltano-story-carousel">
        <Swiper
          slidesPerView={1}
          spaceBetween={20}
          breakpoints={{
            768: {
              slidesPerView: 2,
              spaceBetween: 25,
            },
          }}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          className="mySwiper"
        >
          {data.aboutStoryList.map(item => (
            <SwiperSlide key={item.aboutStoryListItem}>
              <div className="meltano-story-carousel-item">
                <div
                  className="p1"
                  dangerouslySetInnerHTML={{
                    __html: item.aboutStoryListItem,
                  }}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  </div>
)

export default Story
