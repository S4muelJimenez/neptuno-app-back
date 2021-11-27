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
        lider: Usuario!
        estado: Enum_EstadoProyecto!
        fase: Enum_FaseProyecto!
        objetivos: [Objetivo]!
        #inscripciones:[Inscripcion]!
        avances: [Avance]!
        
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
            descripcion: String!
            tipo: Enum_TipoObjetivo!
            proyecto: ID!
        ): Proyecto

        editarProyecto(
            _id: ID!
            nombre: String!
            presupuesto: Float
            fechaInicio: Date
            fechaTerminacion: Date
            lider: ID
            estado: Enum_EstadoProyecto
            fase: Enum_FaseProyecto
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
    }

    #Falta incluir los avances y las inscripciones para ser mostradas al buscar un proyecto.
`;

export { tiposProyecto };
