import { 
    TAREAS_PROYECTO,
    AGREGAR_TAREA,
    VALIDAR_TAREA,
    ELIMINAR_TAREA,
    //ESTADO_TAREA,
    SELECCIONAR_TAREA,
    ACTUALIZAR_TAREA,
    DESELECCIONAR_TAREA
} from '../../types/types'

//export default (state, action) => {
const TareaReducer = (state, action) => {
    switch(action.type){
        case TAREAS_PROYECTO:
            return{
                ...state,
                //tareasProyecto: state.tareasProyecto.filter(tarea => tarea.proyecto === action.payload ) //(El filtro lo realizamos con la consulta a la BBDD)
                tareasProyecto: action.payload //El payload es el resultado de la consulta a la BBDD
            }
        case AGREGAR_TAREA:
            return{
                ...state,
                //tareas: [ action.payload, ...state.tareas ],
                tareasProyecto: [action.payload, ...state.tareasProyecto],
                errorTarea: false //validamos la tarea
            }
        case VALIDAR_TAREA:
            return{
                ...state,
                errorTarea: true
            }
        case ELIMINAR_TAREA:
            return{
                ...state,
                tareasProyecto : state.tareasProyecto
                .filter( tarea => tarea._id !== action.payload )
            }
        case ACTUALIZAR_TAREA:
            return{
                ...state,
                tareasProyecto : state.tareasProyecto
                .map( tarea => tarea._id === action.payload._id ?
                   action.payload  : tarea),
                //tareaSeleccionada: null //Esto está perfectamente bien pero crearemos otro case para especificamente limpiar la tarea seleccionada
            }
        case SELECCIONAR_TAREA:
            return{
                ...state,
                tareaSeleccionada: action.payload
            }
        case DESELECCIONAR_TAREA:
            return {
                ...state,
                tareaSeleccionada: null
            }
        default:
            return state;
    }
}

export default TareaReducer;