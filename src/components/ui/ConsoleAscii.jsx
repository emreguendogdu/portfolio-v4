import { useEffect } from "react"

const asciiArt = `
                                              8 
                                              8 
.oPYo. ooYoYo. oPYo. .oPYo. .oPYo. odYo. .oPYo8 
8oooo8 8' 8  8 8  \`' 8oooo8 8    8 8' \`8 8    8 
8.     8  8  8 8     8.     8    8 8   8 8    8 
\`Yooo' 8  8  8 8     \`Yooo' \`YooP8 8   8 \`YooP' 
:.....:..:..:....:::::.....::....8 ..::..:.....:
::::::::::::::::::::::::::::::ooP'.:::::::::::::
::::::::::::::::::::::::::::::...:::::::::::::::
`

const ConsoleAscii = () => {
  useEffect(() => {
    console.log(`%c${asciiArt}`, "color: white; font-family: monospace;")
  }, [])

  return null
}

export default ConsoleAscii
