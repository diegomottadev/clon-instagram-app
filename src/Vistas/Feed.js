import React, {useEffect} from 'react';
import Axios from 'axios';
import Main from '../Componetes/Main';
import Loading from '../Componetes/Loading';

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
        cargarPosts();
    }, []);
    return (<Main center><h1>Soy el feed</h1></Main>);
}