import {resolversProyecto} from '../models/proyectos/resolversProyecto';
import {resolversUsuario} from '../models/usuarios/resolversUsuario'
import { resolversAvances } from '../models/avances/resolversAvance';
<<<<<<< HEAD
import { resolversIncripcion } from '../models/inscripciones/resolversInscripcion';



export const resolvers =[resolversProyecto, resolversUsuario, resolversAvances, resolversIncripcion]
=======
import { resolversInscripcion } from '../models/inscripciones/resolversInscripcion';
import { resolversAuth } from '../models/autenticacion/resolversAuth';

export const resolvers =[resolversProyecto, resolversUsuario, resolversAvances, resolversInscripcion, resolversAuth]
>>>>>>> graphql-JV
