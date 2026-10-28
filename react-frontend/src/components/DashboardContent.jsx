import { useState } from 'react';
import CategoriesPage from './CategoriesPage';
import DashboardFooter from './DashboardFooter';
import OrdersPage from './OrdersPage';
import PageHeading from './PageHeading';
import StoreOverview from './StoreOverview';

function DashboardContent({ activeView, onNavigate, store }) {
  const [query, setQuery] = useState('');

  return (
    <div className="content">
      <PageHeading activeView={activeView} refreshing={store.refreshing} onRefresh={store.refresh} />
      {activeView === 'overview' && <StoreOverview {...store} onNavigate={onNavigate} />}
      {activeView === 'categories' && <CategoriesPage store={store} query={query} onQueryChange={setQuery} />}
      {activeView === 'orders' && <OrdersPage store={store} query={query} onQueryChange={setQuery} />}
      <DashboardFooter connectionStatus={store.connectionStatus} hasError={Boolean(store.categoryError || store.orderError)} />
    </div>
  );
}

export default DashboardContent;
