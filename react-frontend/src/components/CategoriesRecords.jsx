import CategoryTable from './CategoryTable';
import RecordStates from './RecordStates';

function CategoriesRecords({ store, query = '', limit }) {
  if (store.categoriesLoading) return <RecordStates.Loading />;
  if (store.categoryError) return <RecordStates.Error message={store.categoryError} onRetry={store.retryCategories} />;
  return <CategoryTable categories={store.categories} query={query} limit={limit} />;
}

export default CategoriesRecords;
