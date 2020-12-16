import React, {useEffect,useState} from 'react';
import Axios from 'axios';
import Main from '../Componetes/Main';
import Loading from '../Componetes/Loading';
import { Link } from 'react-router-dom';
import Post from '../Componetes/Post'

async function cargarPosts(fechaUltimoPost){
    const query = fechaUltimoPost ? `?fecha=${fechaUltimoPost}`: "";
    const {data: nuevosPosts} = await Axios.get(`/api/posts/feed${query}`);
    return nuevosPosts;
}

export default function Feed({mostrarError}){

    const [posts, setPosts] = useState([]);
    const [cargandoPostsIniciales,setCargandoPostsIniciales] = useState(true)

    useEffect(()=>{
        async function cargarPostIniciales(){
            try {
                const nuevosPosts = await cargarPosts();
                setPosts(nuevosPosts);
                console.log(nuevosPosts);
                setCargandoPostsIniciales(false);
            } catch (error) {
                    mostrarError('Hubo un error al cargar tu feed..');
                    console.log(error);
            }
        }
        cargarPostIniciales();
    }, []);

    function actualizarPost(postOriginal, postActualizado){
        setPosts(posts=>{
            const postsActualizados = posts.map(post =>{
                if (post !== postOriginal){
                    return post;
                }
                //actualiza el post y lo retorna 
                return postActualizado
            });
            return postsActualizados;
        });
    }

    if(cargandoPostsIniciales){
        return(
            <Main center>
                <Loading/>
            </Main>
        );
    }

    if(!cargandoPostsIniciales && posts.length === 0){
        return (<Main center><NoSiguesANadie/></Main>);
    }

    return (<Main center>
        <div className="Feed">
            {posts.map(post =>(
                <Post key={post._id} post={post} actualizarPost={actualizarPost} mostrarError={mostrarError}/>
            ))}
        </div>
        </Main>);
}

function NoSiguesANadie(){
    return (
        <div className="NoSiguesANadie">
            <p className="NoSiguesANadie__mensaje">
                Tu feed no tiene fotos o porque no han publicado fotos
            </p>
            <div className="text-center">
                <Link to="/explore" className="NoSiguesANadie_boton">
                    Explora clontagram      
                </Link>
            </div>
        </div>
    );
}