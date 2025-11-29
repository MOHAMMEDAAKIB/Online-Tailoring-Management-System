import './RecentOrders.css';
import { Link } from 'react-router-dom';

function RecentOrders() {
    const orders = [
        {
            id: '#1024-A5',
            item: 'Custom Suit',
            date: '15 Aug 2024',
            status: 'In Progress',
            statusClass: 'in-progress',
            orderId: '1024'
        },
        {
            id: '#1023-B2',
            item: 'Linen Shirt',
            date: '02 Aug 2024',
            status: 'Shipped',
            statusClass: 'shipped',
            orderId: '1023'
        },
        {
            id: '#1021-C9',
            item: 'Wedding Tuxedo',
            date: '18 Jul 2024',
            status: 'Delivered',
            statusClass: 'delivered',
            orderId: '1021'
        }
    ];

    return (
        <div className="recent-orders-section">
            {/* Section Header */}
            <div className="recent-orders-header">
                <h2 className="recent-orders-title">Your Recent Orders</h2>
                <Link className="recent-orders-link" to="/customer/orders">View All Orders</Link>
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
                                        <Link className="order-action-link" to={`/customer/orders/${order.orderId}`}>
                                            View Details
                                        </Link>
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
