import OrdersRecords from './OrdersRecords';
import ResourcePage from './ResourcePage';

function OrdersPage({ store, query, onQueryChange }) {
  return (
    <ResourcePage
      title="All orders"
      description={store.ordersLoading ? 'Loading orders…' : store.orderError ? 'Unable to retrieve orders' : `${store.orders.length} orders recorded`}
      searchLabel="Search orders"
      query={query}
      onQueryChange={onQueryChange}
    >
      <OrdersRecords store={store} query={query} />
    </ResourcePage>
  );
}

export default OrdersPage;
