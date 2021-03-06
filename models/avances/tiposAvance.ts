import { gql } from "apollo-server-express";

const typeAvance = gql`
    type Avance{
        _id: ID!,
        descripcion:String!
        estudiante: Usuario!
        fechaAvance: Date!
        proyecto: Proyecto!
        observacionesLider:[ObservacionesLider]!
    }

    type ObservacionesLider{
        _id: ID!,
        observacion:String!
        lider: Usuario!
        avance:Avance!
        fechaObservacion:Date!
    }

    type Query{
        arrayAvance(proyecto:ID!): [Avance]
        avanceSimple(_id:ID):Avance
    }


    type Mutation{
        crearAvance(
            descripcion:String!
            estudiante: ID!
            fechaAvance:Date
            proyecto: ID!
        ):Avance #Corregir return del resolver
    
        editarAvance(
            _id: ID!,
            descripcion:String!
            estudiante: ID
            fechaAvance:Date
            proyecto: ID
        ):Avance #Corregir return del resolver

        eliminarAvance(_id:ID!, proyecto:ID):Proyecto #Corregir return del resolver

        crearObservacion(
            avance:ID!
            observacion:String!
            lider:ID!
            fechaObservacion:Date
        ):Avance

        editarObservacion(
            _id: ID!
            observacion:String!
            fechaObservacion:Date
        ):Avance
    }


`;


export { typeAvance };
