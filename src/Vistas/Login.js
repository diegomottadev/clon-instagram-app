import React, { useState } from 'react';
import Main from '../Componetes/Main';
import Axios from 'axios';

export default function Login(){

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
            const {data}  = await Axios.post('/api/usuarios/login',usuario);
            console.log(data);
        }
        catch (error){
            console.log(error)
        }
    }
    return ( 

    <Main center>
        <div className="FormContainer">
            <h1 className="Form__titulo"></h1>
            <div>
                <form onSubmit={handleSubmit}>
                <input type="email" name="email" placeholder="Email" className="Form__field" required onChange={handleInputChange} value={usuario.email}/>
                <input type="password" name="password" placeholder="Contraseña" className="Form__field" required max="150" onChange={handleInputChange} value={usuario.password}/>
                <button className="Form__submit" type="submit">Login</button>
                <p className="FormContainer__info">No tienes cuenta? <a href="/signup">Sign up</a></p>
                </form>
            </div>
        </div>
    </Main>
    );
}