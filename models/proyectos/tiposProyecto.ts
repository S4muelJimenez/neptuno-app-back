import { gql } from "apollo-server-express";

const tiposProyecto = gql`
    type Objetivo {
        _id: ID!
        #index: Int!
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
        inscripciones: [Inscripcion]
        avances: [Avance]
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

        editarProyecto(_id: ID!, nombre: String): Proyecto

        editarObjetivos(
            proyecto: ID!
            index: Int!
            descripcion: String
            tipo: Enum_TipoObjetivo
        ): Proyecto

        eliminarProyecto(_id: ID!): Proyecto

        aprobarProyecto(
            _id: ID!
            nombre: String
            estado: Enum_EstadoProyecto!
        ): Proyecto

        actualizarFaseProyecto(
            _id: ID!
            nombre: String
            fase: Enum_FaseProyecto
        ): Proyecto
    }

    #Falta incluir los avances y las inscripciones para ser mostradas al buscar un proyecto.
`;

export { tiposProyecto };
