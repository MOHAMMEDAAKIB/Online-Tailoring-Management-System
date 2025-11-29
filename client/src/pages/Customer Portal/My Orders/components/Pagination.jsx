import './Pagination.css';

function Pagination({ currentPage, totalItems, itemsPerPage, onPageChange }) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const handlePrevious = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };

    const handlePageClick = (page) => {
        onPageChange(page);
    };

    // Show max 5 page numbers
    const getPageNumbers = () => {
        const pages = [];
        const maxVisible = 5;
        
        if (totalPages <= maxVisible) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            if (currentPage <= 3) {
                pages.push(1, 2, 3, 4, '...', totalPages);
            } else if (currentPage >= totalPages - 2) {
                pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
            } else {
                pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
            }
        }
        
        return pages;
    };

    if (totalPages <= 1) return null;

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

                {getPageNumbers().map((page, index) => {
                    if (page === '...') {
                        return (
                            <span key={`ellipsis-${index}`} className="pagination-ellipsis">
                                ...
                            </span>
                        );
                    }
                    
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
