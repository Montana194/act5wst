import Icon from './Icon';
import RecordStates from './RecordStates';
import { formatDate } from '../utils/formatDate';

function OrdersTable({ orders, query }) {
  const filtered = orders.filter((order) => {
    const searchText = `${order.id || ''} ${order.user?.name || ''} ${order.user_id || ''} ${order.date || ''}`.toLowerCase();
    return searchText.includes(query.toLowerCase());
  });

  if (filtered.length === 0) {
    return <RecordStates.Empty title="No orders found" detail={query ? 'Try a different search.' : 'Orders from your backend will appear here.'} />;
  }

  return (
    <div className="table-wrap">
      <table>
        <thead><tr><th>Order</th><th>Customer</th><th>Date</th><th /></tr></thead>
        <tbody>
          {filtered.map((order) => (
            <tr key={order.id}>
              <td className="order-id">#{order.id ?? '—'}</td>
              <td>{order.user?.name || (order.user_id ? `Customer #${order.user_id}` : '—')}</td>
              <td className="muted-cell">{formatDate(order.date || order.created_at)}</td>
              <td><button className="row-link" type="button" aria-label={`View order ${order.id ?? ''}`}><Icon name="chevron" size={17} /></button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default OrdersTable;
