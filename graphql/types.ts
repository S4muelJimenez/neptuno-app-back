import { gql } from 'apollo-server-express';
import { tiposAvance } from '../models/avances/tipos';
import { tiposEnums } from '../models/enums/tipos';
import { tiposProyecto } from '../models/proyectos/tipos';
import { tiposUsuario } from '../models/usuarios/tipos';


const tipoGobales = gql`
    scalar Date

       
`;

export const typeDefs  = [tipoGobales, tiposEnums, tiposProyecto, tiposUsuario, tiposAvance]