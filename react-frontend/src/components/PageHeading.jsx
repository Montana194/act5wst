import Icon from './Icon';

const pageLabels = {
  overview: 'Overview',
  categories: 'Categories',
  orders: 'Orders',
};

function PageHeading({ activeView, refreshing, onRefresh }) {
  const pageTitle = pageLabels[activeView] || 'Overview';

  return (
    <section className="page-heading">
      <div>
        <p className="eyebrow">STORE MANAGEMENT</p>
        <h1>{activeView === 'overview' ? 'Store overview' : pageTitle}</h1>
        <p className="heading-subtitle">{activeView === 'overview' ? 'Here’s what’s happening with your store today.' : `Manage and review your store ${activeView}.`}</p>
      </div>
      <button className={`secondary-button ${refreshing ? 'is-refreshing' : ''}`} type="button" onClick={onRefresh} disabled={refreshing}>
        <Icon name="refresh" size={17} /> {refreshing ? 'Refreshing…' : 'Refresh data'}
      </button>
    </section>
  );
}

export default PageHeading;
