/* eslint-disable jsx-a11y/media-has-caption */
import React, { useEffect, useRef } from 'react'
import PlayButton from '../../assets/img/icon-play-button.png'
import PauseButton from '../../assets/img/icon-pause-button.png'
import SoundOn from '../../assets/img/icon-sound-on.png'
import SoundOff from '../../assets/img/icon-sound-off.png'
import Fullscreen from '../../assets/img/icon-fullscreen.png'

const LandingVideo = ({ data }) => {
  const videoRef = useRef(null)
  const playPauseImgRef = useRef(null)
  const muteUnmuteImgRef = useRef(null)
  const seekBarRef = useRef(null)
  const volumeBarRef = useRef(null)

  useEffect(() => {
    const video = videoRef.current
    const playPauseImg = playPauseImgRef.current
    const muteUnmuteImg = muteUnmuteImgRef.current
    const seekBar = seekBarRef.current
    const volumeBar = volumeBarRef.current

    function updateSeekBackground() {
      const value = (100 / video.duration) * video.currentTime
      seekBar.style.background = `linear-gradient(to right, #F963BC ${value}%, rgba(255, 255, 255, 0.1) ${value}%)`
    }

    function updateVolumeBackground() {
      const value = volumeBar.value * 100
      volumeBar.style.background = `linear-gradient(to right, rgba(255, 255, 255, 1) ${value}%, rgba(255, 255, 255, 0.1) ${value}%)`
    }

    function initializePlayer() {
      video.volume = 1
      volumeBar.value = video.volume
      updateSeekBackground()
      updateVolumeBackground()
    }

    function togglePlayPause() {
      if (video.paused) {
        video.play()
        playPauseImg.src = PauseButton
      } else {
        video.pause()
        playPauseImg.src = PlayButton
      }
    }

    playPauseImg.addEventListener('click', togglePlayPause)

    muteUnmuteImg.addEventListener('click', () => {
      if (video.muted) {
        video.muted = false
        muteUnmuteImg.src = SoundOn
      } else {
        video.muted = true
        muteUnmuteImg.src = SoundOff
      }
    })

    seekBar.addEventListener('input', () => {
      const time = video.duration * (seekBar.value / 100)
      video.currentTime = time
      updateSeekBackground()
    })

    volumeBar.addEventListener('input', () => {
      video.volume = volumeBar.value
      updateVolumeBackground()
    })

    video.addEventListener('timeupdate', () => {
      updateSeekBackground()
    })

    video.addEventListener('volumechange', () => {
      updateVolumeBackground()
    })

    return () => {
      // Cleanup event listeners
      playPauseImg.removeEventListener('click', togglePlayPause)
    }
  }, [])

  const handleFullscreenClick = () => {
    const video = videoRef.current

    if (video.requestFullscreen) {
      video.requestFullscreen()
    } else if (video.webkitRequestFullscreen) {
      video.webkitRequestFullscreen()
    } else if (video.mozRequestFullScreen) {
      video.mozRequestFullScreen()
    } else if (video.msRequestFullscreen) {
      video.msRequestFullscreen()
    }
  }
  return (
    <div className="video-container">
      <video ref={videoRef} id="video" width="100%">
        <source src={data.publicUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="controls">
        <div className="player-buttons">
          <button id="play-pause" className="control-button" type="button">
            <img
              decoding="async"
              ref={playPauseImgRef}
              className="play-img"
              src={PlayButton}
              alt=""
            />
          </button>
          <button id="mute-unmute" className="control-button" type="button">
            <img decoding="async" ref={muteUnmuteImgRef} src={SoundOn} alt="" />
          </button>
        </div>
        <div className="seek-bars">
          <input
            id="volume-bar"
            type="range"
            ref={volumeBarRef}
            className="volume-bar"
            min="0"
            max="1"
            step="0.01"
            value="1"
            style={{
              background:
                'linear-gradient(to right, rgb(255, 255, 255) 100%, rgba(255, 255, 255, 0.1) 100%)',
            }}
          />
          <input
            id="seek-bar"
            type="range"
            ref={seekBarRef}
            className="seek-bar"
            min="0"
            max="100"
            step="1"
            value="0"
            style={{
              background:
                'linear-gradient(to right, rgb(249, 99, 188) 0%, rgba(255, 255, 255, 0.1) 0%)',
            }}
          />
        </div>
        <button
          id="fullscreen"
          onClick={handleFullscreenClick}
          className="control-button"
          type="button"
        >
          <img decoding="async" src={Fullscreen} alt="" />
        </button>
      </div>
    </div>
  )
}

export default LandingVideo
