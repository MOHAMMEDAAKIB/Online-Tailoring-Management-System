import './landing_page.css';
import NaveBar from './components/naveBar'
import HeroSection from './components/HeroSection'
import ServicesSection from './components/ServicesSection'
import HowItWorksSection from './components/HowItWorksSection'
import GallerySection from './components/GallerySection'
import ContactSection from './components/ContactSection'
import Footer from './components/Footer'

function LandingPage(){
    return(
        <div className="landing-page">
            <div className="landing-page-inner">
                <div className="landing-page-content-wrapper">
                    <div className="landing-page-content">
                        <NaveBar />
                        <main>
                            <HeroSection />
                            <ServicesSection />
                            <HowItWorksSection />
                            <GallerySection />
                            <ContactSection />
                        </main>
                        <Footer />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LandingPage;