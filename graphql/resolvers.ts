import {resolversProyecto} from '../models/proyectos/resolversProyecto';
import {resolversUsuario} from '../models/usuarios/resolversUsuario'
import { resolversAvances } from '../models/avances/resolversAvance';
import { resolversAuth } from '../models/autenticacion/resolversAut';

export const resolvers =[resolversProyecto, resolversUsuario, resolversAvances, resolversAuth]