import { gql } from 'apollo-server-express';
import { typeAvance } from '../models/avances/tiposAvance';
import { tiposEnums } from '../models/enums/tipos';
import { tiposProyecto } from '../models/proyectos/tipos';
import { tiposUsuario } from '../models/usuarios/tipos';
import { typeInscripcion } from '../models/inscripciones/tiposInscripcion';

const tipoGobales = gql`
    scalar Date
    
       
`;

export const typeDefs  = [tipoGobales, tiposEnums, tiposProyecto, tiposUsuario, typeAvance, typeInscripcion]