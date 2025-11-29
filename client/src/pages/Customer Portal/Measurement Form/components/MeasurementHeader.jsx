import './MeasurementHeader.css';

function MeasurementHeader({ title = "My Measurements", subtitle = "Create a new measurement profile. Click or hover over the points on the diagram for guidance." }) {
    return (
        <div className="measurement-header">
            <div className="measurement-header-content">
                <h1 className="measurement-header-title">{title}</h1>
                <p className="measurement-header-subtitle">
                    {subtitle}
                </p>
            </div>
        </div>
    );
}

export default MeasurementHeader;
