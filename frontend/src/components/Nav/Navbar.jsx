import React from "react";
import "./Navbar.css";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import { useState } from "react";
import { Link,useLocation} from "react-router-dom";
import Logo from "../../assets/Logo.png";
const Navbar=()=>{
    const [open,setOpen]=useState(false);
    const location=useLocation();

    const isHome=location.pathname==="/"
    function toggle(){
        setOpen(!open);

    }
    return(
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
                <li><Link to="/About">About</Link></li>
                <li><Link to="/Team">Team</Link> </li>
                <li><Link to="/Events">Events</Link> </li>
                <li><Link to="/Admin">Login</Link> </li>  
            </ul>
        </div>

    </div>
    )

}

export default Navbar;