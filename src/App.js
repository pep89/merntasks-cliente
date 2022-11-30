/* Importamos ProyextoState para hacer un Wrapper que envuelva todos los
componentes para que estos se puedan subscribir al provider de ProyectoState. 
*/
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/auth/Login';
import NuevaCuenta from './components/auth/NuevaCuenta';
import Proyectos from './components/projects/Proyectos';
import ProyectoState from './context/proyectos/ProyectoState';
import TareaState from './context/tareas/TareaState';
import AlertaState from './context/alertas/alertaState';
import AuthState from './context/autenticacion/authState';

import tokenAuth from './config/tokenAuth';
import RutaPrivada from './components/rutas/RutaPrivada';

//Revisar si tenemos un token
const token = localStorage.getItem('token');
if(token){
  tokenAuth(token);
}



function App() {

  //console.log(process.env.REACT_APP_BACKEND_URL);


  return (
    <ProyectoState>
      <TareaState>
        <AlertaState>
          <AuthState>
            <Router>
              {/* <Routes>
                <Route exact path="/" element={<Login />} />
                <Route exact path="/nueva-cuenta" element={<NuevaCuenta />} />
                <Route exact path="/proyectos" element={<RutaPrivada />} >
                  <Route exact path='/proyectos' element={<Proyectos/>}/>
                </Route>
              </Routes> */}
              <Routes> 
                <Route path='/' element={<Login />} /> 
                <Route path='/nueva-cuenta' element={<NuevaCuenta />} /> 
                <Route element={<RutaPrivada />}> 
                  <Route path='/proyectos' element={<Proyectos />} /> 
                </Route> 
              </Routes> 
            </Router>
          </AuthState>
        </AlertaState>
      </TareaState>
    </ProyectoState>
  );
}

export default App;
