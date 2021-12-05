import { gql } from "apollo-server-express";

const tiposUsuario = gql`
    type Usuario { #Se definen los esquemas gql para cada documento nuevamente.
        _id: ID! #El signo de exclamacion (!) indica que el campo es obligatorio.
        identificacion: String!
        nombres: String!
        apellidos: String!
        correo: String!
        rol: Enum_RolUsario!
        estado: Enum_EstadoUsuario!
    }

    type Query { #Se define una consulta, es decir, un READ
        leerUsuarios: [Usuario] #La sintaxis es <resolver>:<Dato deseado>. El resolver trae los datos segun como se especifican. En este caso crea un array con datos tipo Usuario (los campos deseados se especifican en Apollo) definido mas arriba
        leerUsuario(_id: ID, correo: String, identificacion: String): Usuario
        leerEstudiantes: [Usuario]
    }

    type Mutation {
        crearUsuario(
            identificacion: String!
            nombres: String!
            apellidos: String!
            correo: String!
            rol: Enum_RolUsario! #El campo _id no es obligatorio al crear porque lo asigna mongoDB.
        ): #Los campos estado, rol e _id tienen valores por defecto. No son obligatorios
        Usuario

        eliminarUsuario(
            _id: ID!
            identificacion: String
            correo: String
        ): Usuario

        editarUsuario(
            _id: ID!
            identificacion: String!
            nombres: String!
            apellidos: String!
            password: String!
            correo: String!
            rol: Enum_RolUsario!
            estado: Enum_EstadoUsuario!
        ): Usuario

        editarPerfil(
            identificacion: String
            nombres: String
            apellidos: String
            correo: String
            password: String
        ): Usuario

        editarEstadoUsuario(_id: ID!, estado: Enum_EstadoUsuario): Usuario

        editarEstadoEstudiante(_id: ID!, estado: Enum_EstadoUsuario): Usuario
    }
`;

export { tiposUsuario };
