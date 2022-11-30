/* Importamos:
1:ProyectoContext para crear el provider al que se subscribiran los componentes, por el cual tendrán acceso a los estados y funciones de este 'ProyectoState, que le pasemos a dicho provider  
2:ProyectoReducer, el qual lo utilizaremos en el useReducer, para indicarle que será en este 'archivo' donde se ejecutarán las funcionalidades del dispatch del useReducer, que modificaran el estado de "stateInicial" según el type que le pasemos.
3:Importamos los  types de 'types.js' para indicar en el dispatch, que funcionalidad queremos ejecutar en 'proyectoReducer'
*/

import React, {useReducer } from 'react';
//import { v4 as uuidv4 } from 'uuid'; //Con la BBDD no hace falta ya que el id lo extraemos de ella
import ProyectoContext from './ProyectoContext';
import ProyectoReducer from './ProyectoReducer';
import { 
    FORMULARIO_PROYECTO,
    VALIDAR_FORMULARIO,
    OBTENER_PROYECTOS,
    AGREGAR_PROYECTO,
    PROYECTO_ACTUAL,
    ELIMINAR_PROYECTO,
    PROYECTO_ERROR
 } from '../../types/types'
import clienteAxios from '../../config/axios';

const ProyectoState = props => {

    /* Con la BBDD no hace falta este objeto ya que los datos los extraemos de la BBDD
    const proyectos = [
        { id:1,  nombre: 'Tienda Virtual' },
        { id:2, nombre: 'Intranet' },
        { id:3, nombre: 'Diseño de sitio Web' }
    ] */

    const initialState = {
        proyectos : [],
        formulario : false,
        errorFormulario: false,
        proyectoSeleccionado: null,
        mensaje: null
    }

    //Dispatch para ejecutar las accions
    const [state, dispatch] = useReducer(ProyectoReducer, initialState);

    //============================================
    //=======Serie de funciones para el CRUD======
    //============================================


    //=============Activar formulario para introducir proyecto=========
    const mostrarFormulario = formulario => {
        dispatch( {
            type: FORMULARIO_PROYECTO,
            payload: formulario
        })
    }

    //=========Validar formulario (por errores) para introducir proyecto========
    const mostrarError = error => {
        dispatch({
            type: VALIDAR_FORMULARIO,
            payload: error
        })
    }

    //=================Obtener los proyectos====================================
    const obtenerProyectos = async () => {
        
        try {
            const resultado = await clienteAxios.get('/api/proyectos');
            dispatch({
                type: OBTENER_PROYECTOS,
                payload: resultado.data
            })
        } catch (error) {
            //console.log(error);
            const alerta = {
                msg: 'Hubo un error',
                categoria: 'alerta-error'
            }
            dispatch({
                type: PROYECTO_ERROR,
                payload: alerta
            })
        }
    }

     //=========================agragar nuevo proyecto ==============================
    /*(Exportamos esta funcion en el componente "NuevoProyecto" y la ejecutamos en la funcion "onSubmitProyecto" pasandole el objeto entero "proyecto" en el state local de "NuevoProyecto") */
    const agregarProyecto = async proyecto => {
        
        //proyecto.id = uuidv4(); //id para el proyecto creado (no necesario con la BBDD)
        try {
            const resultado = await clienteAxios.post('/api/proyectos', proyecto);
            //console.log(resultado);

            //insertamos el proyecto pasado en el state
            dispatch({
                type: AGREGAR_PROYECTO,
                payload: resultado.data
            })
        } catch (error) {
            //console.log(error);
            const alerta = {
                msg: 'Hubo un error',
                categoria: 'alerta-error'
            }
            dispatch({
                type: PROYECTO_ERROR,
                payload: alerta
            })
        }
    }

    //==================Selecciona el Proyecto al que el usuario dió click=====================
    const seleccionarProyecto = proyectoId => {
        dispatch({
            type: PROYECTO_ACTUAL,
            payload: proyectoId
        })
    }

    //=====================Eliminar el proyecto seleccionado=================================
    const eliminarProyecto = async proyecto => {
        try {
            
            //Eliminamos las tareas del proyecto seleccionado
            await clienteAxios.delete('/api/tareas', {params: { proyecto }});
            
            //Eliminamos el proyecto seleccionado
            await clienteAxios.delete(`/api/proyectos/${proyecto}`);
            
            dispatch({
                type: ELIMINAR_PROYECTO,
                payload: proyecto
            })
        } catch (error) {
            //console.log(error);
            const alerta = {
                msg: 'Hubo un error',
                categoria: 'alerta-error'
            }
            dispatch({
                type: PROYECTO_ERROR,
                payload: alerta
            })
        }
    }



    return(
        <ProyectoContext.Provider
            value={{
                proyectos: state.proyectos,
                proyectoSeleccionado: state.proyectoSeleccionado,
                formulario: state.formulario,
                errorFormulario: state.errorFormulario,
                mensaje: state.mensaje,
                mostrarFormulario,
                mostrarError,
                obtenerProyectos,
                agregarProyecto,
                seleccionarProyecto,
                eliminarProyecto
            }}
        >
            {props.children}
        </ProyectoContext.Provider>
    )
}

export default ProyectoState;