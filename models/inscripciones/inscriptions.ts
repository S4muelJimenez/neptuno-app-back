import { Schema, model } from 'mongoose';
<<<<<<< HEAD

import { ProjectModel } from '../proyectos/projects';
import { Enum_EstadoInscripcion } from '../enums/enums';
=======
import { ProjectModel } from '../proyectos/projects';
import { Enum_EstadoInscripcion } from '../enums/enums';
import { UserModel } from '../usuarios/users';
>>>>>>> graphql-JV

interface Inscripciones { //Falta el estudiante en el  esquema (ver UML)
    estado: Enum_EstadoInscripcion;
    fechaIngreso: Date;
    fechaEgreso: Date;
    proyecto: Schema.Types.ObjectId;
<<<<<<< HEAD
    
=======
    estudiante: Schema.Types.ObjectId;    
>>>>>>> graphql-JV
}

const InscripcionSchema = new Schema<Inscripciones>({
    estado: {
        type: String,
        enum: Enum_EstadoInscripcion,
        default: Enum_EstadoInscripcion.pendiente,
    },
    fechaIngreso: {
        type: Date,
        required: true,
<<<<<<< HEAD
=======
        unique: true,
>>>>>>> graphql-JV
    },
    fechaEgreso: {
        type: Date,
        default: null
    },

    proyecto: {
        type: Schema.Types.ObjectId,
        ref: ProjectModel,
        required: true,
    },
<<<<<<< HEAD
=======
    estudiante:{
        type: Schema.Types.ObjectId,
        ref: UserModel,
        required: true,
    }

>>>>>>> graphql-JV

})

const InscripcionesModel = model('Inscripciones', InscripcionSchema, 'inscripciones')

export { InscripcionesModel }