import Hero from "./components/landing/Hero"
import About from "./components/landing/About"
import Projects from "./components/landing/Projects"
import HeaderNeu from "./components/landing/HeaderNeu"
import Footer from "./components/landing/Footer"
import Preloader from "./components/ui/Preloader"
import { ScrollProvider } from "./contexts/ScrollContext"

export default function App() {
  return (
    <>
      <ScrollProvider>
        <Preloader />
        <Hero />
        <HeaderNeu />
        <About />
        <Projects />
        <Footer />
      </ScrollProvider>
    </>
  )
}
