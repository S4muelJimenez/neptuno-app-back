import { gql } from "apollo-server-express";

const typeInscripcion = gql`
    type Inscripcion{#Falta el campo estudiante
        _id: ID!,
        proyecto: Proyecto!
        estado: Enum_EstadoInscripcion!
        fechaIngreso: Date!
        fechaEgreso: Date!      
    }


    type Query{
        leerInscripciones: [Inscripcion]
        leerInscripcion(_id:ID):Inscripcion
    }


    type Mutation{
        crearInscripcion(
            proyecto: ID!
            #estado: Enum_EstadoInscripcion! #El estado por defecto debe ser "PENDIENTE". El Estudiante que crea la inscripcion no debe poder aprobar el estado
            fechaIngreso: Date!
            fechaEgreso: Date!   
        ):Inscripcion
    
        editarInscripcion(
            _id: ID!,
            proyecto: ID
            estado: Enum_EstadoInscripcion
            fechaIngreso: Date
            fechaEgreso: Date
        ):Inscripcion

        eliminarInscripcion(_id:String, proyecto: ID!):Inscripcion
    }
`;


export { typeInscripcion };