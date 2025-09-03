import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from '../../assets/Logo.png';
import '../Nav/Navbar.css';
import { useDispatch} from "react-redux";
import { logoutAction } from "../../redux/slice/authSlice";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";

const PrivateNav = () => {
    const navigate = useNavigate();
    const dispatch=useDispatch();
    const [open,setOpen]=useState(false);
    const location=useLocation();

    const isHome=location.pathname==="/"
    function toggle(){
        setOpen(!open);

    }
    // Handle logout function
    const handleLogout = () => {
        localStorage.removeItem("userInfo");
        dispatch(logoutAction());  
        navigate("/admin");
    };

    return (
        <div className={`nav ${isHome?"home-nav":"def-nav"}`}>
        <div className="logo">
            <div className="club">
                <img src={Logo} alt="" />
                <h3>Math Club</h3>
            </div>
            {/* <img src={Logo} alt="" />
            <h3>Math Club</h3> */}
            <div className="menu">
                {open?<IoMdClose onClick={toggle}/>:<GiHamburgerMenu onClick={toggle}/>}
        </div>
        </div>
        <div className={`items ${isHome?"home-items":"def-items"} ${open? "open":""} `}>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/edit/add/eve">Add Event</Link></li>
                <li><Link to="/edit/botpapi/list/events">Events</Link> </li>
                <li><button onClick={handleLogout} className={`${isHome?"home-button":"def-button"}`}>Logout</button></li>  
            </ul>
        </div>

    </div>
    )

};
export default PrivateNav;
