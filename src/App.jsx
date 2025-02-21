import Hero from "./components/landing/Hero"
import About from "./components/landing/About"
import Projects from "./components/landing/Projects"
import HeaderNeu from "./components/landing/HeaderNeu"
import Footer from "./components/landing/Footer"
import Preloader from "./components/ui/Preloader"
import { ScrollProvider } from "./contexts/ScrollContext"
// import MouseTracker from "./components/ui/MouseTracker"

export default function App() {
  return (
    <>
      <ScrollProvider>
        {/* <MouseTracker /> */}
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
