import { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import { getAllMeasurements } from '../../../../api/masermentAPI';
import './AdminMeasurementManagementPage.css';

function AdminMeasurementManagementPage() {
    const [measurements, setMeasurements] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);
    const itemsPerPage = 10;

    useEffect(() => {
        fetchMeasurements();
    }, []);

    const fetchMeasurements = async () => {
        try {
            setLoading(true);
            const response = await getAllMeasurements();
            if (response.data.success) {
                setMeasurements(response.data.data.measurements);
                setTotalResults(response.data.count);
            }
        } catch (error) {
            console.error('Error fetching measurements:', error);
        } finally {
            setLoading(false);
        }
    };

    const filteredMeasurements = measurements.filter((m) => {
        const searchLower = searchTerm.toLowerCase();
        return (
            m.user_id.toString().includes(searchLower) ||
            m.id.toString().includes(searchLower)
        );
    });

    const paginatedMeasurements = filteredMeasurements.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const totalPages = Math.ceil(filteredMeasurements.length / itemsPerPage);

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        });
    };

    const getMeasurementType = (measurement) => {
        const types = [];
        if (measurement.chest) types.push('Chest');
        if (measurement.waist) types.push('Waist');
        if (measurement.length) types.push('Length');
        return types.join(', ') || 'Custom';
    };

    const handleEdit = (id) => {
        console.log('Edit measurement:', id);
    };

    const handleHistory = (id) => {
        console.log('View history:', id);
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this measurement?')) {
            console.log('Delete measurement:', id);
        }
    };

    return (
        <div className="admin-measurement-management-page">
            <Sidebar />
            <main className="admin-measurement-management-main">
                <div className="admin-measurement-management-container">
                    {/* Page Heading */}
                    <div className="admin-measurement-management-header">
                        <div>
                            <h1 className="admin-measurement-management-title">
                                Measurement Management
                            </h1>
                            <p className="admin-measurement-management-subtitle">
                                View, add, and edit customer measurements.
                            </p>
                        </div>
                    </div>

                    {/* Search and Filter Bar */}
                    <div className="admin-measurement-management-search-bar">
                        <div className="admin-measurement-management-search-wrapper">
                            <div className="admin-measurement-management-search-input-wrapper">
                                <span className="material-symbols-outlined">search</span>
                                <input
                                    type="text"
                                    placeholder="Search by Customer Name, Email, or ID..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="admin-measurement-management-search-input"
                                />
                            </div>
                        </div>
                        <div className="admin-measurement-management-actions">
                            <button className="admin-measurement-management-filter-btn">
                                <span className="material-symbols-outlined">filter_list</span>
                            </button>
                            <button className="admin-measurement-management-add-btn">
                                <span 
                                    className="material-symbols-outlined" 
                                    style={{ fontVariationSettings: "'FILL' 1" }}
                                >
                                    add
                                </span>
                                <span>Add New Measurement</span>
                            </button>
                        </div>
                    </div>

                    {/* Table */}
                    <div className="admin-measurement-management-table-wrapper">
                        {loading ? (
                            <div className="admin-measurement-management-loading">
                                Loading measurements...
                            </div>
                        ) : paginatedMeasurements.length === 0 ? (
                            <div className="admin-measurement-management-empty">
                                No measurements found
                            </div>
                        ) : (
                            <table className="admin-measurement-management-table">
                                <thead>
                                    <tr>
                                        <th>Customer</th>
                                        <th>Customer ID</th>
                                        <th>Last Updated</th>
                                        <th>Measurement Type</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {paginatedMeasurements.map((measurement) => (
                                        <tr key={measurement.id}>
                                            <td>Customer #{measurement.user_id}</td>
                                            <td>CUST-{String(measurement.user_id).padStart(5, '0')}</td>
                                            <td>{formatDate(measurement.created_at)}</td>
                                            <td>
                                                <span className="admin-measurement-management-badge">
                                                    {getMeasurementType(measurement)}
                                                </span>
                                            </td>
                                            <td>
                                                <div className="admin-measurement-management-row-actions">
                                                    <button
                                                        onClick={() => handleEdit(measurement.id)}
                                                        className="admin-measurement-management-icon-btn"
                                                    >
                                                        <span className="material-symbols-outlined">edit</span>
                                                    </button>
                                                    <button
                                                        onClick={() => handleHistory(measurement.id)}
                                                        className="admin-measurement-management-icon-btn"
                                                    >
                                                        <span className="material-symbols-outlined">history</span>
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(measurement.id)}
                                                        className="admin-measurement-management-icon-btn delete"
                                                    >
                                                        <span className="material-symbols-outlined">delete</span>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}

                        {/* Pagination */}
                        {!loading && paginatedMeasurements.length > 0 && (
                            <div className="admin-measurement-management-pagination">
                                <div className="admin-measurement-management-pagination-info">
                                    Showing {(currentPage - 1) * itemsPerPage + 1} to{' '}
                                    {Math.min(currentPage * itemsPerPage, filteredMeasurements.length)} of{' '}
                                    {filteredMeasurements.length} results
                                </div>
                                <div className="admin-measurement-management-pagination-controls">
                                    <button
                                        onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                                        disabled={currentPage === 1}
                                        className="admin-measurement-management-pagination-btn"
                                    >
                                        <span className="material-symbols-outlined">chevron_left</span>
                                    </button>
                                    {[...Array(Math.min(totalPages, 5))].map((_, i) => {
                                        let pageNum;
                                        if (totalPages <= 5) {
                                            pageNum = i + 1;
                                        } else if (currentPage <= 3) {
                                            pageNum = i + 1;
                                        } else if (currentPage >= totalPages - 2) {
                                            pageNum = totalPages - 4 + i;
                                        } else {
                                            pageNum = currentPage - 2 + i;
                                        }
                                        
                                        return (
                                            <button
                                                key={pageNum}
                                                onClick={() => setCurrentPage(pageNum)}
                                                className={`admin-measurement-management-pagination-btn ${
                                                    currentPage === pageNum ? 'active' : ''
                                                }`}
                                            >
                                                {pageNum}
                                            </button>
                                        );
                                    })}
                                    {totalPages > 5 && currentPage < totalPages - 2 && (
                                        <>
                                            <span className="admin-measurement-management-pagination-ellipsis">...</span>
                                            <button
                                                onClick={() => setCurrentPage(totalPages)}
                                                className="admin-measurement-management-pagination-btn"
                                            >
                                                {totalPages}
                                            </button>
                                        </>
                                    )}
                                    <button
                                        onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                                        disabled={currentPage === totalPages}
                                        className="admin-measurement-management-pagination-btn"
                                    >
                                        <span className="material-symbols-outlined">chevron_right</span>
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}

export default AdminMeasurementManagementPage;
