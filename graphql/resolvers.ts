import {resolversProyecto} from '../models/proyectos/resolversProyecto';
import {resolversUsuario} from '../models/usuarios/resolversUsuario'
import { resolversAvances } from '../models/avances/resolversAvance';
import { resolversInscripcion } from '../models/inscripciones/resolversInscripcion';



export const resolvers =[resolversProyecto, resolversUsuario, resolversAvances, resolversInscripcion]
