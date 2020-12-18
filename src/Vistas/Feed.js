import React, {useEffect,useState} from 'react';
import Axios from 'axios';
import Main from '../Componetes/Main';
import Loading from '../Componetes/Loading';
import { Link } from 'react-router-dom';
import Post from '../Componetes/Post'
const NUMERO_DE_POSTS_POR_LLAMADA = 3;
async function cargarPosts(fechaUltimoPost){
    const query = fechaUltimoPost ? `?fecha=${fechaUltimoPost}`: "";
    const {data: nuevosPosts} = await Axios.get(`/api/posts/feed${query}`);
    return nuevosPosts;
}

export default function Feed({mostrarError,usuario}){

    const [posts, setPosts] = useState([]);
    const [cargandoPostsIniciales,setCargandoPostsIniciales] = useState(true);
    const [cargandoMasPosts,setCargarMasPosts] = useState(false);
    const [todosLosPostsCargados,setTodosLosPostsCargados] = useState(false);

    useEffect(()=>{
        async function cargarPostIniciales(){
            try {
                const nuevosPosts = await cargarPosts();
                setPosts(nuevosPosts);
                console.log(nuevosPosts);
                setCargandoPostsIniciales(false);
                revisarSiHayMasPosts(nuevosPosts);
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

    async function cargarMasPosts(){
        if (cargandoMasPosts){
            return;
        }
        try {
            setCargarMasPosts(true);
            const fechaUltimoPost = posts[posts.length - 1].fecha_creado;
            const nuevosPosts = await cargarPosts(fechaUltimoPost);
            //construye un nuevo array con los viejos posts y se le añade los nuevosPosts de esta
            //funcion
            setPosts(viejosPosts => [...viejosPosts,...nuevosPosts]);
            setCargarMasPosts(false);
            revisarSiHayMasPosts(nuevosPosts);
        } catch (error) {
            mostrarError('Hubo un problema cargando los siguientes posts.');
            setCargarMasPosts(false);

        }
    }

    function revisarSiHayMasPosts(nuevosPosts){
            if (nuevosPosts.length < NUMERO_DE_POSTS_POR_LLAMADA){
                setTodosLosPostsCargados(true);
            }
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

    return (
        <Main center>
            <div className="Feed">
                {posts.map(post =>(
                <Post key={post._id} post={post} 
                    actualizarPost={actualizarPost} 
                    mostrarError={mostrarError}
                    usuario={usuario}/>
                ))}
                <CargasMasPosts 
                    onClick={cargarMasPosts} 
                    todosLosPostsCargados={todosLosPostsCargados}
                />
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

function CargasMasPosts({onClick, todosLosPostsCargados}){
    if(todosLosPostsCargados){
        return <div className="Feed__no-hay-mas-posts">No hay mas post </div>
    }else{
        return <button className="Feed__cargar-mas" onClick={onClick}>Ver más</button>
    }
}