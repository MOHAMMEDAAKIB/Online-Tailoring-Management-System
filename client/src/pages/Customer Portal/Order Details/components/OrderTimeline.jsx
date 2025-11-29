import './OrderTimeline.css';

function OrderTimeline({ status, timeline }) {
    const getTimelineSteps = () => {
        const allSteps = [
            { id: 'pending', label: 'Order Placed', icon: 'receipt' },
            { id: 'in_progress', label: 'In Progress', icon: 'hourglass_top' },
            { id: 'ready', label: 'Ready for Pickup', icon: 'local_mall' },
            { id: 'delivered', label: 'Delivered', icon: 'check_circle' }
        ];

        const statusOrder = ['pending', 'in_progress', 'ready', 'delivered'];
        const currentIndex = statusOrder.indexOf(status);

        return allSteps.map((step, index) => {
            const stepTimeline = timeline?.[step.id];
            let stepStatus = 'pending';
            
            if (index < currentIndex) {
                stepStatus = 'completed';
            } else if (index === currentIndex) {
                stepStatus = 'active';
            }

            return {
                ...step,
                status: stepStatus,
                date: stepTimeline ? new Date(stepTimeline).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                }) : ''
            };
        });
    };

    const steps = getTimelineSteps();

    return (
        <div className="order-timeline-card">
            <h2 className="order-timeline-title">Order Timeline</h2>
            <div className="order-timeline">
                {steps.map((step, index) => (
                    <div key={step.id} className="order-timeline-step-wrapper">
                        <div className="order-timeline-step-column">
                            <div className={`order-timeline-circle ${step.status}`}>
                                <span className="material-symbols-outlined">{step.icon}</span>
                            </div>
                            {index < steps.length - 1 && (
                                <div className={`order-timeline-line ${step.status === 'completed' ? 'completed' : 'pending'}`}></div>
                            )}
                        </div>
                        <div className={`order-timeline-content ${index < steps.length - 1 ? 'with-line' : ''}`}>
                            <p className={`order-timeline-label ${step.status}`}>{step.label}</p>
                            {step.date && (
                                <p className="order-timeline-date">{step.date}</p>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default OrderTimeline;
