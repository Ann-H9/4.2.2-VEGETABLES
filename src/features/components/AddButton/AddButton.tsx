import styles from './AddButton.module.scss'

interface AddButtonProps {
  onClick?: () => void; 
  disabled?: boolean; 
  quantity?: number;
}

const AddButton = ({ onClick, disabled = false }: AddButtonProps) => {

 
  return (
    <button 
      className={styles.addButton}
      onClick={onClick}
      disabled={disabled}
      aria-label={"Добавить в корзину"}
    >
      
    </button>
  )
}

export default AddButton