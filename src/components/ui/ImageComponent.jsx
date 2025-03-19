/* eslint-disable react/prop-types */
import { useEffect } from "react"
import { useState } from "react"
import { Blurhash } from "react-blurhash"

export default function ImageComponent({
  src,
  className,
  alt,
  hash = "30Dl[{0000~q",
  lazy,
}) {
  const [imageLoaded, setImageLoaded] = useState(false)

  useEffect(() => {
    const img = new Image()
    img.onload = () => {
      setImageLoaded(true)
    }
    img.src = src
  }, [src])

  return (
    <>
      <div
        className="relative w-full h-full"
        style={{ display: imageLoaded ? "none" : "block" }}
      >
        <Blurhash
          hash={hash}
          width="100%"
          height="100%"
          resolutionX={32}
          resolutionY={32}
          punch={1}
        />
      </div>
      <img
        src={src}
        alt={alt}
        className={className}
        style={{ display: !imageLoaded ? "none" : "block" }}
        decoding="async"
        loading={lazy ? "lazy" : "eager"}
      />
    </>
  )
}
