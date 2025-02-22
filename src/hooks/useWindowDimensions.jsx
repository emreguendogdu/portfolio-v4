import { useEffect } from "react"
import { useState } from "react"

export default function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState({
    width: 0,
    height: 0,
  })

  // Get set window dimensions at load and on resize
  useEffect(() => {
    const resize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    resize()

    window.addEventListener("resize", resize)

    return () => window.removeEventListener("resize", resize)
  }, [])

  return windowDimensions
}
