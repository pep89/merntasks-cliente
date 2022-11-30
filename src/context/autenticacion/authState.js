import React, { useReducer } from "react";
import AuthContext from "./authContext";
import AuthReducer from "./authReducer";

import clienteAxios from "../../config/axios";
import tokenAuth from "../../config/tokenAuth";

import { 
    REGISTRO_EXITOSO,
    REGISTRO_ERROR,
    OBTENER_USUARIO,
    LOGIN_EXITOSO,
    LOGIN_ERROR,
    CERRAR_SESION
 } from "../../types/types";

 const AuthState = props => {
    const initialState = {
        /* Una vez tengamos una validación correcta, el token generado en vez de pasarlo por postman, como haciamos en el servidor, lo guardamos en el localStorage */
        token: localStorage.getItem('token'),
        autenticado: null,
        usuario: null,
        mensaje: null,
        cargando: true
    }

    const [ state, dispatch ] = useReducer(AuthReducer, initialState);


    //==============================Autenticar usuario=============================
    const usuarioAutenticado = async () => {
        const token = localStorage.getItem('token');

        if(token){
            //Funcion para enviar el token por headers --> Le pasamos a tokenAuth, el token obtenido del localStorage
            tokenAuth(token); 
        }

        try {
            const respuesta = await clienteAxios.get('/api/auth');
            //console.log(respuesta);
            dispatch({
                type: OBTENER_USUARIO,
                payload: respuesta.data.usuario
            });
        } catch (error) {
            //console.log(error.response);
            dispatch({
                type: LOGIN_ERROR
            })
        }
    }

    //===================Registrar usuario==========================
    const registrarUsuario = async datos => {
        try {
            const respuesta = await clienteAxios.post('/api/usuarios', datos);
            console.log(respuesta.data);

            dispatch({
                type: REGISTRO_EXITOSO,
                payload: respuesta.data
            })

            //Obtener el usuario (Llamada a la funcion usuarioAutenticado())
            usuarioAutenticado();
            
        } catch (error) {
            //console.log(error.response);
            const alerta = {
                msg: error.response.data.msg,
                categoria: 'alerta-error'
            }
            dispatch({
                type: REGISTRO_ERROR,
                payload: alerta
            })
        }
    }

    

    //==================Iniciar sesion con un usuario================
    const iniciarSesion = async datos => {
        try {
            const respuesta = await clienteAxios.post('/api/auth', datos);
            //console.log(respuesta); 
            dispatch({
                type: LOGIN_EXITOSO,
                payload: respuesta.data
            });
            //Obtener el usuario (Llamada a la funcion usuarioAutenticado())
            usuarioAutenticado();
                
        } catch (error) {
            //console.log(error);
            const alerta = {
                msg: error.response?.data?.msg,
                categoria: 'alerta-error'
            }
            dispatch({
                type: LOGIN_ERROR,
                payload: alerta
            })
        }
    }

    //========================Cerrar la sesion del usuario==================
    const cerrarSesion = () => {
        dispatch({
            type: CERRAR_SESION
        })
    }


    return (
        <AuthContext.Provider
            value={{
                token: state.token,
                autenticado: state.autenticado,
                usuario: state.usuario,
                mensaje: state.mensaje,
                cargando: state.cargando,
                usuarioAutenticado,
                registrarUsuario,
                iniciarSesion,
                cerrarSesion
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
 }

 export default AuthState