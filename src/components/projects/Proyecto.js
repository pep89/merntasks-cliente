import React, { useContext } from 'react'
import ProyectoContext from '../../context/proyectos/ProyectoContext';
import TareaContext from '../../context/tareas/TareaContext';


const Proyecto = ({proyecto}) => {

    //Obtener el state y los metodos de ProyectoState mediante ProyectoContext
    const proyectosContext = useContext(ProyectoContext);
    const {   seleccionarProyecto } = proyectosContext;

    //Obtener el state y los metodos de TareaContext mediante ProyectoContext
    const tareasContext = useContext(TareaContext);
    const {  obtenerTareas } = tareasContext;

    //Funcion para agreagar el proyecto actual
    const proyectoSeleccionado = id =>{
        seleccionarProyecto(id)
        obtenerTareas(id)
    }

    return ( 
        <li>
            <button
                type='button'
                className='btn btn-blank'
                onClick={() =>proyectoSeleccionado(proyecto._id) }
            >
                {proyecto.nombre}
            </button>
        </li>
     );
}
 
export default Proyecto;