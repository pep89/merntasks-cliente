import React, { useContext } from 'react'
import Tarea from './Tarea';
import ProyectoContext from '../../context/proyectos/ProyectoContext';
import TareaContext from '../../context/tareas/TareaContext';
import { CSSTransition, TransitionGroup } from 'react-transition-group'



const ListadoTareas = () => {

    //Obtener el state y los metodos de ProyectoState mediante ProyectoContext
    const proyectosContext = useContext(ProyectoContext);
    const { proyectos, proyectoSeleccionado, eliminarProyecto } = proyectosContext;

    //Obtener el state y los metodos de TareaState mediante TareaContext
    const tareasContext = useContext(TareaContext);
    const { tareasProyecto  } = tareasContext;
    
    if(proyectos.length === 0){ return <h2>Crea un Proyecto para añadir Tareas</h2>}
    if(!proyectoSeleccionado) {return <h2>Seleccione un Proyecto para añadir Tareas</h2>; }
     
        
    const [ proyectoActual ] = proyectoSeleccionado;

    //Elimina un proyecto
    const onCLickEliminar = () =>{
        eliminarProyecto(proyectoActual._id)
    }
    //console.log(tareasProyecto);
    return ( 
        <>
            <h2>Proyecto: { proyectoActual.nombre }</h2>

            <ul className='listado-tareas'>
                {tareasProyecto.length === 0 
                    ? (<li className='tarea'> <p>No hay tareas</p> </li>)
                    : (
                        <TransitionGroup>
                            {tareasProyecto.map(tarea => (

                                <CSSTransition 
                                    key={tarea._id}
                                    timeout={500}
                                    classNames="tarea"
                                >
                                    <Tarea 
                                        tarea={tarea}
                                    />
                                </CSSTransition>
                                
                            ))}
                        </TransitionGroup>
                    )
                }

            </ul>

            <button 
                type='button'
                className='btn btn-eliminar'
                onClick={onCLickEliminar}
            > Eliminar Proyecto &times;
            </button>
        </>
    );
}
 
export default ListadoTareas;