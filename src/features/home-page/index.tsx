import { Header, Hero, SocialProof, Features, Footer } from './components'

export function LandingPage() {
  return (
    <div
      className="bg-paper text-charcoal font-display antialiased overflow-x-hidden selection:bg-primary selection:text-white"
      style={{
        backgroundImage:
          "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBdpM1wPJm8jf4HtUe1Lv8dThnc_WPHV52OeRntv7zo1dEe_hXMCDaRaYqGD5gSNSLghqA9YGPW5ZJxx6EQMQocZB0EoByHQuqgs_E_-nQX-etdM7BT3IvZ8l4izaCdHQHad_Yk7iatmV4Kn1gaOdIuQSHkEtqKml2hUb-ek4VwUmId6PSEeBsQib7b7uh9X1p67R4dxYJrv0SWvdyful9xTywmGWrYLKFAGrWpJhdrcJT3yz779YgfSgm-14aI9NNU-z6NFY9GCA')",
      }}
    >
      <Header />
      <Hero />
      <SocialProof />
      <Features />
      <Footer />
    </div>
  )
}
