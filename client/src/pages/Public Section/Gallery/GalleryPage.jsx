import './GalleryPage.css';
import GalleryHeader from './components/GalleryHeader';
import GalleryFilters from './components/GalleryFilters';
import GalleryGrid from './components/GalleryGrid';
import GalleryCTA from './components/GalleryCTA';
import NaveBar from '../Landing Page/components/naveBar';

function GalleryPage() {
    return (
        <div className="gallery-page">
            <div className="gallery-page-inner">
                <NaveBar/>
                <div className="gallery-page-content-wrapper">
                    <div className="gallery-page-content">
                        <GalleryHeader />
                        <GalleryFilters />
                        <GalleryGrid />
                        <GalleryCTA />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GalleryPage;
