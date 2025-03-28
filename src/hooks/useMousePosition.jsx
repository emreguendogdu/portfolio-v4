import { useEffect } from "react"
import { useState } from "react"

export default function useMousePosition() {
  const [mousePosition, setMousePosition] = useState({ x: null, y: null })
  const updateMousePosition = (e) => {
    setMousePosition({ x: e.clientX, y: e.clientY })
  }
  useEffect(() => {
    window.addEventListener("mousemove", updateMousePosition)
    return () => window.removeEventListener("mousemove", updateMousePosition)
  }, [])

  return mousePosition
}
