import { useEffect } from "react"
import { useState } from "react"
import { Blurhash } from "react-blurhash"
import { getPlaiceholder } from "plaiceholder"
import { useMemo } from "react"

const getBlurHash = async (src) => {
  const { base64 } = await getPlaiceholder(`http://localhost:5173/${src}`)
  return base64
}

// eslint-disable-next-line react/prop-types
export default function ImageComponent({ src, className, alt }) {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [hash, setHash] = useState(null)

  useEffect(() => {
    const img = new Image()
    img.onload = () => {
      setImageLoaded(true)
    }
    img.src = src
  }, [src])

  useEffect(() => {
    getBlurHash(src).then((hash) => {
      setHash(hash)
    })
  }, [src])

  // useMemo(() => {
  //   getBlurHash(src).then((hash) => {
  //     setHash(hash)
  //   })
  // }, [src])

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
      />
    </>
  )
}
