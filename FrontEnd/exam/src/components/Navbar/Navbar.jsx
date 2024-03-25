import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom'
import { logout } from '../../redux/slices/auth';
import { getUserInfo } from '../../utils/helpers';

const Navbar = () => {
  const dispatch = useDispatch();
  const [showAdminBoard, setShowAdminBoard] = useState(false);

  const userStogate = getUserInfo();
  const logOut = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);
  
  useEffect(() => {
    if ( userStogate.role ==="ADMIN") {
      setShowAdminBoard(true);
      
    } else {
      setShowAdminBoard(false);
    }
  }, [userStogate, logOut]);
  // if (!userStogate) {
  //   return <Navigate to="/login" />;
  // }
  return (
    <>
      <nav className={`navbar navbar-expand navbar-dark bg-dark }`}>
        <div className="navbar-nav mr-auto">
          <li className="nav-item me-3">
            <NavLink to={"/admin/home"} className="nav-link">
              Home
            </NavLink>
          </li>

          {showAdminBoard && (
            <li className="nav-item">
              <NavLink to={"/admin/users"} className="nav-link">
                User Board
              </NavLink>
            </li>
          )}
        </div>

        {userStogate ? (
          <div className="navbar-nav ml-auto">
            <li className="nav-item me-auto ">
              <NavLink to={"/admin/products"} className="nav-link">
                Product Board
              </NavLink>
            </li>
            <li className="nav-item">
              <span className="nav-link">Xin chào : {userStogate.username}</span>
            </li>
            <li className="nav-item">
              <a href="/login" className="nav-link" onClick={logOut}>
                LogOut
              </a>
            </li>
          </div>
        ) : (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <NavLink to={"/login"} className="nav-link">
                Login
              </NavLink>
            </li>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;