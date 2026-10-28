import Icon from './Icon';
import CategoriesRecords from './CategoriesRecords';
import OrdersRecords from './OrdersRecords';
import { formatDate } from '../utils/formatDate';

function StoreOverview({ onNavigate, ...store }) {
  const {
    categories, orders, categoriesLoading, ordersLoading,
    categoryError, orderError, mostRecentOrder,
  } = store;
  return (
    <>
      <section className="stats-grid" aria-label="Store metrics">
        <article className="stat-card">
          <div className="stat-top"><span className="stat-label">Total categories</span><span className="stat-icon lavender"><Icon name="tag" size={19} /></span></div>
          <div className="stat-value">{categoriesLoading ? '—' : categoryError ? '!' : categories.length}</div>
          <div className="stat-foot">{categoryError ? 'Could not load categories' : 'Available in your catalog'}</div>
        </article>
        <article className="stat-card">
          <div className="stat-top"><span className="stat-label">Total orders</span><span className="stat-icon mint"><Icon name="cart" size={19} /></span></div>
          <div className="stat-value">{ordersLoading ? '—' : orderError ? '!' : orders.length}</div>
          <div className="stat-foot">{orderError ? 'Could not load orders' : 'All recorded orders'}</div>
        </article>
        <article className="stat-card">
          <div className="stat-top"><span className="stat-label">Latest order</span><span className="stat-icon peach"><Icon name="calendar" size={19} /></span></div>
          <div className="stat-value stat-date">{ordersLoading ? '—' : orderError ? '!' : formatDate(mostRecentOrder?.date || mostRecentOrder?.created_at)}</div>
          <div className="stat-foot">{orders.length ? `Order #${mostRecentOrder?.id ?? '—'}` : 'No order activity yet'}</div>
        </article>
      </section>

      <section className="insight-banner">
        <div className="insight-mark"><Icon name="box" size={22} /></div>
        <div className="insight-copy"><strong>Your store at a glance</strong><span>Live data is shown as it becomes available from your Laravel API.</span></div>
        <button type="button" className="banner-link" onClick={() => onNavigate('categories')}>View catalog <Icon name="arrow" size={16} /></button>
        <div className="banner-decoration" aria-hidden="true"><span /><span /><span /><span /><span /></div>
      </section>

      <section className="panel overview-panel">
        <div className="panel-heading">
          <div><h2>Categories</h2><p>Your catalog categories from the backend</p></div>
          <button className="panel-link" type="button" onClick={() => onNavigate('categories')}>View all <Icon name="arrow" size={15} /></button>
        </div>
        <CategoriesRecords store={store} limit={5} />
      </section>

      <section className="panel overview-panel">
        <div className="panel-heading">
          <div><h2>Recent orders</h2><p>Latest order records from your backend</p></div>
          <button className="panel-link" type="button" onClick={() => onNavigate('orders')}>View all <Icon name="arrow" size={15} /></button>
        </div>
        <OrdersRecords store={store} limit={5} />
      </section>
    </>
  );
}

export default StoreOverview;
