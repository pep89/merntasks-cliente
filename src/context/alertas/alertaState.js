import React, { useReducer } from "react";
import alertaReducer from "./alertaReducer";
import alertaContext from "./alertaContext";
import { MOSTRAR_ALERTA, OCULTAR_ALERTA } from "../../types/types";

const AlertaState = props => {
    const initialState = {
        alerta : null
    }

    const [ state, dispatch ] = useReducer(alertaReducer, initialState);

    //Funciones
    const mostrarAlerta = (msg, categoria) => {
        dispatch({
            type: MOSTRAR_ALERTA,
            payload : {
                msg,
                categoria
            } /* Como payload pasamos un objeto y le aplicamos el 
                object literal enhancement que es:
                Como la key y el valor tienen el mismo nombre,
                en vez de hacer { msg: msg, categoria: categoria }
                podemos hacer { msg, categoria }*/
        });

        //Despues de 5 segundos limpia la alerta
        setTimeout( () => {
            dispatch({
                type: OCULTAR_ALERTA
            })
        }, 5000)
    }
    return(
        <alertaContext.Provider
            value={{
                alerta: state.alerta,
                mostrarAlerta
            }}
        >
            {props.children}
        </alertaContext.Provider>
    )
}

export default AlertaState;