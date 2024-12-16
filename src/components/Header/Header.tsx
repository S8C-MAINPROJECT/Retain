import './Header.css'
import closeBtn from '../../assets/closebtn.svg'

const Header = () => {
  return (
    <div>
        <div className='headItems'>
            <img src={closeBtn} alt="Close Button" id='closebtn'/>
            <p>Capitals of Countries</p>
        </div>
    </div>
  )
}

export default Header