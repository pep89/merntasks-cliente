import React, { useContext, useEffect } from 'react'
import Proyecto from './Proyecto';
import ProyectoContext from '../../context/proyectos/ProyectoContext';
import AlertaContext from '../../context/alertas/alertaContext';
import {CSSTransition, TransitionGroup} from 'react-transition-group';


const ListadoProyectos = () => {

    //extraer protectos del state global en proyectoState que nos provee el context proyectoContext
    const proyectosContext = useContext(ProyectoContext);
    const {  mensaje, proyectos, obtenerProyectos } = proyectosContext;

    const alertaContext = useContext(AlertaContext);
    const { alerta, mostrarAlerta } = alertaContext;


    useEffect(() => {
        //SI hay un error
        if(mensaje){
            mostrarAlerta(mensaje.msg, mensaje.categoria);
        }
        obtenerProyectos();
    // eslint-disable-next-line
    }, [mensaje] )

    //revisar si proyectos tiene contenido
    if(proyectos.length === 0) return <h2>No hay proyectos</h2>;



    return (
        <ul className='listado-proyectos'>
            {alerta ? (<div className={`alerta ${alerta.categoria}`} > {alerta.msg} </div>) : null}
            <TransitionGroup>          
                {proyectos.map(proyecto => (
                    <CSSTransition
                        key={proyecto._id}
                        timeout={500}
                        classNames="proyecto"
                    >
                        <Proyecto  proyecto={proyecto} />
                    </CSSTransition>
                ))}                
            </TransitionGroup>
        </ul>
        );
}
 
export default ListadoProyectos;