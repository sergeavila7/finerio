import React, { useContext, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Sidebar from './components/layout/Sidebar';
import NavBar from './components/layout/Navbar';

import Login from './components/auth/Login';
import { AuthContext, AuthProvider } from './context/AuthContext';

import Spinner from './components/movements/Spinner';

const ListMovements = lazy(() =>
  import('./components/movements/ListMovements')
);
const Me = lazy(() => import('./components/me/Me'));

function App() {
  const [auth, setAuth] = useContext(AuthContext);

  return (
    <Router>
      <Suspense fallback={<Spinner />}>
        <AuthProvider value={[auth, setAuth]}>
          <div className='container-app'>
            <Sidebar />
            <div className='section-principal'>
              <NavBar />
              <Switch>
                <Route exact path='/movements' component={ListMovements} />
                <Route exact path='/' component={Me} />
                <Route exact path='/login' component={Login} />
                <Route component={Login} />
              </Switch>
            </div>
          </div>
        </AuthProvider>
      </Suspense>
    </Router>
  );
}

export default App;
