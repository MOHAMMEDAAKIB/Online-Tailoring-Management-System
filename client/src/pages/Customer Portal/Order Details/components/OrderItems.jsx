import { useState } from 'react';
import './OrderItems.css';

function OrderItems() {
    const [items] = useState([
        {
            id: 1,
            name: 'Formal Trousers',
            fabric: 'Wool Blend',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDonzyHAPoyBm2UMVp1P6edU6Gug8sFCnzNlvsKj5kOkCsM4Xf724LEXSNgt7VOXMyTbFuQeE9-73cUBd6btVIU0GIWCkVRKC47arhy5sgP5QYbzbSfzgUUvWDGfVmIKsSI14akpa-zvWZnm5YEHpMROWgnNT1ayKFjd7NkwfVTgmt_UrLIrg8orUVLV13X_Vtt-qcIoqg6RS7oZ4bbABeJA0wf8bUTKLT1_P4uaoy7zAYfsOUmIhz1W1TmCvAOGGU4fNJ2m0t9OhkP',
            measurements: [
                { label: 'Waist', value: '32 inches' },
                { label: 'Length', value: '40 inches' },
                { label: 'Inseam', value: '30 inches' },
                { label: 'Thigh', value: '24 inches' },
                { label: 'Cuff', value: '15 inches' }
            ]
        },
        {
            id: 2,
            name: 'Linen Kurta',
            fabric: 'Pure Linen',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAlNOxFaan8NQkE1X7q-qwCKR6ld3KOhkylgcpUn6wYtM13GTrMWooN-I2nBslLnIdb_w5g3Ay4uixz89rSiR2DRKzF6KxbXeZthXyJS3fdOXU01gVLrbL_sIgIo1yJUsYrQzLpEhcncJVzSj3SJngOO-QHiCWwNXDix96e_8K6kTatvlhmYn7sPfhBeuc0xRbVHlzJXpU23HpfV8J0Eye4qFLFfbf76vpY31pUx21jqxVRctHGZb2h2yW_16KKBLZr7-rpUECGBUqm',
            measurements: [
                { label: 'Chest', value: '40 inches' },
                { label: 'Length', value: '38 inches' },
                { label: 'Shoulder', value: '18 inches' },
                { label: 'Sleeve', value: '25 inches' }
            ]
        }
    ]);

    const [openItems, setOpenItems] = useState({});

    const toggleItem = (id) => {
        setOpenItems(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    return (
        <div className="order-items-card">
            <h2 className="order-items-title">Order Items ({items.length})</h2>
            <div className="order-items-list">
                {items.map((item, index) => (
                    <details
                        key={item.id}
                        className="order-item"
                        open={openItems[item.id]}
                        onToggle={() => toggleItem(item.id)}
                    >
                        <summary className="order-item-summary">
                            <div className="order-item-header">
                                <img
                                    className="order-item-image"
                                    src={item.image}
                                    alt={item.name}
                                />
                                <div className="order-item-info">
                                    <p className="order-item-name">{item.name}</p>
                                    <p className="order-item-fabric">Fabric: {item.fabric}</p>
                                </div>
                            </div>
                            <span className="material-symbols-outlined order-item-icon">
                                expand_more
                            </span>
                        </summary>
                        <div className="order-item-details">
                            <h4 className="order-item-details-title">Measurements</h4>
                            <div className="order-item-measurements">
                                {item.measurements.map((measurement, idx) => (
                                    <p key={idx} className="order-item-measurement">
                                        <strong>{measurement.label}:</strong> {measurement.value}
                                    </p>
                                ))}
                            </div>
                        </div>
                    </details>
                ))}
            </div>
        </div>
    );
}

export default OrderItems;
