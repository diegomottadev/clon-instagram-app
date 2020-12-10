import React from 'react';
import Main from './Main';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faUpload} from '@fortawesome/free-solid-svg-icons' ;
import Loading from '../Componetes/Loading';
import Axios from 'axios';

export default function Upload(){
    return(
        <Main center>
            <div className="Upload">
                <form>
                    <div className="Upload__image-section"></div>
                    <textarea name="caption" className="Upload__caption"  required maxLength="180" placeholder="Caption de tu post"></textarea>
                </form>
            </div>
            <buttom type="submit" className="Upload__submit">Post</buttom>
        </Main>
    )
    }