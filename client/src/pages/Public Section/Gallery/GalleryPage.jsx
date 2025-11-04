import './GalleryPage.css';
import GalleryNavBar from './components/GalleryNavBar';
import GalleryHeader from './components/GalleryHeader';
import GalleryFilters from './components/GalleryFilters';
import GalleryGrid from './components/GalleryGrid';
import GalleryCTA from './components/GalleryCTA';

function GalleryPage() {
    return (
        <div className="gallery-page">
            <div className="gallery-page-inner">
                <GalleryNavBar />
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
