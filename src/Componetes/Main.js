import React from 'react';

                        //destructura el objecto al llegar como parametro a la funcion
export default function Main({children,center}){
    let classes = `Main ${center ? 'Main--center' : ''}`;
    return  <main className={classes}>{children}</main>;
}