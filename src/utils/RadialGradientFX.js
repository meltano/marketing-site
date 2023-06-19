import React, { useEffect } from 'react'

const RadialGradientFX = () => {
  useEffect(() => {
    let mousePositions = []
    let isAnimating = false

    function getElementOffset(element) {
      const rect = element.getBoundingClientRect()
      const scrollLeft =
        window.pageXOffset || document.documentElement.scrollLeft
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      return {
        top: rect.top + scrollTop,
        left: rect.left + scrollLeft,
      }
    }

    const handleMouseMove = event => {
      const timestamp = new Date().getTime()
      mousePositions.push({
        x: event.pageX,
        y: event.pageY,
        timestamp: timestamp,
      })

      if (!isAnimating) {
        isAnimating = true
        updateGradient()
      }
    }

    const updateGradient = () => {
      const timestamp = new Date().getTime()
      mousePositions = mousePositions.filter(
        position => timestamp - position.timestamp <= 100
      )

      const position = mousePositions[0]

      if (position) {
        const radialGradientElements =
          document.querySelectorAll('.radial-gradient')
        radialGradientElements.forEach(element => {
          const windowWidth = element.clientWidth
          const windowHeight = element.clientHeight
          const offset = getElementOffset(element)

          const mouseXpercentage = Math.round(
            ((position.x - offset.left) / windowWidth) * 100
          )
          const mouseYpercentage = Math.round(
            ((position.y - offset.top) / windowHeight) * 100
          )

          element.style.background = `radial-gradient(circle 260px at ${mouseXpercentage}% ${mouseYpercentage}%, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.02)`
        })
      }

      if (mousePositions.length > 0) {
        requestAnimationFrame(updateGradient)
      } else {
        isAnimating = false
      }
    }

    document.addEventListener('mousemove', handleMouseMove)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return null
}

export default RadialGradientFX
