import { gql } from "apollo-server-express";

const tiposAuth = gql`

type AuthUser{
    user: Usuario!
    token:
}

input SignUp{
    identificacion: String!
    nombres: String!
    apellidos:String!
    correo:String!
    password:String!
    rol:Enum_RolUsario!
}

input SignIn{
    correo: String!
    password:String!
}

type Mutation{
    registro (input:SignUp): AuthUser!
    ingreso (input:SignIn):AuthUser!
}

`;

export {tiposAuth}
