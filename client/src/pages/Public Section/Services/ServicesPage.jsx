import './ServicesPage.css';
import NavBar from '../Landing Page/components/naveBar';
import ServicesHero from './components/ServicesHero';
import ServicesGrid from './components/ServicesGrid';
import ServicesFeatures from './components/ServicesFeatures';
import ServicesCTA from './components/ServicesCTA';
import ServicesFooter from './components/ServicesFooter';

function ServicesPage() {
    return (
        <div className="services-page">
            <div className="services-page-container">
                <div className="services-page-wrapper">
                    <div className="services-page-content">
                        <NavBar />
                        <ServicesHero />
                        <ServicesGrid />
                        <ServicesFeatures />
                        <ServicesCTA />
                        <ServicesFooter />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ServicesPage;
