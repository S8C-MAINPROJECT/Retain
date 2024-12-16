import styles from "./primaryBtn.module.css"
import Arrow from "./Assets/Arrowflip.svg"

type Props = {
  name: string
  onClick?: () => void
}

function BackBtn(props: Props) {
  return (
    <>
    <button className={styles.btn} onClick={props.onClick}>
        <div><img src={Arrow} /></div>
        <div>{props.name}</div>
      </button>
    </>
  )
}

export default BackBtn;
