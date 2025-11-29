import { useNavigate } from 'react-router-dom';
import './MyMeasurementsHeader.css';

function MyMeasurementsHeader() {
    const navigate = useNavigate();

    const handleAddNew = () => {
        navigate('/customer/measurements/new');
    };

    return (
        <div className="my-measurements-header">
            <div className="my-measurements-header-content">
                <h1 className="my-measurements-header-title">My Measurements</h1>
                <p className="my-measurements-header-subtitle">
                    Manage your measurement profiles for a perfect fit every time.
                </p>
            </div>
            <button className="my-measurements-header-button" onClick={handleAddNew}>
                <span className="material-symbols-outlined">add</span>
                <span>Add New Profile</span>
            </button>
        </div>
    );
}

export default MyMeasurementsHeader;
