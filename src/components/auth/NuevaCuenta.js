import React, { useContext, useState, useEffect } from 'react'
import { Link, useNavigate} from 'react-router-dom'
import AlertaContext from '../../context/alertas/alertaContext'
import AuthContext from '../../context/autenticacion/authContext'

//Como estamos utilizando React.Router.Dom tenemos acceso a props.history
const NuevaCuenta = () => {

    //extraemos valores del context
    const alertaContext = useContext(AlertaContext);
    const { alerta, mostrarAlerta } = alertaContext;

    const authContext = useContext(AuthContext);
    const {mensaje, autenticado, registrarUsuario } = authContext;

    const history = useNavigate();
    //En caso de --> usuario autenticado o registrado o registro duplicado
    useEffect( () => {
        if(autenticado){
            
            history('/proyectos');
          //props.history.push('/proyectos'); //Dirige a la pagina proyectos
        }

        if(mensaje){
            mostrarAlerta(mensaje.msg, mensaje.categoria );
        }
        
        // eslint-disable-next-line
    }, [mensaje, autenticado])
    
    //State para iniciar sesion
    const [usuario, setUsuario] = useState({
        nombre: '',
        email: '',
        password: '',
        confirmar: ''
    })

    const {nombre, email, password, confirmar} = usuario;

    const onChange = (e) => {
        setUsuario({
            ...usuario,
            [e.target.name] : e.target.value
        })
    }


    const onSubmit = e => {
        e.preventDefault();

        //Validar que no hay campos vacios
        if(nombre.trim() === '' || 
            email.trim() === '' || 
            password.trim() === '' ||
            confirmar.trim() === ''
        ){
            mostrarAlerta('Todos los campos son obligatorios', 'alerta-error' );
            return;
        }

        //Password minimo de 6 caracteres
        if(password.length < 6){
            mostrarAlerta('El password mínimo de 6 carácteres', 'alerta-error' );
            return;
        }

        //Password i confirmar deben ser iguales
        if(password !== confirmar){
            mostrarAlerta('Los passwords no son iguales', 'alerta-error' );
            return;
        }
        
        //Pasarlo al Action
        registrarUsuario({ 
            nombre, email, password
        })
    }

    return ( 

        <div className='form-usuario'>
            { alerta ? 
                (<div className={`alerta ${alerta.categoria}`} >
                    {alerta.msg}
                </div>) : null 
            }
            <div className='contenedor-form sombra-dark'>
                <h1>Crea una Cuenta</h1>
                
                <form onSubmit={onSubmit}>
                    <div className='campo-form'>
                        <label htmlFor="nombre">Nombre</label>
                        <input
                            type="text"
                            id="nombre"
                            name="nombre"
                            placeholder='Tu nombre'
                            value={nombre}
                            onChange={onChange}
                        />
                    </div>

                    <div className='campo-form'>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder='Tu Email'
                            value={email}
                            onChange={onChange}
                            autoComplete="on"
                        />
                    </div>
                    
                    <div className='campo-form'>
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder='Tu password'
                            value={password}
                            onChange={onChange}
                            autoComplete="current-password"
                        />
                    </div>
                    <div className='campo-form'>
                        <label htmlFor="confirmar">Confirmar Password</label>
                        <input
                            type="password"
                            id="confirmar"
                            name="confirmar"
                            placeholder='Repite tu password'
                            value={confirmar}
                            onChange={onChange}
                            autoComplete="new-password"
                        />
                    </div>

                    <div className='campo-form'>
                        <input type="submit" className='btn btn-primario btn-block' value="Registrarme"/>
                    </div>
                </form>

                <Link to={'/'} className='enlace-cuenta'> Volver a Iniciar Sesion</Link>
            </div>
        </div>
     );
}
 
export default NuevaCuenta;