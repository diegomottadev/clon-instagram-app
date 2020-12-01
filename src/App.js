import React from 'react';
import Nav from './Componetes/Nav';
import Signup from './Vistas/Signup';
import Login from './Vistas/Login';

export default function App() {

  return (
    <div className="ContenedorTemporal">
      <Nav/>
      {/* <Signup/> */}
      <Login/>
    </div>
  );
}
