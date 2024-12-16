import './Header.css'
import closeBtn from '../../assets/closebtn.svg'
import { Navigate, useNavigate } from 'react-router-dom'

const Header = () => {
  const Navigate = useNavigate();
  return (
    <div>
        <div className='headItems'>
            <img src={closeBtn} alt="Close Button" id='closebtn' onClick={()=>{Navigate("/home")}}/>
            <p>Capitals of Countries</p>
        </div>
    </div>
  )
}

export default Header