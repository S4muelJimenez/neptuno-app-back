import {gql} from "apollo-server-express";

const tiposAvance = gql`

    type Avance{
        proyecto: Proyecto!
        estudiante: Usuario!
        fechaAvance: Date!
        descripcion: String!
        #observacionesLider: [ObservacionesLider]
    }
`

export {tiposAvance}