/* import React, { useContext } from "react";
import { Route, Navigate } from 'react-router-dom';

import AuthContext from "../../context/autenticacion/authContext";

//Este es nuestro higher order component
const RutaPrivada = ( { element: Component, ...props } ) => {
    
    const authContext = useContext(AuthContext);
    const { autenticado } = authContext;
    console.log('props');
    return (
        <Route { ...props } render={ props => !autenticado ? 
            (
                <Navigate to="/" />
            ): (
                <Component {...props} />
            ) }
        />
    );
}

export default RutaPrivada */

import React, { useContext, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import AuthContext from "../../context/autenticacion/authContext";

const RutaPrivada = () => {
   
    const authContext = useContext(AuthContext);
    const { cargando, autenticado, usuarioAutenticado } = authContext;

    useEffect(() => {
        usuarioAutenticado();
    
        // eslint-disable-next-line
    }, [])

    //Si autenticado y cargando son false devuelve un elemento <Navigate /> que redirecciona a la ruta "/"
    //De lo contrario devuelve un <Outlet /> que renderiza el elemento hijo
    //return !autenticado && !cargando ? <Navigate to="/" /> : <Outlet /> ;
    return autenticado || cargando ? <Outlet /> : <Navigate to='/' />;
}

export default RutaPrivada;