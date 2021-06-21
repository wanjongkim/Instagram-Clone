import {Link, useHistory} from 'react-router-dom'
import React, {useContext} from 'react';
import {userContext} from '../App'

const NavBar = () => {
  const {state, dispatch}  = useContext(userContext);
  const history = useHistory()
  const renderList = () => {
    if(state) {
      return [
        <li><Link to="/profile">Profile</Link></li>,
        <li><Link to="/create">Create Post</Link></li>,
        <li><Link to="/myfollowerspost">My Following Posts</Link></li>,
        <li>
          <button className="btn #e53935 red darken-1"
            onClick={()=> {
              localStorage.clear()
              dispatch({type:"CLEAR"})
              history.push('/signin');
            }}>
              Log Out
          </button>
        </li>
      ]
    }
    else {
      return [
        <li><Link to="/signin">Login</Link></li>,
        <li><Link to="/signup">Signup</Link></li>,
      ]
    }
  }
  return (
    <nav>
        <div className="nav-wrapper white" >
        <Link to={state ? "/": "/signin"} className="brand-logo left">Instagram</Link>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
            {renderList()}
        </ul>
        </div>
    </nav>
  );
}

export default NavBar;