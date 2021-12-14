import { gql } from "apollo-server-express";

const tiposInscripcion = gql`
    type Inscripcion{#Falta el campo estudiante
        _id: ID!
        proyecto: Proyecto!
        estudiante: Usuario!
        fechaIngreso: Date!
        fechaEgreso: Date!
        estado: Enum_EstadoInscripcion!
    }


    type Query{
        leerInscripciones(proyecto: ID): [Inscripcion]
        leerInscripcion(_id:ID!):Inscripcion
        leerInscripcionesPendientes(proyecto: ID, estudiante: ID): [Inscripcion]
    }


    type Mutation{
        crearInscripcion(
            proyecto: ID!
            #estado: Enum_EstadoInscripcion! #El estado por defecto debe ser "PENDIENTE". El Estudiante que crea la inscripcion no debe poder aprobar el estado
            fechaIngreso: Date
            fechaEgreso: Date
            estudiante: ID!
        ):Inscripcion
    
        editarInscripcion(
            _id: ID!,
            proyecto: ID
            estudiante: ID
            estado: Enum_EstadoInscripcion
            fechaIngreso: Date
            fechaEgreso: Date
        ):Inscripcion

        eliminarInscripcion(_id:String, proyecto: ID!):Proyecto
    }
`;


export { tiposInscripcion };
