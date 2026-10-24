import Icon from './Icon';

const navigation = [
  { id: 'overview', label: 'Overview', icon: 'grid' },
  { id: 'categories', label: 'Categories', icon: 'tag' },
  { id: 'orders', label: 'Orders', icon: 'cart' },
];

function Sidebar({ activeView, onNavigate, categories, categoriesLoading, categoryError, orderError }) {
  const apiDisconnected = categoryError && orderError;

  return (
    <aside className="sidebar">
      <a className="brand" href="#overview" onClick={() => onNavigate('overview')}>
        <span className="brand-mark"><Icon name="box" size={21} /></span>
        <span className="brand-name">commerce<span>desk</span></span>
      </a>

      <div className="workspace-label">WORKSPACE</div>
      <nav className="side-nav" aria-label="Main navigation">
        {navigation.map((item) => (
          <button
            key={item.id}
            className={`nav-item ${activeView === item.id ? 'active' : ''}`}
            type="button"
            onClick={() => onNavigate(item.id)}
          >
            <Icon name={item.icon} size={19} />
            <span>{item.label}</span>
            {item.id === 'categories' && !categoriesLoading && !categoryError && <span className="nav-count">{categories.length}</span>}
          </button>
        ))}
      </nav>

      <div className="sidebar-bottom">
        <div className="api-status"><span className={apiDisconnected ? 'status-dot offline' : 'status-dot'} /><span>{apiDisconnected ? 'API disconnected' : 'API connection'}</span></div>
        <div className="profile">
          <div className="avatar">AD</div>
          <div className="profile-copy"><strong>Admin workspace</strong><span>Store management</span></div>
          <span className="profile-menu">···</span>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
