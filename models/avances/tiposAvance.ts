import { gql } from "apollo-server-express";

const typeAvance = gql`
    type Avance{
        _id: ID!,
        descripcion:String!
        estudiante: Usuario!
        fechaAvance: Date!
        proyecto: Proyecto!
    }



    type Query{
        arrayAvance: [Avance]
        avanceSimple(_id:ID):Avance
    }


    type Mutation{
        crearAvance(
            descripcion:String!
            estudiante: ID!
            fechaAvance: Date
            proyecto: ID!
        ):Proyecto #Corregir return del resolver
    
        editarAvance(
            _id: ID!,
            descripcion:String!
            estudiante: ID!
            fechaAvance: Date!
            proyecto: ID!
        ):Proyecto #Corregir return del resolver

        eliminarAvance(_id:String, correo: String):Proyecto #Corregir return del resolver
    }
`;


export { typeAvance };