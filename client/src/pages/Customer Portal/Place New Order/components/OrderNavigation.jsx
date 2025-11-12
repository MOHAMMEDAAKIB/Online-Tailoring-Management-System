import './OrderNavigation.css';

function OrderNavigation() {
    const handlePrevious = () => {
        console.log('Previous step');
    };

    const handleNext = () => {
        console.log('Next step');
    };

    return (
        <div className="order-navigation">
            <button 
                className="order-navigation-button previous" 
                onClick={handlePrevious}
                disabled
            >
                Previous Step
            </button>
            <button 
                className="order-navigation-button next" 
                onClick={handleNext}
            >
                <span>Next Step</span>
                <span className="material-symbols-outlined">arrow_forward</span>
            </button>
        </div>
    );
}

export default OrderNavigation;
