import './ContactPage.css';
import NavBar from '../../Landing Page/components/naveBar';
import ContactHeader from './components/ContactHeader';
import ContactIntro from './components/ContactIntro';
import ContactInfo from './components/ContactInfo';
import ContactForm from './components/ContactForm';
import ContactFooter from './components/ContactFooter';

function ContactPage() {
    return (
        <div className="contact-page">
            <div className="contact-page-inner">
                <NavBar />
                <main className="contact-page-main">
                    <div className="contact-page-content">
                        <ContactHeader />
                        <ContactIntro />
                        <div className="contact-page-grid">
                            <ContactInfo />
                            <ContactForm />
                        </div>
                    </div>
                </main>
                <ContactFooter />
            </div>
        </div>
    );
}

export default ContactPage;
