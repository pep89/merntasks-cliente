import React, { useState, useContext, useEffect } from 'react'
import { Link, useNavigate} from 'react-router-dom'
import AlertaContext from '../../context/alertas/alertaContext'
import AuthContext from '../../context/autenticacion/authContext'


const Login = () => {
    
    //extraemos valores del context
    const alertaContext = useContext(AlertaContext);
    const { alerta, mostrarAlerta } = alertaContext;

    const authContext = useContext(AuthContext);
    const {mensaje, autenticado, iniciarSesion } = authContext;

    const history = useNavigate();
    //En caso de que password o usuario no exista
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
        email: '',
        password: ''
    })

    const {email, password} = usuario;

    const onChange = (e) => {
        setUsuario({
            ...usuario,
            [e.target.name] : e.target.value
        })
    }


    const onSubmit = e => {
        e.preventDefault();

        //Validar que no hay campos vacios
        if(email.trim() === '' || password.trim() === ''){
            mostrarAlerta('Todos los campos son obligatorios', 'alerta-error');
        }

        //Pasarlo al Action
        iniciarSesion( {email, password});
    }

    return ( 

        <div className='form-usuario'>
            { alerta ? 
                (<div className={`alerta ${alerta.categoria}`} >
                    {alerta.msg}
                </div>) : null 
            }
            <div className='contenedor-form sombra-dark'>
                <h1>Iniciar Sesion</h1>
                <form onSubmit={onSubmit}>
                    <div className='campo-form'>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder='Tu Email'
                            value={email}
                            onChange={onChange}
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
                            autoComplete='off'
                        />
                    </div>

                    <div className='campo-form'>
                        <input type="submit" className='btn btn-primario btn-block' value="Iniciar Sesión"/>
                    </div>
                </form>

                <Link to={'/nueva-cuenta'} className='enlace-cuenta'> Obtener Cuenta</Link>
            </div>
        </div>
     );
}
 
export default Login;