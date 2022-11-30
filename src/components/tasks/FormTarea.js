import React, { useContext, useState, useEffect } from 'react'
import ProyectoContext from '../../context/proyectos/ProyectoContext';
import TareaContext from '../../context/tareas/TareaContext';


const FormTarea = () => {

    //Obtener el state y los metodos de ProyectoState mediante ProyectoContext
    const proyectosContext = useContext(ProyectoContext);
    const {  proyectoSeleccionado } = proyectosContext;
    
    //Obtener el state y los metodos de TareaState mediante TareaContext
    const tareasContext = useContext(TareaContext);
    const { 
        errorTarea,
        tareaSeleccionada, 
        obtenerTareas, 
        agregarTarea, 
        validarTarea,
        actualizarTarea,
        desseleccionarTarea
    } = tareasContext;

    //Effect que detecta si hay una tarea seleccionada
    useEffect(() => {
        if(tareaSeleccionada !== null){
           setTarea(tareaSeleccionada) 
        }else{
            setTarea({
                nombre: ''
            })
        }
    }, [tareaSeleccionada]);


    //State del formulario
    const [tarea, setTarea] = useState({ nombre: '' })
    const { nombre } = tarea

    if(!proyectoSeleccionado) {return null; }
           
    const [ proyectoActual ] = proyectoSeleccionado; //Array destructuring para extraer el proyecto actual


    //Leer valores del formulario
    const handleChange = e => {
        setTarea({
            ...tarea,
            [e.target.name] : e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault();

        //validar
        if(nombre.trim() === ''){ 
            validarTarea(); 
            return 
        }

        //Reviasr si es Edicion o nueva tarea
        if(tareaSeleccionada === null){

            //pasar la validacion (Podriamos pasa la validacion así, pero lo haremos desde TareasReducer).
            //validarTarea(true) 

            //Agregar nueva tarea al state de tareas
            tarea.proyecto = proyectoActual._id;
            
            //tarea.estado = false
            agregarTarea(tarea);

        }else{
            //Actualizar tarea existente
            actualizarTarea(tarea);
            
            //Elimina la tarea seleccionada
            desseleccionarTarea();
        }

        //Obtener y filtrar nuevamente las tareas del proyecto
        obtenerTareas(proyectoActual._id);

        //Reiniciar el form
        setTarea({ nombre: '' })
    }

    return ( 

        <div className='formulario'>
            <form
                onSubmit={handleSubmit}
            >

                <div className='contenedor-input'>
                    <input
                        type="text"
                        className="input-text"
                        placeholder='Nombre Tarea...'
                        onChange={handleChange}
                        value={nombre}
                        name="nombre"
                    />
                </div>

                <div className='contenedor-input'>
                    <input 
                        type="submit" 
                        className='btn btn-primario btn-block' 
                        value={tareaSeleccionada ? 'Editar Tarea' : 'Agregar Tarea'}
                    />
                </div>
            </form>
            {errorTarea ? <p className='mensaje error'>El nombre de la tarea es obligatorio</p> : null}
        </div>
    );
}
 
export default FormTarea;