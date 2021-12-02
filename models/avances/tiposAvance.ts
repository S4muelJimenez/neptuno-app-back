import { gql } from "apollo-server-express";

const typeAvance = gql`
    type Avance{
        _id: ID!,
        descripcion:String!
        estudiante: Usuario!
        fechaAvance: Date!
        proyecto: Proyecto!
    }


<<<<<<< HEAD
=======

>>>>>>> graphql-JV
    type Query{
        arrayAvance: [Avance]
        avanceSimple(_id:ID):Avance
    }


    type Mutation{
        crearAvance(
            descripcion:String!
            estudiante: ID!
<<<<<<< HEAD
            fechaAvance: Date!
            proyecto: ID!
        ):Avance
=======
            fechaAvance: Date
            proyecto: ID!
        ):Proyecto #Corregir return del resolver
>>>>>>> graphql-JV
    
        editarAvance(
            _id: ID!,
            descripcion:String!
            estudiante: ID!
            fechaAvance: Date!
            proyecto: ID!
<<<<<<< HEAD
        ):Avance

        eliminarAvance(_id:String, correo: String):Avance
=======
        ):Proyecto #Corregir return del resolver

        eliminarAvance(_id:String, correo: String):Proyecto #Corregir return del resolver
>>>>>>> graphql-JV
    }
`;


export { typeAvance };