/* eslint-disable react/prop-types */
import { useState } from "react"
import { useEffect } from "react"

const useProgressiveImg = (lowQualitySrc, highQualitySrc) => {
  const [src, setSrc] = useState(lowQualitySrc)
  useEffect(() => {
    setSrc(lowQualitySrc)
    const img = new Image()
    img.src = highQualitySrc
    img.onload = () => {
      setSrc(highQualitySrc)
    }
  }, [lowQualitySrc, highQualitySrc])
  return [src, { blur: src === lowQualitySrc }]
}

const BlurredUpImage = ({ tiny, large, alt = "", className = "" }) => {
  const [src, { blur }] = useProgressiveImg(tiny, large)
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading="lazy"
      decoding="async"
      style={{
        filter: blur ? "blur(20px)" : "none",
        transition: blur ? "none" : "filter 0.15s ease-out",
      }}
    />
  )
}

export default BlurredUpImage
