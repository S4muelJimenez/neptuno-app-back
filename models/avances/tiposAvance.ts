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
            fechaAvance: Date!
            proyecto: ID!
        ):Proyecto
    
        editarAvance(
            _id: ID!,
            descripcion:String!
            estudiante: ID!
            fechaAvance: Date!
            proyecto: ID!
        ):Avance

        eliminarAvance(_id:String, correo: String):Avance
    }
`;


export { typeAvance };