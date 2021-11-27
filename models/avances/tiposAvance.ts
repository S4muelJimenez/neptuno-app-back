import { gql } from "apollo-server-express";

const typeAvance = gql`
    type Avance{
        _id: ID!,
        descripcion:String!
        estudiante: Usuario!
        fechaAvance: Date!
        proyecto: Proyecto!
    }

    input datosAvance{
        _id: ID!,
        descripcion:String!
        estudiante: ID!
        fechaAvance: Date!
        proyecto: ID!
    }

    type Query{
        Avance(_id:ID): [Avance]
    }


    type Mutation{
        crearAvance(_id:ID!, campos: datosAvance!):Avance
    }

`;


export { typeAvance };