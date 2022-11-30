import React, {useState, useContext} from 'react'
import ProyectoContext from '../../context/proyectos/ProyectoContext';

const NuevoProyecto = () => {

    //Obtener el state y los metodos de ProyectoState mediante ProyectoContext
    const proyectosContext = useContext(ProyectoContext);
    const { 
        formulario,
        errorFormulario, 
        mostrarFormulario,
        mostrarError,
        agregarProyecto 
    } = proyectosContext;

    //state para proyecto
    const [proyecto, setProyecto] = useState({ nombre: '' });
    const {nombre} = proyecto;

    const onChangeProyecto = e => {
        setProyecto({
            ...proyecto,
            [e.target.name] : e.target.value
        })
    }

    const onSubmitProyecto = e => {
        e.preventDefault();

        //validar Proyecto
        if(nombre.trim() === '') { 
            mostrarError(true);
            return; 
        }
        mostrarError(false);

        //Agregar al State
        agregarProyecto(proyecto)
        //Reiniciar el Form
        setProyecto({ nombre: '' });
        
    }
    return (
        <>
            <button
                type='button'
                className='btn btn-block btn-primario' 
                onClick={() => mostrarFormulario(formulario)}
            >  {!formulario ? 'Nuevo Proyecto' : 'Cerrar Formulario'} </button>
            {
                formulario 
                ? (
                    <form
                        className='formulario-nuevo-proyecto'
                        onSubmit={onSubmitProyecto}
                    >
                        <input 
                            type="text"
                            className="input-text"
                            placeholder="Nombre Proyecto"
                            name="nombre"
                            value={nombre}
                            onChange={onChangeProyecto}
                        />

                        <input type="submit" className='btn btn-primario btn-block'  value="Crear Proyecto" />
                    </form>
                )
                : ( null)
            }
            {errorFormulario ? 
                <p className='mensaje error' >El nombre del proyecto es obligatorio</p>
            :
                null
            }
        </>
     );
}
 
export default NuevoProyecto;