import Hero from "./components/landing/Hero"
import About from "./components/landing/About"
import Projects from "./components/landing/Projects"
import Header from "./components/landing/Header"
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
        {/* <Header /> */}
        <About />
        <Projects />
        <Footer />
      </ScrollProvider>
    </>
  )
}
