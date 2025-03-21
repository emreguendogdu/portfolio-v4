import Hero from "./components/landing/Hero"
import About from "./components/landing/About"
import Projects from "./components/landing/Projects"
import Header from "./components/landing/Header"
import Footer from "./components/landing/Footer"
import Preloader from "./components/ui/Preloader"

export default function App() {
  return (
    <>
      <Preloader />
      <Hero />
      <Header />
      <About />
      <Projects />
      <Footer />
    </>
  )
}
