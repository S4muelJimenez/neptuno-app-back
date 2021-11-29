import { gql } from "apollo-server-express";

const tiposAuth = gql`
    type AuthUser {
        user: Usuario!
        token: String!
    }

    #input SignUp {
    #    identificacion: String!
    #    nombres: String!
    #    apellidos: String!
    #    correo: String!
    #    password: String!
    #    rol: Enum_RolUsario!
    #}

    #input SignIn {
    #    correo: String!
    #    password: String!
    #}

    type Mutation {
        Registro(
            identificacion: String!
            nombres: String!
            apellidos: String!
            correo: String!
            password: String!
            rol: Enum_RolUsario!
        
        ): AuthUser!

        Ingreso(
            correo: String!, 
            password: String!

        ): AuthUser!
    }
`;

export { tiposAuth };
