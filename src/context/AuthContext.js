import React, { useState } from 'react';

const AuthContext = React.createContext([{}, () => {}]);

const AuthProvider = (props) => {
  const [auth, setAuth] = useState({
    access_token: '',

    auth: false,
  });
  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {props.children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
