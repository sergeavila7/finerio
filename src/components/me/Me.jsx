import React, { useState, useEffect, useContext } from 'react';
import clientAxios from '../../config/Axios';
import { AuthContext } from '../../context/AuthContext';
import { withRouter } from 'react-router-dom';

function Me(props) {
  const [me, setMe] = useState([]);
  const [auth, setAuth] = useContext(AuthContext);

  const { email, name } = me;

  useEffect(() => {
    if (auth.access_token !== '') {
      const getMe = async () => {
        try {
          const response = await clientAxios.get('/me', {
            headers: {
              Authorization: `Bearer ${auth.access_token}`,
            },
          });

          setMe(response.data);
          const userid = response.data.id;

          localStorage.setItem('userid', userid);
        } catch (error) {
          // if (error.response.status !== 500) {
          //   props.history.push('/login');
          // }
        }
      };
      getMe();
    } else {
      props.history.push('/login');
    }
  }, []);

  if (!auth.auth) {
    props.history.push('/login');
  }
  return (
    <main>
      <div className='container-data'>
        <h2>Mi cuenta</h2>
        <p>{name}</p>
        <p>{email}</p>
      </div>
    </main>
  );
}

export default withRouter(Me);
