import React, { useState } from 'react';
import Main from '../Componetes/Main';
import imagenSignup from '../imagenes/signup.png';
import Axios from 'axios';
export default function Signup() {

    const [usuario, setUsuario] = useState({
        email: "",
        username: '',
        password:'',
        bio:'',
        nombre:''
    })

    async function handleSubmit(e){
        e.preventDefault();
        try {
            const {data}  = await Axios.post('/api/usuarios/signup',usuario);
            console.log(data);
        }
        catch (error){
            console.log(error)
        }
    }

    function handleInputChange(e){
        //usuario[e.target.name] = e.target.value;
        setUsuario ({...usuario, [e.target.name]: e.target.value});
        console.log({...usuario, [e.target.name]: e.target.value});
    }

   return ( 
    <Main center={true}>
        <div className="Signup">
            <img src={imagenSignup} alt="" className="Signup__img"/>
            <div className="FormContainer">
                <h1 className="Form_titulo">Clontagram</h1>
                <p className="FormContainer__info">
                    Registrate para que veas el clon de instagram
                </p>
                <form  onSubmit={handleSubmit}>
                    <input type="email" name="email" placeholder="Email" className="Form__field" required onChange={handleInputChange} value={usuario.email}/>
                    <input type="text" name="nombre" placeholder="Nombre y Apellido" className="Form__field" required min="3" max="100" onChange={handleInputChange} value={usuario.nombre}/>
                    <input type="text" name="username" placeholder="Nombre de usuario" className="Form__field" required min="3" max="100" onChange={handleInputChange} value={usuario.username}/>

                    <input type="text" name="bio" placeholder="Cuentanos sobre ti" className="Form__field" required  max="150" onChange={handleInputChange} value={usuario.bio}/>
                    <input type="password" name="password" placeholder="Contraseña" className="Form__field" required max="150" onChange={handleInputChange} value={usuario.password}/>
                    <button className="Form__submit" type="submit">Sign Up</button>
                    <p className="FormContainer_info">
                        Ya tienes cuenta? <a href="/logn\">Login</a>
                    </p>
                </form>
            </div>
        </div>
    </Main>
    );
}