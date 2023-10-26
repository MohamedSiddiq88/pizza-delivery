import React, { useContext, useState } from 'react';
import { MenuCtx } from '../Context/AppProvider';
import { NavLink } from 'react-router-dom';

function Navbar() {
  // const { roleObject } = useContext(MenuCtx);
  let role = localStorage.getItem('role');
  let roleName = localStorage.getItem('roleName');
  const [isCollapsed, setIsCollapsed] = useState(true);

  const handleToggle = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
      <span className="navbar-brand">{roleName}</span>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded={!isCollapsed}
        aria-label="Toggle navigation"
        onClick={handleToggle} // Add onClick event handler
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className={`collapse navbar-collapse ${isCollapsed ? '' : 'show'}`} id="navbarNav">
        <ul className="navbar-nav">
          {role === 'admin' && (
            <div className='sm-nave_bar'>
              <li className="nav-item">
                <NavLink className="nav-link" to="/inventory" activeClassName="active">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/order" activeClassName="active">
                  Order
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/login" activeClassName="active" onClick={()=>localStorage.removeItem("token")}>
                  Sign out
                </NavLink>
              </li>
            </div>
          )}
          {role === 'user' && (
            <div className='sm-nave_bar'>
              <li className="nav-item">
                <NavLink className="nav-link" to="/" exact activeClassName="active">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/userorder" activeClassName="active">
                Order
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/login" activeClassName="active" onClick={()=>localStorage.removeItem("token")}>
                  Sign out
                </NavLink>
              </li>
            </div>
          )}
        </ul>
      </div>
      </div>
    </div>
  );
}

export default Navbar;
