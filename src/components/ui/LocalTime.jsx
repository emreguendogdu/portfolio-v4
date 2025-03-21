/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react"

const TimeContext = createContext("")

export const TimeProvider = ({ children }) => {
  const [time, setTime] = useState(() =>
    new Date().toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
  )

  useEffect(() => {
    const updateTime = () => {
      const newTime = new Date().toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      })

      setTime((prevTime) => (prevTime !== newTime ? newTime : prevTime))
    }

    updateTime() // Set initial time immediately

    const interval = setInterval(updateTime, 60000) // Update every minute

    return () => clearInterval(interval)
  }, [])

  return <TimeContext.Provider value={time}>{children}</TimeContext.Provider>
}

const LocalTime = () => {
  const time = useContext(TimeContext)
  return <span>{time}, GMT+3</span>
}

export default LocalTime
