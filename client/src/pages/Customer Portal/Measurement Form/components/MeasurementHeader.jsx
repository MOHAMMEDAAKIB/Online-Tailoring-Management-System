import './MeasurementHeader.css';

function MeasurementHeader() {
    return (
        <div className="measurement-header">
            <div className="measurement-header-content">
                <h1 className="measurement-header-title">My Measurements</h1>
                <p className="measurement-header-subtitle">
                    Create a new measurement profile. Click or hover over the points on the diagram for guidance.
                </p>
            </div>
        </div>
    );
}

export default MeasurementHeader;
