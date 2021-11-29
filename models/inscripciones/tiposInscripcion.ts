import { gql } from "apollo-server-express";

const typeInscripcion = gql`
    type Inscripcion{
        _id: ID!,
        proyecto: Proyecto!
        estado: Enum_EstadoProyecto!
        fechaIngreso: Date!
        fechaEgreso: Date!      
    }


    type Query{
        leerInscripciones: [Inscripcion]
        leerInscripcion(_id:ID):Inscripcion
    }


    type Mutation{
        crearInscripcion(
            proyecto: Proyecto!
            estado: Enum_EstadoProyecto!
            fechaIngreso: Date!
            fechaEgreso: Date!   
        ):Inscripcion
    
        editarInscripcion(
            _id: ID!,
            proyecto: Proyecto!
            estado: Enum_EstadoProyecto!
            fechaIngreso: Date!
            fechaEgreso: Date!  
        ):Inscripcion

        editarInscripcion(_id:String, proyecto: Proyecto):Inscripcion
    }
`;


export { typeInscripcion };