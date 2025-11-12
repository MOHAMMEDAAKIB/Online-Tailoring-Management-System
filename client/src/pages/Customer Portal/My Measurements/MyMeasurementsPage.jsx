import './MyMeasurementsPage.css';
import MyMeasurementsNavBar from './components/MyMeasurementsNavBar';
import MyMeasurementsBreadcrumb from './components/MyMeasurementsBreadcrumb';
import MyMeasurementsHeader from './components/MyMeasurementsHeader';
import MeasurementProfileCards from './components/MeasurementProfileCards';

function MyMeasurementsPage() {
    return (
        <div className="my-measurements-page">
            <MyMeasurementsNavBar />
            <main className="my-measurements-main">
                <div className="my-measurements-container">
                    <MyMeasurementsBreadcrumb />
                    <MyMeasurementsHeader />
                    <MeasurementProfileCards />
                </div>
            </main>
        </div>
    );
}

export default MyMeasurementsPage;
