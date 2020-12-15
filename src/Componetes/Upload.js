import React, { useState } from 'react';
import Main from './Main';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import Axios from 'axios';
import Loading from './Loading';

export default function Upload({ mostrarError }) {
  const [imagenUrl, setImagenUrl] = useState('');
  const [subiendoImagen, setSubiendoImagen] = useState(false);

  async function handleImagenSeleccionada(evento) {
    try {
      setSubiendoImagen(true);
      const file = evento.target.files[0];

      const config = {
        headers: {
          'Content-Type': file.type
        }
      };

      const { data } = await Axios.post('/api/posts/upload', file, config);
      setImagenUrl(data.url);
      setSubiendoImagen(false);
    } catch (error) {
      setSubiendoImagen(false);
      mostrarError(error.response.data);
      console.log(error);
    }
  }

  return (
    <Main center>
      <div className="Upload">
        <form>
          <div className="Upload__image-section">
            <SeccionSubirImagen
              imagenUrl={imagenUrl}
              subiendoImagen={subiendoImagen}
              handleImagenSeleccionada={handleImagenSeleccionada}
            />
          </div>
          <textarea
            name="caption"
            className="Upload__caption"
            required
            maxLength="180"
            placeholder="Caption de tu post."
          />
          <button className="Upload__submit" type="submit">
            Post
          </button>
        </form>
      </div>
    </Main>
  );
}

function SeccionSubirImagen({
  subiendoImagen,
  imagenUrl,
  handleImagenSeleccionada
}) {
  if (subiendoImagen) {
    return <Loading />;
  } else if (imagenUrl) {
    return <img src={imagenUrl} alt="" />;
  } else {
    return (
      <label className="Upload__image-label">
        <FontAwesomeIcon icon={faUpload} />
        <span>Publica una foto</span>
        <input
          type="file"
          className="hidden"
          name="imagen"
          onChange={handleImagenSeleccionada}
        />
      </label>
    );
  }
}
