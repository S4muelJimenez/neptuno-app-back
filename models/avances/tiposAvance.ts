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
        Avance(_id:ID): [Avance]
    }

`;


export { typeAvance };