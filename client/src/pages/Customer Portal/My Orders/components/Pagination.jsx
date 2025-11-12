import { useState } from 'react';
import './Pagination.css';

function Pagination() {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 3;

    const handlePrevious = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePageClick = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="pagination-wrapper">
            <nav className="pagination">
                <button
                    className="pagination-button"
                    onClick={handlePrevious}
                    disabled={currentPage === 1}
                    aria-label="Previous page"
                >
                    <span className="material-symbols-outlined">chevron_left</span>
                </button>

                {[...Array(totalPages)].map((_, index) => {
                    const page = index + 1;
                    return (
                        <button
                            key={page}
                            className={`pagination-number ${currentPage === page ? 'active' : ''}`}
                            onClick={() => handlePageClick(page)}
                        >
                            {page}
                        </button>
                    );
                })}

                <button
                    className="pagination-button"
                    onClick={handleNext}
                    disabled={currentPage === totalPages}
                    aria-label="Next page"
                >
                    <span className="material-symbols-outlined">chevron_right</span>
                </button>
            </nav>
        </div>
    );
}

export default Pagination;
