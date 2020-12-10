import React, { useState } from 'react';
import Main from '../Componetes/Main';
import Axios from 'axios';
import { Link } from 'react-router-dom';

export default function Login({login,mostrarError}){

    const [usuario, setUsuario] = useState({
        email: "",
        username: '',
    })

    function handleInputChange(e){
        setUsuario ({...usuario, [e.target.name]: e.target.value});
    }

    async function handleSubmit(e){
        e.preventDefault();
        try {
            await login(usuario.email,usuario .password);
        }
        catch (error){
            mostrarError(error.response.data);
            console.log(error)

        }
    }
    return ( 

    <Main center>
        <div className="FormContainer">
            <h1 className="Form__titulo"></h1>
            <div>
                <form onSubmit={handleSubmit}>
                <input type="email" name="email" placeholder="Email" className="Form__field"  onChange={handleInputChange} value={usuario.email} required/>
                <input type="password" name="password" placeholder="Contraseña" className="Form__field"  max="150" onChange={handleInputChange} value={usuario.password} required/>
                <button className="Form__submit" type="submit">Login</button>
                <p className="FormContainer__info">No tienes cuenta? <Link to="Sign up">Sing up</Link></p>
                </form>
            </div>
        </div>
    </Main>
    );
}