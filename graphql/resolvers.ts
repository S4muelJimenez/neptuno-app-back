import {resolversProyecto} from '../models/proyectos/resolvers';
import {resolversUsuario} from '../models/usuarios/resolvers'
import { resolversAvances } from '../models/avances/resolversAvance';
import { resolversIncripcion } from '../models/inscripciones/resolversInscripcion';



export const resolvers =[resolversProyecto, resolversUsuario, resolversAvances, resolversIncripcion]