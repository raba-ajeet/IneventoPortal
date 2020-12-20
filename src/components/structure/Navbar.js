import React, { Fragment } from 'react'
import {Link,withRouter }  from "react-router-dom";
import { isAdmin, isAuthenticated, signout } from '../auth/helper/Index';


const currentTab = (history, path) => {
    if (history.location.pathname === path) {
      return { color: "#2ecc72" };
    } else {
      return { color: "#FFFFFF" };
    }
  };

const Navbar = ({history}) => {
    return (
       <div className="nav nav-tabs bg-dark">
            <li className="nav-item">
                <Link to="/" style={currentTab(history,"/")}  className="nav-link" >
                    Home
                </Link>

            </li>

            {!isAdmin() && <li className="nav-item">
                <Link to="/createevent" style={currentTab(history,"/createevent")}  className="nav-link" >
                    Create A Event
                </Link>
            </li>
            }
            {!isAuthenticated() && <Fragment>
                <li className="nav-item">
                <Link to="/signin" style={currentTab(history,"/signin")} className="nav-link" >
                    SignIn
                </Link>
            </li>
            <li className="nav-item">
                <Link to="/signup"  style={currentTab(history,"/signup")} className="nav-link" >
                    SignUp
                </Link>
            </li>
            </Fragment>
            }
            { isAdmin() && 
                <Fragment>
                <li className="nav-item">
                    <Link to="/createbanner"  style={currentTab(history,"/createbanner")} className="nav-link" >
                        Create Banner
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/banners"  style={currentTab(history,"/banners")} className="nav-link" >
                        All Banners
                    </Link>
                </li>                
                <li className="nav-item">
                    <Link to="/events"  style={currentTab(history,"/events")} className="nav-link" >
                        All Events
                    </Link>
                </li>                
                </Fragment>
            
            }
            {isAuthenticated() && 
                <li className="nav-item">
                <span
                    className="nav-link text-warning"
                    onClick={() => {
                        signout(()=>{
                            history.push("/")
                        })
                    }}
                >
                    
                    SignOut
                </span>
           
                </li>
            }
            
           
       </div>
    )
}

export default withRouter(Navbar);
