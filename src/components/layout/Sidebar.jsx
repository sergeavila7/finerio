import React, { useContext } from 'react';
import { Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import {GiPiggyBank} from 'react-icons/gi'
import {ImUser} from 'react-icons/im'
const Sidebar = () => {
  const [auth, setAuth] = useContext(AuthContext);

  if (!auth.auth) return null;

  return (
    <>
      <aside className=' d-none d-lg-flex'>
        <Nav className='flex-column justify-content-center align-items-center p-5'>
          <NavLink className='py-3' to='/movements'>
          <i className="icon"><GiPiggyBank/></i>{' '}
            Movimientos
          </NavLink>
          <NavLink className='py-3' to='/'>
          <i className="icon"><ImUser/></i> {' '}
            Mi Cuenta
          </NavLink>
        </Nav>
      </aside>
    </>
  );
};

export default Sidebar;
