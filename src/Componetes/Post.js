import React , {useState} from 'react';
import Avatar from './Avatar';


export default function Post({post,actualizarPost}){
    const {
        numLikes,
        numComentarios,
        comentarios,
        _id,
        caption,
        usuario,
        estaLike,
        url
    } = post;

    return (
        <div className="Post-Componente">
            <Avatar usuario={usuario}/>
            <img src={url} alt={caption} className="Post-Componente__img"/>
        </div>
    )
}