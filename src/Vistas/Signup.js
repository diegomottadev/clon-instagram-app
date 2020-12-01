import React from 'react';
import Main from '../Componetes/Main';
import imagenSignup from '../imagenes/signup.png';
export default function Signup() {
   return ( 
    <Main center={true}>
        <div className="Signup">
            <img src={imagenSignup  } alt="" className="Signup__img"/>
            <div className="FormContainer">
                <h1 className="Form_titulo">Clontagram</h1>
                <p className="FormContainer__info">
                    Registrate para que veas el clon de instagram
                </p>
                <form  action="">
                    <input type="email" name="email" placeholder="Email" className="Form__field" required/>
                    <input type="text" name="nombre" placeholder="Nombre y Apellido" className="Form__field" required min="3" max="100"/>
                    <input type="text" name="bio" placeholder="Cuentanos sobre ti" className="Form__field" required  max="150"/>
                    <input type="password" name="password" placeholder="Contraseña" className="Form__field" required max="150"/>
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