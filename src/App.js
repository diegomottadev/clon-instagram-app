import React, { useState, useEffect } from 'react';
import Nav from './Componetes/Nav';
import Signup from './Vistas/Signup';
import Login from './Vistas/Login';
import Axios from 'axios';
import { setToken, deleteToken, initAxiosInterceptors, getToken } from './Helpers/auth-helpers';
import Loading from './Componetes/Loading';
import Main from './Componetes/Main';
import Error from './Componetes/Error';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Upload from './Componetes/Upload';
import Feed from "./Vistas/Feed";
import PostVista from './Vistas/Post';
import Explore from './Vistas/Explore';
initAxiosInterceptors() // lo usa en el useEffect para preguntar si ese token lo tiene el usuario

export default function App() {
  const [usuario, setUsuario] = useState(null); // no sabemos si hay un usuario autenticado
  const [cargandoUsuario, setCargandoUsuario] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function cargandoUsuario() {


      if (!getToken()) {
        setCargandoUsuario(false);
        return;
      }
      try {
        const { data: usuario } = await Axios.get('/api/usuarios/whoami');
        setUsuario(usuario);
        setCargandoUsuario(false)
      } catch (error) {
        console.log(error);
      }
    }

    cargandoUsuario();
  }, [])


  async function login(email, password) {
    const { data } = await Axios.post('/api/usuarios/login', {
      email,
      password
    }); //data.usuario, data.token
    setUsuario(data.usuario);
    setToken(data.token)
  }

  async function signup(usuario) {
    const { data } = await Axios.post('/api/usuarios/signup', usuario); //data.usuario, data.token
    setUsuario(data.usuario);
    setToken(data.token)
  }

  function logout() {
    setUsuario(null);
    deleteToken();
  }

  function mostrarError(mensaje){
    //alert();
    setError(mensaje);
  }

  function escoderError(){
    setError(null);
  }

  if(cargandoUsuario){
    return(
      <div>
        <Main>
          <Loading/>
        </Main>
      </div>
    );

  } 

  return (
    <Router>
      <Nav usuario={usuario}/>
      <Error mensaje={error} escoderError={escoderError}/>
      {usuario ? 
        (<LoginRoute mostrarError={mostrarError} usuario={usuario}/>): 
        (<LogoutRoute login={login} signup={signup} mostrarError={mostrarError}/>)
      }
      <div> {JSON.stringify(usuario)}</div>
    </Router>  
  );

  
}


function LoginRoute({mostrarError,usuario}){
  return (
    <Switch>
      <Route path="/upload"  render={props => <Upload {...props} mostrarError={mostrarError}/>}>
      </Route>
      <Route path="/post/:id"  render={props => <PostVista {...props} mostrarError={mostrarError} usuario={usuario}/>}>
      </Route>
      <Route path="/explore"  render={props => <Explore {...props} mostrarError={mostrarError}/>}>
      </Route>

      <Route path="/"  render={props => <Feed {...props} mostrarError={mostrarError} usuario={usuario}/>}>
      </Route>
    </Switch>
  );
}

function LogoutRoute({login,signup,mostrarError}){
  return(
    <Switch>
      <Route
        path="/login/"
        render={props =><Login {...props} login={login} mostrarError={mostrarError}/>}
      />
      <Route
        render={props =><Signup {...props} signup={signup} mostrarError={mostrarError}/>}
        default
      /> {/*ruta por default*/}
    </Switch>
  );
}