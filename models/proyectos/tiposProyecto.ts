import { gql } from "apollo-server-express";

const tiposProyecto = gql`
    type Objetivo {
        _id: ID!
        index: Int!
        descripcion: String!
        tipo: Enum_TipoObjetivo!
        proyecto: Proyecto!
    }

    type Proyecto {
        _id: ID!
        nombre: String!
        presupuesto: Float!
        fechaInicio: Date!
        fechaTerminacion: Date!
        objetivos: [Objetivo!]!
        lider: Usuario!
        fase: Enum_FaseProyecto!
        #inscripciones:[Inscripcion]!
        avances: [Avance]!
        estado: Enum_EstadoProyecto!
        
    }
    type Query {
        leerProyectos: [Proyecto]
        leerProyecto(_id: ID!, nombre: String): Proyecto
        leerObjetivos(_id: ID, proyecto: ID!): [Objetivo]
    }
    type Mutation {
        crearProyecto(
            nombre: String!
            presupuesto: Float!
            fechaInicio: Date!
            fechaTerminacion: Date!
            lider: ID!
        ): Proyecto

        crearObjetivo(
            proyecto: ID!
            tipo: Enum_TipoObjetivo!
            descripcion: String!
        ): Proyecto

        editarProyecto(
            _id: ID!
            nombre: String
            presupuesto: Float
            fechaInicio: Date
            fechaTerminacion: Date
            lider: ID
            fase: Enum_FaseProyecto
            estado: Enum_EstadoProyecto
        ): Proyecto

        editarObjetivos(
            proyecto: ID!
            index:Int!
            descripcion: String
            tipo:Enum_TipoObjetivo
        ):[Objetivo]

        eliminarProyecto(
            _id: ID!                    
        ): Proyecto
    },

    

    #Falta incluir los avances y las inscripciones para ser mostradas al buscar un proyecto.
`;

export { tiposProyecto };
