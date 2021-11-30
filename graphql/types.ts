import { gql } from 'apollo-server-express';
import { typeAvance } from '../models/avances/tiposAvance';
import { tiposEnums } from '../models/enums/tiposEnums';
import { tiposProyecto } from '../models/proyectos/tiposProyecto';
import { tiposUsuario } from '../models/usuarios/tiposUsuario';
import { typeInscripcion } from '../models/inscripciones/tiposInscripcion';

const tipoGobales = gql`
    scalar Date
       
`;

export const typeDefs  = [tipoGobales, tiposEnums, tiposProyecto, tiposUsuario, typeAvance, typeInscripcion]