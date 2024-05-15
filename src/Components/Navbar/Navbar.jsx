import React from 'react'
import menu_icon from '../../assets/menu.png'
import logo from '../../assets/logo.jpg'
import search_icon from '../../assets/search.png'
import upload_icon from '../../assets/upload.png'
import more_icon from '../../assets/more.png'
import notification_icon from '../../assets/notification.png'
import profile_icon from '../../assets/gopi.jpg'
import {Link} from 'react-router-dom'
import './Navbar.css';
const Navbar = ({setSidebar}) => {
  return (
    <nav className = "flex-div">
        <div className = "nav-left flex-div">
        <img className ="menu-icon" onClick={()=>{setSidebar(prev=>prev===false ? true: false)}} src={menu_icon} alt=""/>
        <Link to="/"><img className ="logo" src={logo} alt=""/><span style={{color:"#5a5a5a"}}>GOKSI</span></Link>
        </div>
        <div className="nav-middle flex-div">
            <div className = "search-box flex-div">
                 <input type = "text" placeholder="search"/>
                 <img src={search_icon} alt=""/>
            </div>
        </div>
        <div className="nav-right flex-div">
        <img src={upload_icon} alt=""/>
        <img src={more_icon} alt=""/>
        <img src={notification_icon} alt=""/>
        <img src={profile_icon} className = "user-icon"alt=""/>
        </div>
    </nav>
  )
}

export default Navbar