import React, {useState} from 'react';
import Nav from './Componetes/Nav';
import Signup from './Vistas/Signup';
import Login from './Vistas/Login';
import Axios from 'axios';
import {setToken,deleteToken} from './Helpers/auth-helpers';

export default function App() {
 const [usuario,setUsuario] = useState(null); // no sabemos si hay un usuario autenticado

 async function login(email,password){
   const {data} = await Axios.post('/api/usuarios/login',{
     email,
     password
   }); //data.usuario, data.token
   setUsuario(data.usuario);
   setToken(data.token)
 }

 async function signup(usuario){
  const {data} = await Axios.post('/api/usuarios/signup', usuario); //data.usuario, data.token
  setUsuario(data.usuario);
  setToken(data.token)
}

function logout(){
  setUsuario(null);
  deleteToken();
}
  return (
    <div className="ContenedorTemporal">
      <Nav/>
      <Signup signup={signup}/>  
      {/* <Login login={login}/> */}
  <div> {JSON.stringify(usuario)}</div>
    </div>
  );
}
