import './RecentOrders.css';

function RecentOrders() {
    const orders = [
        {
            id: '#1024-A5',
            item: 'Custom Suit',
            date: '15 Aug 2024',
            status: 'In Progress',
            statusClass: 'in-progress'
        },
        {
            id: '#1023-B2',
            item: 'Linen Shirt',
            date: '02 Aug 2024',
            status: 'Shipped',
            statusClass: 'shipped'
        },
        {
            id: '#1021-C9',
            item: 'Wedding Tuxedo',
            date: '18 Jul 2024',
            status: 'Delivered',
            statusClass: 'delivered'
        }
    ];

    return (
        <div className="recent-orders-section">
            {/* Section Header */}
            <div className="recent-orders-header">
                <h2 className="recent-orders-title">Your Recent Orders</h2>
                <a className="recent-orders-link" href="#">View All Orders</a>
            </div>

            {/* Orders Table */}
            <div className="recent-orders-table-container">
                <div className="recent-orders-table-wrapper">
                    <table className="recent-orders-table">
                        <thead className="recent-orders-thead">
                            <tr>
                                <th className="recent-orders-th">Order ID</th>
                                <th className="recent-orders-th">Item(s)</th>
                                <th className="recent-orders-th">Order Date</th>
                                <th className="recent-orders-th">Status</th>
                                <th className="recent-orders-th text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="recent-orders-tbody">
                            {orders.map((order, index) => (
                                <tr key={index} className="recent-orders-row">
                                    <td className="recent-orders-td font-medium">{order.id}</td>
                                    <td className="recent-orders-td">{order.item}</td>
                                    <td className="recent-orders-td">{order.date}</td>
                                    <td className="recent-orders-td">
                                        <span className={`order-status-badge ${order.statusClass}`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="recent-orders-td text-right">
                                        <a className="order-action-link" href="#">
                                            View Details
                                        </a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default RecentOrders;
