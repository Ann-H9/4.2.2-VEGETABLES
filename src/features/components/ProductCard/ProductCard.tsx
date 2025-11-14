import { AddButton } from "../AddButton";
import Count from "../Count/Count";
import styles from './ProductCard.module.scss';
import { Product } from "@/shared/api/ProductService";
import { useAppDispatch, useAppSelector } from '@/store/appHooks';
import { addItem } from '@/store/cartSlice';
import { selectCardQuantity, setProductQuantity, resetProductQuantity } from '@/store/uiSlice';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const dispatch = useAppDispatch();
  const quantity = useAppSelector(selectCardQuantity(product.id));
  const [productName, weight] = product.name.split(" - ");

  const handleIncrease = () => {
    dispatch(setProductQuantity({ id: product.id, quantity: quantity + 1 }));
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      dispatch(setProductQuantity({ id: product.id, quantity: quantity - 1 }));
    }
  };

  const handleAddToCart = () => {
    dispatch(addItem({ product, quantity }));
    dispatch(resetProductQuantity({ id: product.id }));
  };

  return (
    <div className={styles.card}>
      <img
        className={styles.img}
        src={product.image}
        alt={productName}
        onError={(e) => {
          (e.target as HTMLImageElement).style.display = 'none';
        }}
      />
      <div className={styles.flex}>
        <span className={styles.productName}>
          {productName}
          {weight && <span className={styles.weight}> {weight.toLowerCase()}</span>}
        </span>
        <Count 
          value={quantity}
          onIncrease={handleIncrease}
          onDecrease={handleDecrease}
        />
      </div>
      <div className={styles.flex2}>
        <span>${product.price}</span>
        <AddButton onClick={handleAddToCart} quantity={quantity} />
      </div>
    </div>
  );
};

export default ProductCard;