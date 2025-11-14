import { useEffect } from 'react';
import styles from './ProductList.module.scss';
import ProductCard from '../ProductCard/ProductCard';
import { useAppDispatch, useAppSelector } from '@/store/appHooks';
import { fetchProducts } from '@/store/productsSlice';

const ProductsList = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector((s) => s.products.items);
  const loading = useAppSelector((s) => s.products.loading);
  const error = useAppSelector((s) => s.products.error);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) return <div className={styles.loading}>Загрузка...</div>;
  if (error) return <div className={styles.error}>Ошибка: {error}</div>;

  return (
    <div className={styles.productsGrid}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductsList;