import { useState } from 'react';
import './MeasurementProfileCards.css';

function MeasurementProfileCards() {
    const [profiles] = useState([
        {
            id: 1,
            name: 'Formal Wear Profile',
            lastUpdated: '15 Oct 2023',
            measurements: [
                { label: 'Chest', value: '42 in' },
                { label: 'Waist', value: '34 in' },
                { label: 'Sleeve', value: '25 in' },
                { label: 'Inseam', value: '32 in' }
            ]
        },
        {
            id: 2,
            name: 'Casual Wear Profile',
            lastUpdated: '28 Sep 2023',
            measurements: [
                { label: 'Chest', value: '41 in' },
                { label: 'Waist', value: '33 in' },
                { label: 'Sleeve', value: '24.5 in' },
                { label: 'Inseam', value: '31 in' }
            ]
        },
        {
            id: 3,
            name: 'Work Trousers',
            lastUpdated: '02 Jul 2023',
            measurements: [
                { label: 'Waist', value: '34 in' },
                { label: 'Hips', value: '40 in' },
                { label: 'Inseam', value: '32 in' },
                { label: 'Thigh', value: '24 in' }
            ]
        }
    ]);

    const handleEdit = (id) => {
        console.log('Edit profile:', id);
    };

    const handleDelete = (id) => {
        console.log('Delete profile:', id);
    };

    return (
        <div className="measurement-profile-cards">
            {profiles.map((profile) => (
                <div key={profile.id} className="measurement-profile-card">
                    <div className="measurement-profile-card-body">
                        <h3 className="measurement-profile-card-title">{profile.name}</h3>
                        <p className="measurement-profile-card-date">
                            Last Updated: {profile.lastUpdated}
                        </p>
                        <div className="measurement-profile-card-measurements">
                            {profile.measurements.map((measurement, index) => (
                                <p key={index} className="measurement-profile-card-item">
                                    <span className="measurement-profile-card-label">
                                        {measurement.label}:
                                    </span>{' '}
                                    {measurement.value}
                                </p>
                            ))}
                        </div>
                    </div>
                    <div className="measurement-profile-card-actions">
                        <button 
                            className="measurement-profile-card-button edit"
                            onClick={() => handleEdit(profile.id)}
                        >
                            <span className="material-symbols-outlined">edit</span>
                            <span>Edit</span>
                        </button>
                        <button 
                            className="measurement-profile-card-button delete"
                            onClick={() => handleDelete(profile.id)}
                        >
                            <span className="material-symbols-outlined">delete</span>
                            <span>Delete</span>
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default MeasurementProfileCards;
