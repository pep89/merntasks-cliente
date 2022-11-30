import clienteAxios from "./axios";

const tokenAuth = token => {
    if(token){
        clienteAxios.defaults.headers.common['x-auth-token'] = token;
    } else {
        //Eliminamos el token del header, ya sea porque el token expiro o porque el usuario cerró sesion
        delete clienteAxios.defaults.headers.common['x-auth-token'];
    }
}

export default tokenAuth;