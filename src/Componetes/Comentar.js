import React,{useState} from 'react';

export default function Comentar({onSubmitComentario, mostrarError}){


    const [mensaje, setMensaje] = useState('');

    async function onSubmit(e){
        e.preventDefautl();
    }
    return (
        <form className="Post__comentario-form-container" onSubmit={onSubmit}>
            <input type="text" placeholder="Deja un comentario" required maxLength="180"/>
            <button type="submit"> Post</button>
        </form>
    )
}
