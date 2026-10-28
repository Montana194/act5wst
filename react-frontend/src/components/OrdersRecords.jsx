import OrdersTable from './OrdersTable';
import RecordStates from './RecordStates';

function OrdersRecords({ store, query = '', limit }) {
  if (store.ordersLoading) return <RecordStates.Loading />;
  if (store.orderError) return <RecordStates.Error message={store.orderError} onRetry={store.retryOrders} />;
  return <OrdersTable orders={store.orders} query={query} limit={limit} />;
}

export default OrdersRecords;
