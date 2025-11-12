import './OrderTimeline.css';

function OrderTimeline() {
    const steps = [
        { id: 1, label: 'Order Placed', date: 'June 1, 2024', status: 'completed', icon: 'check' },
        { id: 2, label: 'Measurement Confirmed', date: 'June 2, 2024', status: 'completed', icon: 'check' },
        { id: 3, label: 'In Progress', date: 'June 5, 2024', status: 'active', icon: 'hourglass_top' },
        { id: 4, label: 'Ready for Pickup', date: '', status: 'pending', icon: 'local_mall' },
        { id: 5, label: 'Completed', date: '', status: 'pending', icon: 'flag' }
    ];

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
