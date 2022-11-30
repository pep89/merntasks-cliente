
import React, { useReducer } from 'react';
import TareaContext from './TareaContext';
import TareaReducer from './TareaReducer';
//import { v4 as uuidv4 } from 'uuid';

import { 
    TAREAS_PROYECTO,
    AGREGAR_TAREA,
    VALIDAR_TAREA,
    ELIMINAR_TAREA,
    //ESTADO_TAREA,
    SELECCIONAR_TAREA,
    ACTUALIZAR_TAREA,
    DESELECCIONAR_TAREA
} from '../../types/types'
import clienteAxios from '../../config/axios';

const TareaState = props => {
    const initialState = {
        /* Con la BBDD no hace falta este objeto ya que los datos los extraemos de la BBDD
        tareas: [
            { id: 1, nombre: "Elegir Plataforma", estado: true, proyectoId: 1 },
            { id: 2, nombre: "Eegir Colores", estado: false, proyectoId: 2 },
        ], */
        tareasProyecto: [],
        errorTarea: false,
        tareaSeleccionada: null
    }

    //Crear dispatch y state
    const [state, dispatch] = useReducer(TareaReducer, initialState);

    //============================================================================
    //=================Serie de funciones para el CRUD============================
    //============================================================================

    //==================Obtener las tareas de un proyecto=========================
    const obtenerTareas = async proyecto => {

        try {
            const resultado = await clienteAxios.get('/api/tareas', { params: { proyecto }});
            //console.log(resultado.data.tareas);
            dispatch({
                type: TAREAS_PROYECTO,
                payload: resultado.data.tareas
            })
        } catch (error) {
            console.log(error);
        }
    }

    //=================Agregar Tarea al proyecto===================================
    const agregarTarea = async tarea => {
        //tarea.id = uuidv4();
        try {
            //const resultado = await clienteAxios.post('/api/tareas', tarea);
            await clienteAxios.post('/api/tareas', tarea);
            //console.log(resultado);
            dispatch({
                type: AGREGAR_TAREA,
                payload: tarea
            })
        } catch (error) {
            console.log(error);

        }
    }



    //=========================Eliminar tarea por id===============================
    const eliminarTarea = async (id, proyecto) => {
        try {
            await clienteAxios.delete(`/api/tareas/${id}`, { params: { proyecto } });
            dispatch({
                type: ELIMINAR_TAREA,
                payload: id
            })
        } catch (error) {
            console.log(error);
        }
    }

    //Cambiar estado de la tarea (Esta función no será necesaria al final. El cambio de estado se realizará con la función actualizarTarea)
    /* const cambiarEstadoTarea = tarea => {
        dispatch({
            type: ESTADO_TAREA,
            payload: tarea
        })
    } */

    //======================Editar la tarea seleccionada============================
    const actualizarTarea = async tarea => {
        //console.log(tarea);
        try {
            const resultado = await clienteAxios.put(`/api/tareas/${tarea._id}`, tarea);
            //console.log(resultado);
            dispatch({
                type: ACTUALIZAR_TAREA,
                payload: resultado.data.tarea
            })
        } catch (error) {
            console.log(error)
        }
    }

    //===================Extraer una tarea para edicion==============================
    const seleccionarTarea = tarea => {
        dispatch({
            type: SELECCIONAR_TAREA,
            payload: tarea
        })
    }

    //===================Desselecciona la tarea seleccionada=========================
    const desseleccionarTarea = () => {
        dispatch({
            type: DESELECCIONAR_TAREA
        })
    }

    //=================Valida y muestra un error=====================================
    const validarTarea = () =>{
        dispatch({
            type: VALIDAR_TAREA
        })
    }

    return (
        <TareaContext.Provider
            value={{
                //tareas: state.tareas,
                tareasProyecto: state.tareasProyecto,
                errorTarea: state.errorTarea,
                tareaSeleccionada: state.tareaSeleccionada,
                obtenerTareas,
                agregarTarea,
                validarTarea,
                eliminarTarea,
                //cambiarEstadoTarea,
                seleccionarTarea,
                actualizarTarea,
                desseleccionarTarea
            }}
        >
            {props.children}
        </TareaContext.Provider>
    )
}

export default TareaState