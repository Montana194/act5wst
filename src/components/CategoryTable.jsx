import Icon from './Icon';
import RecordStates from './RecordStates';

function CategoryTable({ categories, query }) {
  const filtered = categories.filter((category) => {
    const searchText = `${category.name || ''} ${category.description || ''}`.toLowerCase();
    return searchText.includes(query.toLowerCase());
  });

  if (filtered.length === 0) {
    return <RecordStates.Empty title="No categories found" detail={query ? 'Try a different search.' : 'Categories from your backend will appear here.'} />;
  }

  return (
    <div className="table-wrap">
      <table>
        <thead><tr><th>Category</th><th>Description</th><th>ID</th><th /></tr></thead>
        <tbody>
          {filtered.map((category) => (
            <tr key={category.id}>
              <td>
                <span className="category-cell">
                  <span className="category-mark">{String(category.name || '?').slice(0, 1).toUpperCase()}</span>
                  <span className="category-name">{category.name || 'Unnamed category'}</span>
                </span>
              </td>
              <td className="muted-cell">{category.description || 'No description'}</td>
              <td className="id-cell">#{category.id ?? '—'}</td>
              <td><button className="row-link" type="button" aria-label={`View ${category.name || 'category'}`}><Icon name="chevron" size={17} /></button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CategoryTable;
