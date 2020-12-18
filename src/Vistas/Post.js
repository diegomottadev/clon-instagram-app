import React, { useState, useEffect } from 'react';
import Main from '../Componetes/Main';
import Loading from '../Componetes/Loading';
import Avatar from '../Componetes/Avatar';
import Comentar from '../Componetes/Comentar';
import BotonLike from '../Componetes/BotonLike';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import RecursoNoExiste from '../Componetes/RecursoNoExiste';
//match : prop de route router para acceder al id por parametros
export default function Post({ mostrarError, match }) {
    const postId = match.params.id;
    const [post,setPost] = useState(null);
    const [loading, setLoading ] = useState(true);
    const [postNoExiste, setPostNoExiste] = useState(false);
    // cuando ingresa a esta vista el lloading se carga primero y 
    // mientras el servidor buscar el post
    useEffect(()=>{

        async function cargarPost(){
            try {
                const {data: post} = await Axios.get(`/api/posts/${postId}`);
                setPost(post);
                setLoading(false);
            } catch (error) {
                if(error.response & error.response.status == 404 || error.response.status == 400){
                    setPostNoExiste(true);
                }else{
                    mostrarError('Hubo un problema cargar este post');
                }
                setLoading(false);
            }
        }
        cargarPost();
    },[postId]); //en caso que la postId cambie el useEffect se de cuenta y cambie el post

    if(loading){
        return (
            <Main center>
                <Loading></Loading>
            </Main>
        );
    }

    if(postNoExiste){
        return <RecursoNoExiste mensaje='El post que estas intentando ver no existe'/>;
    }

    if(post == null){
        return null;
    }

    return (
        <Main center>
            <h1> Soy el post</h1>
        </Main>
    );

}