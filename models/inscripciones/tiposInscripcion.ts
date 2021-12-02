import { gql } from "apollo-server-express";

<<<<<<< HEAD
const typeInscripcion = gql`
    type Inscripcion{#Falta el campo estudiante
        _id: ID!,
        proyecto: Proyecto!
        estado: Enum_EstadoInscripcion!
        fechaIngreso: Date!
        fechaEgreso: Date!      
=======
const tiposInscripcion = gql`
    type Inscripcion{#Falta el campo estudiante
        _id: ID!
        proyecto: Proyecto!
        estudiante: Usuario!
        fechaIngreso: Date!
        fechaEgreso: Date!
        estado: Enum_EstadoInscripcion!
>>>>>>> graphql-JV
    }


    type Query{
        leerInscripciones: [Inscripcion]
<<<<<<< HEAD
        leerInscripcion(_id:ID):Inscripcion
=======
        leerInscripcion(_id:ID!):Inscripcion
>>>>>>> graphql-JV
    }


    type Mutation{
        crearInscripcion(
            proyecto: ID!
            #estado: Enum_EstadoInscripcion! #El estado por defecto debe ser "PENDIENTE". El Estudiante que crea la inscripcion no debe poder aprobar el estado
<<<<<<< HEAD
            fechaIngreso: Date!
            fechaEgreso: Date!   
        ):Inscripcion
=======
            fechaIngreso: Date
            fechaEgreso: Date
            estudiante: ID!
        ):Proyecto
>>>>>>> graphql-JV
    
        editarInscripcion(
            _id: ID!,
            proyecto: ID
<<<<<<< HEAD
            estado: Enum_EstadoInscripcion
            fechaIngreso: Date
            fechaEgreso: Date
        ):Inscripcion

        eliminarInscripcion(_id:String, proyecto: ID!):Inscripcion
=======
            estudiante: ID
            estado: Enum_EstadoInscripcion
            fechaIngreso: Date
            fechaEgreso: Date
        ):Proyecto

        eliminarInscripcion(_id:String, proyecto: ID!):Proyecto
>>>>>>> graphql-JV
    }
`;


<<<<<<< HEAD
export { typeInscripcion };
=======
export { tiposInscripcion };
>>>>>>> graphql-JV
