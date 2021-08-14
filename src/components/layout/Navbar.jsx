import React, { useContext } from 'react';
import { Nav, Navbar, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { BiLogOut } from 'react-icons/bi';
import { withRouter } from 'react-router-dom';

const NavBar = (props) => {
  const [auth, setAuth] = useContext(AuthContext);
  if (!auth.auth) return null;
  const logout = () => {
    setAuth({
      access_token: '',
      auth: false,
    });
    localStorage.setItem('access_token', '');
    localStorage.setItem('username', '');
    localStorage.setItem('userid', '');

    // Redirect
    props.history.push('/login');
  };
  return (
    <Navbar expand='lg' className='app-header'>
      <p className='name-user'>
        Hola<span> {localStorage.getItem('username')}</span>
      </p>
      <Navbar.Toggle aria-controls='basic-navbar-nav d-md-none d-flex' />
      <Navbar.Collapse id='basic-navbar-nav '>
        <Nav className='pt-2 d-flex d-lg-none'>
          <NavLink className='nav-principal' to='/movements'>
            Movimientos
          </NavLink>
          <NavLink className='nav-principal' to='/'>
            Mi Cuenta
          </NavLink>

          <Nav.Link className='nav-principal d-lg-flex' onClick={logout}>
            Cerrar Sesión
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
      <Button className='btn btn-red d-none d-lg-flex' onClick={logout}>
        <i>
          <BiLogOut />
        </i>
        Cerrar Sesión
      </Button>
    </Navbar>
  );
};

export default withRouter(NavBar);
