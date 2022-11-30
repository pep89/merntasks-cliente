/* Creamos el context que nos servirá como provider de todos los estados y funciones subscritos a este context que queremos compartir entre componentes.
 1:Lo importaremos en ProyectosState para utilizarlo como provider y pasarle dichos estados y funciones a los que se subscribiran los componentes 
 2:Lo impotaremos en los componentes que quieran utilizar dichos estados (componentes subscritos) utilizando el hook useContext.*/
import {createContext} from 'react';

const ProyectoContext = createContext();

export default ProyectoContext;