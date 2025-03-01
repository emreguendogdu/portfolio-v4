import { useEffect } from "react"
import { useState } from "react"

const LocalTime = () => {
  const [time, setTime] = useState("")

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setTime(
        now.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        })
      )
    }
    updateTime() // Initial call

    const now = new Date()
    const secondsUntilNextMinute = 60 - now.getSeconds() // Calculate delay for the next full minute
    const initialTimeout = setTimeout(() => {
      updateTime()
      setInterval(updateTime, 60000) // Update every minute exactly at :00 seconds
    }, secondsUntilNextMinute * 1000)

    return () => clearTimeout(initialTimeout) // Cleanup on unmount
  }, [])

  return <span>{time}, GMT+3</span>
}

export default LocalTime
