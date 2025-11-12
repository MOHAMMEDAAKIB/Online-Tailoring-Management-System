import './MeasurementFormPage.css';
import MeasurementNavBar from './components/MeasurementNavBar';
import MeasurementHeader from './components/MeasurementHeader';
import MeasurementDiagram from './components/MeasurementDiagram';
import MeasurementForm from './components/MeasurementForm';

function MeasurementFormPage() {
    return (
        <div className="measurement-form-page">
            <MeasurementNavBar />
            <main className="measurement-form-main">
                <div className="measurement-form-container">
                    <MeasurementHeader />
                    <div className="measurement-form-content">
                        <MeasurementDiagram />
                        <MeasurementForm />
                    </div>
                </div>
            </main>
        </div>
    );
}

export default MeasurementFormPage;
