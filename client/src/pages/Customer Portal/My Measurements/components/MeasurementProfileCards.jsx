import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllMeasurements, deleteMeasurement } from '../../../../api/masermentAPI';
import './MeasurementProfileCards.css';

function MeasurementProfileCards() {
    const navigate = useNavigate();
    const [measurements, setMeasurements] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchMeasurements();
    }, []);

    const fetchMeasurements = async () => {
        try {
            setLoading(true);
            const response = await getAllMeasurements();
            if (response.data.success) {
                setMeasurements(response.data.data.measurements);
            }
        } catch (err) {
            console.error('Error fetching measurements:', err);
            setError('Failed to load measurements. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (id) => {
        navigate(`/customer/measurements/edit/${id}`);
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this measurement?')) {
            return;
        }

        try {
            const response = await deleteMeasurement(id);
            if (response.data.success) {
                alert('Measurement deleted successfully!');
                // Refresh the list
                fetchMeasurements();
            }
        } catch (err) {
            console.error('Error deleting measurement:', err);
            alert(err.response?.data?.message || 'Failed to delete measurement. Please try again.');
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            day: '2-digit', 
            month: 'short', 
            year: 'numeric' 
        });
    };

    const formatMeasurement = (measurement) => {
        const items = [];
        if (measurement.chest) items.push({ label: 'Chest', value: `${measurement.chest} ${measurement.unit}` });
        if (measurement.waist) items.push({ label: 'Waist', value: `${measurement.waist} ${measurement.unit}` });
        if (measurement.hips) items.push({ label: 'Hips', value: `${measurement.hips} ${measurement.unit}` });
        if (measurement.sleeve) items.push({ label: 'Sleeve', value: `${measurement.sleeve} ${measurement.unit}` });
        if (measurement.shoulder) items.push({ label: 'Shoulder', value: `${measurement.shoulder} ${measurement.unit}` });
        if (measurement.neck) items.push({ label: 'Neck', value: `${measurement.neck} ${measurement.unit}` });
        if (measurement.length) items.push({ label: 'Length', value: `${measurement.length} ${measurement.unit}` });
        return items;
    };

    if (loading) {
        return (
            <div className="measurement-profile-cards">
                <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
                    Loading measurements...
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="measurement-profile-cards">
                <div style={{ 
                    textAlign: 'center', 
                    padding: '40px', 
                    color: '#c33',
                    backgroundColor: '#fee',
                    borderRadius: '8px',
                    border: '1px solid #fcc'
                }}>
                    {error}
                </div>
            </div>
        );
    }

    if (measurements.length === 0) {
        return (
            <div className="measurement-profile-cards">
                <div style={{ 
                    textAlign: 'center', 
                    padding: '40px', 
                    color: '#666',
                    backgroundColor: '#f9f9f9',
                    borderRadius: '8px',
                    border: '1px solid #e0e0e0'
                }}>
                    <p style={{ marginBottom: '16px' }}>No measurements found.</p>
                    <button 
                        onClick={() => navigate('/customer/measurements/new')}
                        style={{
                            padding: '10px 20px',
                            backgroundColor: '#007bff',
                            color: 'white',
                            border: 'none',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontSize: '14px'
                        }}
                    >
                        Add Your First Measurement
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="measurement-profile-cards">
            {measurements.map((measurement) => {
                const formattedItems = formatMeasurement(measurement);
                return (
                    <div key={measurement.id} className="measurement-profile-card">
                        <div className="measurement-profile-card-body">
                            <h3 className="measurement-profile-card-title">
                                Measurement #{measurement.id}
                            </h3>
                            <p className="measurement-profile-card-date">
                                Last Updated: {formatDate(measurement.created_at)}
                            </p>
                            <div className="measurement-profile-card-measurements">
                                {formattedItems.map((item, index) => (
                                    <p key={index} className="measurement-profile-card-item">
                                        <span className="measurement-profile-card-label">
                                            {item.label}:
                                        </span>{' '}
                                        {item.value}
                                    </p>
                                ))}
                            </div>
                            {measurement.notes && (
                                <p className="measurement-profile-card-notes" style={{ 
                                    marginTop: '12px', 
                                    fontSize: '13px', 
                                    color: '#666',
                                    fontStyle: 'italic'
                                }}>
                                    Notes: {measurement.notes}
                                </p>
                            )}
                        </div>
                        <div className="measurement-profile-card-actions">
                            <button 
                                className="measurement-profile-card-button edit"
                                onClick={() => handleEdit(measurement.id)}
                            >
                                <span className="material-symbols-outlined">edit</span>
                                <span>Edit</span>
                            </button>
                            <button 
                                className="measurement-profile-card-button delete"
                                onClick={() => handleDelete(measurement.id)}
                            >
                                <span className="material-symbols-outlined">delete</span>
                                <span>Delete</span>
                            </button>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default MeasurementProfileCards;
