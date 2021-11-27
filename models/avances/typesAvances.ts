import { gql } from "apollo-server-express";

const typeAvances = gql`
    type Avance{
        descripcion:String!,
        estudiante: Usuario!,
        fechaAvance: Date!,
        proyecto: Proyecto!
    }

    type Query{
        Avance: [Avance]
    }

`;


export { typeAvances };