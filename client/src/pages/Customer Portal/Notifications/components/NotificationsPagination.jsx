import { useState } from 'react';
import './NotificationsPagination.css';

function NotificationsPagination() {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 5;

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

    return (
        <div className="notifications-pagination">
            <button
                className="notifications-pagination-button"
                onClick={handlePrevious}
                disabled={currentPage === 1}
            >
                <span className="material-symbols-outlined">arrow_back</span>
                Previous
            </button>
            <p className="notifications-pagination-text">
                Page {currentPage} of {totalPages}
            </p>
            <button
                className="notifications-pagination-button"
                onClick={handleNext}
                disabled={currentPage === totalPages}
            >
                Next
                <span className="material-symbols-outlined">arrow_forward</span>
            </button>
        </div>
    );
}

export default NotificationsPagination;
