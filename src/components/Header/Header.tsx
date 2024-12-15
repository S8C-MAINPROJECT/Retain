import './Header.css'
import closeBtn from '../../assets/closebtn.svg'
import { useNavigate } from 'react-router-dom'

const Header = () => {
  const navigate = useNavigate();

  return (
    <div>
        <div className='headItems'>
            <img src={closeBtn} alt="Close Button" id='closebtn' onClick={()=>{navigate("/home")}}/>
            <p>Capitals of Countries</p>
        </div>
    </div>
  )
}

export default Header