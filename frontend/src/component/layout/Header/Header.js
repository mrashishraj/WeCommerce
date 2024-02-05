import React,{ useState } from "react";
import { LOGO } from "../../../utils/constants"
import { Link } from "react-router-dom"
import useOnlineStatus from "../../../utils/onlineStatus"
import { useSelector,useDispatch } from "react-redux"
import { logout } from "../../../actions/userAction";




const Header = ({history,location}) => {
  const dispatch = useDispatch()
  const {user} = useSelector((state) => state.user);
  const {cartItems} = useSelector((state) => state.cart);

  console.log(cartItems);
  // console.log(history);
  // const redirectToLogin = location.search ? location.search.split("=")[1] : "/login";
  // const redirectToLogout = location.search ? location.search.split("=")[1] : "/products";

console.log(location);
  const handleLogout = (user) => {
    // console.log(user.target.name);

    if(user){
      dispatch(logout())
      alert.success("Logout Successfully");
      history.push(["/logout"]);
    }
    
  }
  
  return(
    <div className="flex justify-between shadow-xlg">
           <Link to="/"> 
              <div className="logoBox mt-3 ml-4">
                <img className="w-32" src={LOGO} alt="logo" />
              </div>
            </Link>
            <div className={`flex items-center ${user?"mr-16":"mr-0"}`}>
                <ul className="flex p-4 mx-6">
                    <li className="p-2 mx-3 shadow-md rounded-md bg-blue-100">Online Status : {useOnlineStatus?"✅":"⛔️"} </li>
                    <li className="p-2 mx-3 shadow-md rounded-md bg-blue-100"><Link to="/"> Home</Link></li>
                    <li className="p-2 mx-3 shadow-md rounded-md bg-blue-100"><Link to="/products"> Products</Link></li>
                    <li className="p-2 mx-3 shadow-md rounded-md bg-blue-100"><Link to="/about"> About</Link></li>
                    <li className="p-2 mx-3 shadow-md rounded-md bg-blue-100"><Link to="/contact">Contect Us</Link> </li>
                    <li className="p-2 mx-3 shadow-md rounded-md bg-blue-100"><Link to="/cart"> Cart ({cartItems.length})</Link></li>
                    <li className="p-2 mx-3 shadow-md rounded-md bg-blue-100">{user?(<button name="Logout" onClick={handleLogout}>Logout</button>):(<Link to="/login"><button>Login</button></Link>)}</li>
                </ul>
            </div>
        </div>

  );
};

export default Header;
