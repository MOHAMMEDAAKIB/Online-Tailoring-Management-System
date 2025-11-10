import './TrackOrderTimeline.css';

function TrackOrderTimeline() {
    const steps = [
        {
            id: 1,
            title: 'Order Placed',
            date: 'Oct 12, 2023',
            status: 'completed',
            icon: 'check'
        },
        {
            id: 2,
            title: 'Measurements Confirmed',
            date: 'Oct 13, 2023',
            status: 'completed',
            icon: 'check'
        },
        {
            id: 3,
            title: 'Cutting & Sewing',
            date: 'In Progress',
            status: 'current',
            icon: 'hourglass_top'
        },
        {
            id: 4,
            title: 'Ready for Pickup',
            date: null,
            status: 'pending',
            icon: 'local_shipping'
        },
        {
            id: 5,
            title: 'Completed',
            date: null,
            status: 'pending',
            icon: 'task_alt'
        }
    ];

    return (
        <div className="track-order-timeline">
            <ol className="track-order-timeline-list">
                {steps.map((step, index) => (
                    <li key={step.id} className={`track-order-timeline-item ${step.status}`}>
                        {index < steps.length - 1 && (
                            <div className={`track-order-timeline-connector ${step.status === 'completed' ? 'completed' : ''}`}></div>
                        )}
                        <div className="track-order-timeline-step">
                            <div className={`track-order-timeline-icon ${step.status}`}>
                                <span className="material-symbols-outlined">{step.icon}</span>
                            </div>
                        </div>
                        <div className="track-order-timeline-content">
                            <h3 className={`track-order-timeline-title ${step.status}`}>
                                {step.title}
                            </h3>
                            {step.date && (
                                <p className="track-order-timeline-date">{step.date}</p>
                            )}
                        </div>
                    </li>
                ))}
            </ol>
        </div>
    );
}

export default TrackOrderTimeline;
