import Icon from './Icon';

function ResourcePage({ title, description, searchLabel, query, onQueryChange, children }) {
  return (
    <section className="panel full-panel">
      <div className="panel-heading">
        <div><h2>{title}</h2><p>{description}</p></div>
        <label className="search-box">
          <Icon name="search" size={17} />
          <input value={query} onChange={(event) => onQueryChange(event.target.value)} placeholder={searchLabel} aria-label={searchLabel} />
        </label>
      </div>
      {children}
    </section>
  );
}

export default ResourcePage;
