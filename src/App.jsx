import { useCallback, useEffect, useMemo, useState } from 'react';
import './App.css';
import CategoryTable from './components/CategoryTable';
import OrdersTable from './components/OrdersTable';
import PageHeading from './components/PageHeading';
import RecordStates from './components/RecordStates';
import ResourcePage from './components/ResourcePage';
import Sidebar from './components/Sidebar';
import StoreOverview from './components/StoreOverview';
import Topbar from './components/Topbar';
import { formatDate } from './utils/formatDate';

const API_BASE_URL = (
  process.env.REACT_APP_API_BASE_URL || 'http://localhost/projectlaravel/Laravel-backend/public/api/v1'
).replace(/\/$/, '');

async function fetchCollection(resource) {
  const response = await fetch(`${API_BASE_URL}/${resource}`, {
    headers: { Accept: 'application/json' },
  });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}.`);
  }

  let result;
  try {
    result = await response.json();
  } catch {
    throw new Error('The API returned an invalid response.');
  }

  if (Array.isArray(result)) return result;
  if (result && Array.isArray(result.data)) return result.data;
  throw new Error('The API response did not contain a list of records.');
}

function App() {
  const [activeView, setActiveView] = useState('overview');
  const [categories, setCategories] = useState([]);
  const [orders, setOrders] = useState([]);
  const [categoryError, setCategoryError] = useState('');
  const [orderError, setOrderError] = useState('');
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const loadData = useCallback(async () => {
    setCategoriesLoading(true);
    setOrdersLoading(true);
    setCategoryError('');
    setOrderError('');

    const [categoryResult, orderResult] = await Promise.allSettled([
      fetchCollection('categories'),
      fetchCollection('orders'),
    ]);

    if (categoryResult.status === 'fulfilled') setCategories(categoryResult.value);
    else setCategoryError(categoryResult.reason.message || 'Unable to connect to the categories endpoint.');

    if (orderResult.status === 'fulfilled') setOrders(orderResult.value);
    else setOrderError(orderResult.reason.message || 'Unable to connect to the orders endpoint.');

    setCategoriesLoading(false);
    setOrdersLoading(false);
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const mostRecentOrder = useMemo(() => {
    if (!orders.length) return null;
    return orders.reduce((latest, order) => {
      const orderDate = new Date(order.date || order.created_at || 0);
      const latestDate = new Date(latest.date || latest.created_at || 0);
      return orderDate > latestDate ? order : latest;
    });
  }, [orders]);

  const retryCategories = useCallback(async () => {
    setCategoriesLoading(true);
    setCategoryError('');
    try {
      setCategories(await fetchCollection('categories'));
    } catch (error) {
      setCategoryError(error.message || 'Unable to connect to the categories endpoint.');
    } finally {
      setCategoriesLoading(false);
    }
  }, []);

  const retryOrders = useCallback(async () => {
    setOrdersLoading(true);
    setOrderError('');
    try {
      setOrders(await fetchCollection('orders'));
    } catch (error) {
      setOrderError(error.message || 'Unable to connect to the orders endpoint.');
    } finally {
      setOrdersLoading(false);
    }
  }, []);

  const refresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  const categoryContent = categoriesLoading
    ? <RecordStates.Loading />
    : categoryError
      ? <RecordStates.Error message={categoryError} onRetry={retryCategories} />
      : <CategoryTable categories={categories} query={query} />;

  const orderContent = ordersLoading
    ? <RecordStates.Loading />
    : orderError
      ? <RecordStates.Error message={orderError} onRetry={retryOrders} />
      : <OrdersTable orders={orders} query={query} />;

  return (
    <div className="dashboard">
      <Sidebar
        activeView={activeView}
        onNavigate={(view) => { setActiveView(view); setQuery(''); }}
        categories={categories}
        categoriesLoading={categoriesLoading}
        categoryError={categoryError}
        orderError={orderError}
      />

      <main className="main-area">
        <Topbar activeView={activeView} />

        <div className="content">
          <PageHeading activeView={activeView} refreshing={refreshing} onRefresh={refresh} />

          {activeView === 'overview' && (
            <StoreOverview
              categories={categories}
              orders={orders}
              categoriesLoading={categoriesLoading}
              ordersLoading={ordersLoading}
              categoryError={categoryError}
              orderError={orderError}
              mostRecentOrder={mostRecentOrder}
              categoryContent={categoryContent}
              orderContent={orderContent}
              onNavigate={setActiveView}
              formatDate={formatDate}
            />
          )}

          {activeView === 'categories' && (
            <ResourcePage
              title="All categories"
              description={categoriesLoading ? 'Loading categories…' : categoryError ? 'Unable to retrieve categories' : `${categories.length} categories in your catalog`}
              searchLabel="Search categories"
              query={query}
              onQueryChange={setQuery}
            >
              {categoryContent}
            </ResourcePage>
          )}

          {activeView === 'orders' && (
            <ResourcePage
              title="All orders"
              description={ordersLoading ? 'Loading orders…' : orderError ? 'Unable to retrieve orders' : `${orders.length} orders recorded`}
              searchLabel="Search orders"
              query={query}
              onQueryChange={setQuery}
            >
              {orderContent}
            </ResourcePage>
          )}

          <footer className="page-footer">
            <span>Commerce Desk</span>
            <span>Connected to Laravel API <i className={categoryError && orderError ? 'footer-dot offline' : 'footer-dot'} /></span>
          </footer>
        </div>
      </main>
    </div>
  );
}

export default App;
