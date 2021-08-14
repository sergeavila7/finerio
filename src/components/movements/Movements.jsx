import React, { useEffect, useState, useContext } from 'react';
import clientAxios from '../../config/Axios';
import { AuthContext } from '../../context/AuthContext';
import { Table, Container } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import Spinner from './Spinner';
import Movement from './Movement';

const Movements = (props) => {
  const [movements, setMovements] = useState([]);
  const [auth, setAuth] = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (auth.access_token !== '') {
      const getMovements = async () => {
        try {
          setLoading(true);

          const response = await clientAxios.get(
            `/users/${localStorage.getItem('userid')}/movements`,
            {
              headers: {
                Authorization: `Bearer ${auth.access_token}`,
              },
            }
          );
          setMovements(response.data);
          console.log(response.data);
        } catch (error) {
          if ((error.response.status = 500)) {
            props.history.push('/login');
          }
        }
        setLoading(false);
      };
      getMovements();
    } else {
      props.history.push('/login');
    }
  }, []);

  if (!auth.auth) {
    props.history.push('/login');
  }

  return (
    <Container>
      {loading ? <Spinner /> : null}
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Descripcion</th>
            <th>Categoria</th>
            <th>Monto</th>
          </tr>
        </thead>
        {!loading ? (
          <tbody>
            {movements.data &&
              movements.data.map((movement) => (
                <Movement key={movement._id} movement={movement} />
              ))}
          </tbody>
        ) : null}
      </Table>
    </Container>
  );
};

export default withRouter(Movements);
