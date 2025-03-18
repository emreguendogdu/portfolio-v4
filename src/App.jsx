import Hero from "./components/landing/Hero"
import About from "./components/landing/About"
import Projects from "./components/landing/Projects"
import Header from "./components/landing/Header"
import Footer from "./components/landing/Footer"
import Preloader from "./components/ui/Preloader"
import { ScrollProvider } from "./contexts/ScrollContext"
import MouseTracker from "./components/ui/MouseTracker"

export default function App() {
  return (
    <>
      <ScrollProvider>
        {/* <MouseTracker /> */}
        <Preloader />
        <Header />
        {/* <Hero /> */}
        {/* <About /> */}
        <Projects />
        <Footer />
      </ScrollProvider>
    </>
  )
}
