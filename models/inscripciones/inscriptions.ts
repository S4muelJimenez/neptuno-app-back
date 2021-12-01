import { Schema, model } from 'mongoose';

import { ProjectModel } from '../proyectos/projects';
import { Enum_EstadoInscripcion } from '../enums/enums';

interface Inscripciones { //Falta el estudiante en el  esquema (ver UML)
    estado: Enum_EstadoInscripcion;
    fechaIngreso: Date;
    fechaEgreso: Date;
    proyecto: Schema.Types.ObjectId;
    
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

})

const InscripcionesModel = model('Inscripciones', InscripcionSchema, 'inscripciones')

export { InscripcionesModel }