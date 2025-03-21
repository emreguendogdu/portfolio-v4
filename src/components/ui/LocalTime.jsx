/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react"

// Create a Context for the shared time state
const TimeContext = createContext(null)

export const TimeProvider = ({ children }) => {
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
    const secondsUntilNextMinute = 60 - now.getSeconds()
    const initialTimeout = setTimeout(() => {
      updateTime()
      setInterval(updateTime, 60000)
    }, secondsUntilNextMinute * 1000)

    return () => clearTimeout(initialTimeout)
  }, [])

  return <TimeContext.Provider value={time}>{children}</TimeContext.Provider>
}

// Component consuming the shared time
const LocalTime = () => {
  const time = useContext(TimeContext)
  return <span>{time}, GMT+3</span>
}

export default LocalTime
