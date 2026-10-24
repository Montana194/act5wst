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
        <button className="icon-button notification-button" type="button" aria-label="Notifications"><Icon name="bell" size={19} /><i /></button>
        <div className="top-avatar">AD</div>
      </div>
    </header>
  );
}

export default Topbar;
