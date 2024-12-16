import styles from "./primaryBtn.module.css"

type Props = {
  name: string
  onClick?: () => void
}

function PrimaryBtn(props: Props) {
  return (
    <>
      <button className={styles.btn} onClick={props.onClick}>
        <div>{props.name}</div>
      </button>
    </>
  )
}

export default PrimaryBtn;

