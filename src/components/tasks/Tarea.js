import React, {useContext} from 'react'
import TareaContext from '../../context/tareas/TareaContext';


const Tarea = ({tarea}) => {

    const {nombre, estado, proyecto} = tarea;

    //Obtener el state y los metodos de TareaState mediante TareaContext
    const tareasContext = useContext(TareaContext);
    const { obtenerTareas, eliminarTarea, actualizarTarea, seleccionarTarea } = tareasContext;


    
    //Funcion que se ejecuta al presionar el boton eliminar
    const handleEliminar = id => {
        eliminarTarea(id, proyecto);
        obtenerTareas(proyecto);
    }

    //FUncion que modifica el estado de las tareas
    const cambiarEstado = tarea => {
        //console.log(tarea);
        if(tarea.estado){
            tarea.estado = false;
        }else{
            tarea.estado = true;
        }
        actualizarTarea(tarea);
        obtenerTareas(proyecto);
    }

    //Funcion para seleccionar una tarea para editar
    const handleEditarTarea = tarea => {
        seleccionarTarea(tarea);
    }

    return ( 
        <li className='tarea sombra'>
            <p>{nombre}</p>
            <div className='estado'>
                {estado  ? (
                    <button
                        type="button"
                        className='completo'
                        onClick={()=> cambiarEstado(tarea)}
                    >Completo</button>
                ) 
                :(
                    <button
                    type="button"
                    className='incompleto'
                    onClick={()=> cambiarEstado(tarea)}
                    >Incompleto</button>
                ) }
            </div>
            <div className='acciones'>
                <button 
                    type='buton'
                    className='btn btn-primario'
                    onClick={ ()=> handleEditarTarea(tarea)}
                >Editar</button>
                <button
                    type='buton'
                    className='btn btn-secundario'
                    onClick={() => handleEliminar(tarea._id)}
                >Eliminar</button>
            </div>
        </li>
     );
}
 
export default Tarea;