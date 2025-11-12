import './MyMeasurementsHeader.css';

function MyMeasurementsHeader() {
    return (
        <div className="my-measurements-header">
            <div className="my-measurements-header-content">
                <h1 className="my-measurements-header-title">My Measurements</h1>
                <p className="my-measurements-header-subtitle">
                    Manage your measurement profiles for a perfect fit every time.
                </p>
            </div>
            <button className="my-measurements-header-button">
                <span className="material-symbols-outlined">add</span>
                <span>Add New Profile</span>
            </button>
        </div>
    );
}

export default MyMeasurementsHeader;
