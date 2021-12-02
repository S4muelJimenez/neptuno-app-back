import { gql } from 'apollo-server-express';
import { tiposAuth } from '../models/autenticacion/tiposAuth';
import { typeAvance } from '../models/avances/tiposAvance';
import { tiposEnums } from '../models/enums/tiposEnums';
import { tiposProyecto } from '../models/proyectos/tiposProyecto';
import { tiposUsuario } from '../models/usuarios/tiposUsuario';
import { tiposInscripcion} from '../models/inscripciones/tiposInscripcion';

const tipoGobales = gql`
    scalar Date       
`;

export const typeDefs  = [tipoGobales, tiposEnums, tiposProyecto, tiposUsuario, typeAvance, tiposInscripcion, tiposAuth]
