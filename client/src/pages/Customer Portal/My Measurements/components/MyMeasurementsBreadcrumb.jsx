import './MyMeasurementsBreadcrumb.css';
import { Link } from 'react-router-dom';

function MyMeasurementsBreadcrumb() {
    return (
        <div className="my-measurements-breadcrumb">
            <Link className="my-measurements-breadcrumb-link" to="/customer/dashboard">Dashboard</Link>
            <span className="my-measurements-breadcrumb-separator">/</span>
            <span className="my-measurements-breadcrumb-current">My Measurements</span>
        </div>
    );
}

export default MyMeasurementsBreadcrumb;
