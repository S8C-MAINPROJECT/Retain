import styles from "./secondaryBtn.module.css"

type Props = {
  name: string
  onClick?: () => void
}

function SecondaryBtn(props: Props) {
  return (
    <>
      <button className={styles.btn} onClick={props.onClick}>{props.name}</button>
    </>
  )
}

export default SecondaryBtn

