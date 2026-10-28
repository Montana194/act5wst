import { useCallback, useEffect, useMemo, useState } from 'react';
import { fetchCollection } from '../utils/storeApi';

function useStoreData() {
  const [categories, setCategories] = useState([]);
  const [orders, setOrders] = useState([]);
  const [categoryError, setCategoryError] = useState('');
  const [orderError, setOrderError] = useState('');
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const connectionStatus = categoriesLoading || ordersLoading
    ? 'Connecting to API…'
    : categoryError && orderError
      ? 'API disconnected'
      : categoryError || orderError
        ? 'Some data unavailable'
        : 'Connected to API';

  const loadData = useCallback(async () => {
    setCategoriesLoading(true);
    setOrdersLoading(true);
    setCategoryError('');
    setOrderError('');

    const [categoryResult, orderResult] = await Promise.allSettled([
      fetchCollection('categories'),
      fetchCollection('orders'),
    ]);

    if (categoryResult.status === 'fulfilled') setCategories(categoryResult.value);
    else setCategoryError(categoryResult.reason.message || 'Unable to connect to the categories endpoint.');

    if (orderResult.status === 'fulfilled') setOrders(orderResult.value);
    else setOrderError(orderResult.reason.message || 'Unable to connect to the orders endpoint.');

    setCategoriesLoading(false);
    setOrdersLoading(false);
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const mostRecentOrder = useMemo(() => {
    if (!orders.length) return null;
    return orders.reduce((latest, order) => {
      const orderDate = new Date(order.date || order.created_at || 0);
      const latestDate = new Date(latest.date || latest.created_at || 0);
      return orderDate > latestDate ? order : latest;
    });
  }, [orders]);

  const retryCategories = useCallback(async () => {
    setCategoriesLoading(true);
    setCategoryError('');
    try {
      setCategories(await fetchCollection('categories'));
    } catch (error) {
      setCategoryError(error.message || 'Unable to connect to the categories endpoint.');
    } finally {
      setCategoriesLoading(false);
    }
  }, []);

  const retryOrders = useCallback(async () => {
    setOrdersLoading(true);
    setOrderError('');
    try {
      setOrders(await fetchCollection('orders'));
    } catch (error) {
      setOrderError(error.message || 'Unable to connect to the orders endpoint.');
    } finally {
      setOrdersLoading(false);
    }
  }, []);

  const refresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  return {
    categories, orders, categoryError, orderError,
    categoriesLoading, ordersLoading, refreshing, connectionStatus,
    mostRecentOrder, retryCategories, retryOrders, refresh,
  };
}

export default useStoreData;
