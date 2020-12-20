import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCameraRetro} from '@fortawesome/free-solid-svg-icons';
import {faCompass} from '@fortawesome/free-regular-svg-icons';
import { Link } from 'react-router-dom';

export default function Nav({usuario}){
    return(
        <nav className="Nav">
            <ul className="Nav__links">
                <li>
                    <Link className="Nav__link" to="/">Clontagram</Link>
                        
                    
                </li>
                {usuario  && <LoginRoutes/>}
            </ul>
        </nav>
    )
    }

    function LoginRoutes(){
        //react fragment
        return (
            <>
            <li className="Nav__link-push">
                <Link to="/upload" className="Nav__link">
                    <FontAwesomeIcon icon={faCameraRetro}></FontAwesomeIcon>
                </Link>
                <Link to="/explore" className="Nav__link">
                    <FontAwesomeIcon icon={faCompass}></FontAwesomeIcon>
                </Link>
            </li>
        
            </>
        )
    }