import Axios from 'axios';
import React from 'react';


export  async function toggleLike(post){
    const url =`/api/posts/${post._id}/likes`;
    let postConLikeActualizado;

    if (post.estaLike){
        await Axios.delete(url,{});
        postConLikeActualizado = {
            ...post,
            estaLike: false,
            numLikes: post.numLikes - 1
        }
    }else{
        await Axios.post(url,{});
        postConLikeActualizado = {
            ...post,
            estaLike: true,
            numLikes: post.numLikes + 1
        }
    }
    return postConLikeActualizado;
}

export async function comentar(post, mensaje,usuario){
    const {data: nuevoComentario} = await Axios.post(
        `/api/posts/${post._id}/comentarios/`,
        {mensaje}
        );
    nuevoComentario.usuario  =  usuario
}