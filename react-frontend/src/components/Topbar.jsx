import Icon from './Icon';

const pageLabels = {
  overview: 'Overview',
  categories: 'Categories',
  orders: 'Orders',
};

function Topbar({ activeView }) {
  const pageTitle = pageLabels[activeView] || 'Overview';

  return (
    <header className="topbar">
      <div className="breadcrumbs"><span>Workspace</span><Icon name="chevron" size={15} /><strong>{pageTitle}</strong></div>
      <div className="topbar-actions">
        <span className="today-label"><Icon name="calendar" size={16} /> {new Intl.DateTimeFormat(undefined, { weekday: 'short', month: 'short', day: 'numeric' }).format(new Date())}</span>
        <div className="top-avatar">AD</div>
      </div>
    </header>
  );
}

export default Topbar;
