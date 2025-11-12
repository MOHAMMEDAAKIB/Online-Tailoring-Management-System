import './MyOrdersPage.css';
import MyOrdersHeader from './components/MyOrdersHeader';
import MyOrdersSearch from './components/MyOrdersSearch';
import MyOrdersFilters from './components/MyOrdersFilters';
import OrderCard from './components/OrderCard';
import EmptyState from './components/EmptyState';
import Pagination from './components/Pagination';

function MyOrdersPage() {
    return (
        <div className="my-orders-page">
            <div className="my-orders-container">
                <MyOrdersHeader />
                <MyOrdersSearch />
                <MyOrdersFilters />
                <div className="my-orders-list">
                    <OrderCard />
                    <EmptyState />
                </div>
                <Pagination />
            </div>
        </div>
    );
}

export default MyOrdersPage;
