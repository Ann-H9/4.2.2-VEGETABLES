import Logo from '../Logo/Logo';
import CartButton from '../cartButton/CartButton';
import styles from './Header.module.scss';



const Header = () => {
  return (
    <header className={styles.header}>
      <Logo />
      <CartButton/>
    </header>
  );
};

export default Header;