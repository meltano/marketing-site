/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import React, { useState } from 'react'
import { StaticImage } from 'gatsby-plugin-image'
import Modal from 'react-modal'
import MeltanoGivesScreensB from '../../assets/img/meltano-gives-b.svg'
import MeltanoGivesScreensM from '../../assets/img/meltano-gives-m.svg'
import MeltanoGivesScreensS from '../../assets/img/meltano-gives-s.svg'
import PlayButton from '../../assets/img/play-btn.svg'
import CloseButton from '../../assets/img/close-btn.svg'

const Engineers = ({ data }) => {
  // const [modalIsOpen, setIsOpen] = useState(false)

  // function openModal(e) {
  //   e.preventDefault()
  //   setIsOpen(true)
  // }

  // function closeModal() {
  //   setIsOpen(false)
  //   document.body.classList.remove('modal-open')
  // }

  return (
    <>
      <div className="meltano-gives-engineers section">
        <div className="container">
          <div className="heading">
            <h2 dangerouslySetInnerHTML={{ __html: data.engineersTitle }} />
            <p
              className="heading-description p2"
              dangerouslySetInnerHTML={{ __html: data.engineersText }}
            />
          </div>

          <div className="meltano-gives-table ml-margins">
            {/* <div className="meltano-gives-play-wrapper">
              <button type="button" onClick={openModal}>
                <img src={PlayButton} className="meltano-gives-play" alt="" />
              </button>
            </div> */}
            <img
              className="meltano-gives-screens meltano-gives-s"
              src={MeltanoGivesScreensS}
              alt="screens"
              loading="lazy"
            />
            <img
              className="meltano-gives-screens meltano-gives-m"
              src={MeltanoGivesScreensM}
              alt="screens"
              loading="lazy"
            />
            <img
              className="meltano-gives-screens meltano-gives-b"
              src={MeltanoGivesScreensB}
              alt="screens"
              loading="lazy"
            />
            <StaticImage
              className="meltano-gives-melty"
              src="../../assets/img/melty-programming5.png"
              alt="melty"
            />
          </div>
        </div>
      </div>
      {/* <Modal
        isOpen={modalIsOpen}
        // eslint-disable-next-line react/jsx-no-bind
        onRequestClose={closeModal}
        contentLabel="Subscribe Modal"
        ariaHideApp={false}
        className="video-modal"
        overlayClassName="video-overlay"
        shouldCloseOnOverlayClick
      >
        <div className="button-wrapper">
          <button type="button" onClick={closeModal}>
            <img src={CloseButton} alt="" className="" />
          </button>
        </div>
        <div className="modal-content">
          <div className="video-poster">
            <iframe
              width="791"
              height="508"
              src="https://www.youtube.com/embed/rGlf43bAG6I?enablejsapi=1"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
            />
          </div>
        </div>
      </Modal> */}
    </>
  )
}

export default Engineers
