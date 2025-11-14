import styles from './Logo.module.scss'

const Logo = () => {
    return (
<img
  className={styles['img']}
  src={`${import.meta.env.BASE_URL}logo.svg`} 
  alt='Магазин овощей'
  width={209}
  height={33}
/>
    )
}


export default Logo
