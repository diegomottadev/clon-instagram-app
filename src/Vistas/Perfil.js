import React, { useState, useEffect } from 'react';
import Main from '../Componetes/Main';
import RecursoNoExiste from '../Componetes/RecursoNoExiste';
import Axios from 'axios';
import stringToColor from 'string-to-color';
import Loading from '../Componetes/Loading';

export default function Perfil({ mostrarError, usuario, match }) {
    
  const username = match.params.username;
  const [usuarioDueñoDelPerfil, setUsuarioDueñoDelPerfil] = useState(null);
  const [posts, setPosts] = useState([]);
  const [cargandoPerfil, setCargandoPefil] = useState(true);
  const [perfilNoExiste, setPerfilNoExiste] = useState(false);
  const [subiendoImagen, setSubiendoImagen] = useState(false);

  useEffect(() => {
    async function cargarPostsYUsuario() {
      try {
        setCargandoPefil(true);
        const { data: usuario } = await Axios.get(`/api/usuarios/${username}`);
        const { data: posts } = await Axios.get(
          `/api/posts/usuario/${usuario._id}`
        );
        setUsuarioDueñoDelPerfil(usuario);
        setPosts(posts);
        setCargandoPefil(false);
      } catch (error) {
        if (
          error.response &&
          (error.response.status === 404 || error.response.status === 400)
        ) {
          setPerfilNoExiste(true);
        } else {
          mostrarError('Hubo un problema cargando este perfil.');
        }
        setCargandoPefil(false);
      }
    }

    cargarPostsYUsuario();
  }, [username]);

  function esElPerfilDeLaPersonaLogin() {
    return usuario._id === usuarioDueñoDelPerfil._id;
  }

  if (cargandoPerfil) {
    return (
      <Main center>
        <Loading />
      </Main>
    );
  }

  if (perfilNoExiste) {
    return (
      <RecursoNoExiste mensaje="El perfil que estas intentando ver no existe" />
    );
  }

  if (usuario == null) {
    return null;
  }

  return (
    <Main>
      <div className="Perfil">
        <ImagenAvatar
          esElPerfilDeLaPersonaLogin={esElPerfilDeLaPersonaLogin()}
          usuarioDueñoDelPerfil={usuarioDueñoDelPerfil}
          handleImagenSeleccionada={() => 1}
          subiendoImagen={subiendoImagen}
        />
      </div>
    </Main>
  );
}

function ImagenAvatar({
  esElPerfilDeLaPersonaLogin,
  usuarioDueñoDelPerfil,
  handleImagenSeleccionada,
  subiendoImagen
}) {
  let contenido;

  if (subiendoImagen) {
    contenido = <Loading />;
  } else if (esElPerfilDeLaPersonaLogin) {
    contenido = (
      <label
        className="Perfil__img-placeholder Perfil__img-placeholder--pointer"
        style={{
          backgroundImage: usuarioDueñoDelPerfil.imagen
            ? `url(${usuarioDueñoDelPerfil.imagen})`
            : null,
          backgroundColor: stringToColor(usuarioDueñoDelPerfil.username)
        }}
      >
        <input
          type="file"
          onChange={handleImagenSeleccionada}
          className="hidden"
          name="imagen"
        />
      </label>
    );
  } else {
    contenido = (
      <div
        className="Perfil__img-placeholder"
        style={{
          backgroundImage: usuarioDueñoDelPerfil.imagen
            ? `url(${usuarioDueñoDelPerfil.imagen})`
            : null,
          backgroundColor: stringToColor(usuarioDueñoDelPerfil.username)
        }}
      />
    );
  }

  return <div className="Perfil__img-container">{contenido}</div>;
}
