import CategoriesRecords from './CategoriesRecords';
import ResourcePage from './ResourcePage';

function CategoriesPage({ store, query, onQueryChange }) {
  return (
    <ResourcePage
      title="All categories"
      description={store.categoriesLoading ? 'Loading categories…' : store.categoryError ? 'Unable to retrieve categories' : `${store.categories.length} categories in your catalog`}
      searchLabel="Search categories"
      query={query}
      onQueryChange={onQueryChange}
    >
      <CategoriesRecords store={store} query={query} />
    </ResourcePage>
  );
}

export default CategoriesPage;
