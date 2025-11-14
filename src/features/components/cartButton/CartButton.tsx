import styles from "./CartButton.module.scss";
import Modal from 'react-modal';
import Count from '../Count/Count';
import { useAppDispatch, useAppSelector } from '@/store/appHooks';
import { selectCartItems, selectCartQuantity, selectCartTotal, updateQuantity } from '@/store/cartSlice';
import { openCartModal, closeCartModal, selectCartModalOpen } from '@/store/uiSlice';

const CartButton = () => {
  const dispatch = useAppDispatch();
  const quantity = useAppSelector(selectCartQuantity);
  const cartItems = useAppSelector(selectCartItems);
  const total = useAppSelector(selectCartTotal);
  const modalIsOpen = useAppSelector(selectCartModalOpen);

  return (
    <>
      <div>
        <button 
          onClick={() => dispatch(openCartModal())}
          className={styles.cartButton}
          aria-label="Корзина"
        >
          {quantity > 0 && <span className={styles.cartButton__quantity}>{quantity}</span>}
        </button>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => dispatch(closeCartModal())}
          className={`${styles.modal} ${cartItems.length === 0 ? styles.cartEmpty : ''}`}
          overlayClassName={styles.overlay}
        >
          <div className={`${styles.popup}`}>
            {cartItems.length === 0 ? (
              <p className={styles.cartEmpty__text}>You cart is empty!</p>
            ) : (
              <>
                <div className={styles.cartItems}>
                  {cartItems.map(item => (
                    <div key={item.id} className={styles.cartItem}>
                      <img
                        src={item.image}
                        alt={item.name}
                        className={styles.cartItemImage}
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                      <div className={styles.cartItemInfo}>
                        <h4 className={styles.cartItemTitle}>{item.name.split(" - ")[0]}</h4>
                        <p className={styles.cartItemPrice}>${item.price} × {item.quantity} = {(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                      <Count
                        value={item.quantity}
                        onIncrease={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}
                        onDecrease={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))}
                      />
                    </div>
                  ))}
                </div>
                <div className={styles.cartTotal}>
                  <h3>Total: ${total.toFixed(2)}</h3>
                </div>
              </>
            )}
          </div>
        </Modal>
      </div>
    </>
  );
};

export default CartButton;