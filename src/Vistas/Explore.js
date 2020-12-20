import React, {useState,useEffect} from 'react';
import Main from '../Componetes/Main';
import {Link} from 'react-router-dom';
import Loading from '../Componetes/Loading';
import {ImagenAvatar} from '../Componetes/Avatar';
import Axios from 'axios';
import Grid from '../Componetes/Grid';

export default function Explore({mostrarError}){

    const [posts,setPosts] = useState([]);
    const [users,setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(()=>{
        async  function cargarPostsYusuarios( ){
            try {
                const [posts,users] = await Promise.all([
                    Axios.get('/api/posts/explore').then(({data}) =>data),
                    Axios.get('/api/usuarios/explore').then(({data}) =>data)
                ]);
                setPosts(posts);
                setUsers(users);
                setLoading(false);
            } catch (error) {
                mostrarError('Hubo un problema con el explore, Vuelva a refrescar la página');
            }
        }
        cargarPostsYusuarios();
    },[]);

    if(loading){
        return (
            <Main center>
                <Loading/>
            </Main>
        );
    }

    return (
        <Main>
            <div className="Explore__section">
                <h2 className="Explore__title">Descubrir usuarios</h2>
                <div className="Explore__usuarios-container">
                    {
                        users.map(usuario =>{
                            return(
                                <div key={usuario._id} className="Explore__usuario">
                                        <ImagenAvatar usuario={usuario}/>
                                        <p>{usuario.username}</p>
                                         <Link to={`/perfil/${usuario.username}`}> 
                                            Ver Perfil
                                        </Link>
                                </div>
                            );
                        })
                    }
                </div>
            </div>

            <div className="Explore__section">
                <h2 className="Explore__title">
                        Explorar
                </h2>
                <Grid posts={posts}/>
            </div>

        </Main>
    );
}