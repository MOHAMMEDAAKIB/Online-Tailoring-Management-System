import './MyMeasurementsBreadcrumb.css';

function MyMeasurementsBreadcrumb() {
    return (
        <div className="my-measurements-breadcrumb">
            <a className="my-measurements-breadcrumb-link" href="#">Dashboard</a>
            <span className="my-measurements-breadcrumb-separator">/</span>
            <span className="my-measurements-breadcrumb-current">My Measurements</span>
        </div>
    );
}

export default MyMeasurementsBreadcrumb;
