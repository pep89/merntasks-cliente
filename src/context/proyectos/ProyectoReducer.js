/* Creamos el "reducer que nos servirá para realizar diferentes funcionalidades dependiendo de la acción que se tenga que realizar marcada por el type.
1:Importamos todos los types de 'types.js'.
2:Exportamos el 'reducer' al ProyectoState que serà donde se efectuaran los dispatch que ejecutaran las funcionalidades de este reducer las cuales modificaran los estados que se pasen, mediante el hook 'useReducer'" */

import { 
    FORMULARIO_PROYECTO,
    OBTENER_PROYECTOS,
    AGREGAR_PROYECTO,
    VALIDAR_FORMULARIO,
    PROYECTO_ACTUAL,
    ELIMINAR_PROYECTO,
    PROYECTO_ERROR
 } from '../../types/types'



//export default (state, action) => {
const ProyectoReducer = (state, action) => {
    switch(action.type) {
        case FORMULARIO_PROYECTO:
            return {
                ...state,
                formulario: !action.payload,
                errorFormulario: false
            }
        case VALIDAR_FORMULARIO:
            return {
                ...state,
                errorFormulario: action.payload
            }
        case OBTENER_PROYECTOS:
            //console.log(action.payload);
            return {
                ...state,
                proyectos: action.payload.proyectos
            }
        case AGREGAR_PROYECTO:
            return {
                ...state,
                //Agregamos primero el payload y luego el objeto, para que el nuevo proyecto añadido sea el primero
                proyectos: [ action.payload, ...state.proyectos ], 
                formulario: false,
                //errorFormulario: false
            }
        case PROYECTO_ACTUAL:
            return {
                ...state,
                proyectoSeleccionado: state.proyectos.filter( proyecto =>  proyecto._id === action.payload )
            }
        case ELIMINAR_PROYECTO:
            return{
                ...state,
                proyectos: state.proyectos.filter( proyecto => proyecto._id !== action.payload ),
                proyectoSeleccionado: null
            }
        case PROYECTO_ERROR:
            return{
                ...state,
                mensaje: action.payload
            }
        default: 
            return state;
    }
}

export default ProyectoReducer;