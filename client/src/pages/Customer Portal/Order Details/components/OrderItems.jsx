import { useState } from 'react';
import './OrderItems.css';

function OrderItems({ items = [] }) {
    const [openItems, setOpenItems] = useState({});

    const toggleItem = (id) => {
        setOpenItems(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    if (items.length === 0) {
        return (
            <div className="order-items-card">
                <h2 className="order-items-title">Order Items (0)</h2>
                <p className="order-items-empty">No items found for this order.</p>
            </div>
        );
    }

    return (
        <div className="order-items-card">
            <h2 className="order-items-title">Order Items ({items.length})</h2>
            <div className="order-items-list">
                {items.map((item, index) => (
                    <details
                        key={item.id || index}
                        className="order-item"
                        open={openItems[item.id || index]}
                        onToggle={() => toggleItem(item.id || index)}
                    >
                        <summary className="order-item-summary">
                            <div className="order-item-header">
                                {item.image_url && (
                                    <img
                                        className="order-item-image"
                                        src={item.image_url}
                                        alt={item.garment_type}
                                    />
                                )}
                                <div className="order-item-info">
                                    <p className="order-item-name">
                                        {item.quantity}x {item.garment_type}
                                    </p>
                                    {item.fabric && (
                                        <p className="order-item-fabric">Fabric: {item.fabric}</p>
                                    )}
                                    <p className="order-item-price">${parseFloat(item.price).toFixed(2)}</p>
                                </div>
                            </div>
                            <span className="material-symbols-outlined order-item-icon">
                                expand_more
                            </span>
                        </summary>
                        <div className="order-item-details">
                            {item.measurements && Object.keys(item.measurements).length > 0 ? (
                                <>
                                    <h4 className="order-item-details-title">Measurements</h4>
                                    <div className="order-item-measurements">
                                        {Object.entries(item.measurements).map(([key, value]) => (
                                            <p key={key} className="order-item-measurement">
                                                <strong>{key.replace('_', ' ')}:</strong> {value}
                                            </p>
                                        ))}
                                    </div>
                                </>
                            ) : (
                                <p className="order-item-no-measurements">No measurements recorded</p>
                            )}
                            {item.notes && (
                                <div className="order-item-notes">
                                    <h4 className="order-item-details-title">Notes</h4>
                                    <p>{item.notes}</p>
                                </div>
                            )}
                        </div>
                    </details>
                ))}
            </div>
        </div>
    );
}

export default OrderItems;
