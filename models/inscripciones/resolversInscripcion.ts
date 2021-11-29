import { UserModel } from "../usuarios/users";
import { ApplicationModel } from "./inscriptions";


const resolversIncripcion = {
    Query: {
        leerInscripciones: async (parent, args) => {
            const Inscripciones = await ApplicationModel.find();
            return Inscripciones;
        },
        leerInscripcion: async (parent, args) => {
            const Inscripcion = await ApplicationModel.findOne({ _id: args._id });
            return Inscripcion;
        }
    },

    Mutation: {
        crearInscripcion: async (parent, args) => {
            const inscripcionCreada = await ApplicationModel.create({
                proyecto: args.proyecto,
                estudiante: args.estudiante,
                estado: args.estado,
                fechaIngreso: args.fechaIngreso,
                fechaEgreso: args.fechaEgreso,
            });
            return inscripcionCreada;

        },

        editarInscripcion: async (parent, args) => {
            const inscripcionEditada = await ApplicationModel.findByIdAndUpdate(args._id, {
                proyecto: args.proyecto,
                estudiante: args.estudiante,
                estado: args.estado,
                fechaIngreso: args.fechaIngreso,
                fechaEgreso: args.fechaEgreso,
            });
            return inscripcionEditada;
        },

        eliminarInscripcion: async (parent, args) => {

            if (Object.keys(args).includes(`_id`)) {
                const inscripcionEliminada = ApplicationModel.findOneAndDelete({ _id: args._id });
                return inscripcionEliminada;
            } else if (Object.keys(args).includes(`proyecto`)) {
                const inscripcionEliminada = ApplicationModel.findOneAndDelete({ proyecto: args.proyecto });
                return inscripcionEliminada;
            }


        },
    },
}

export { resolversIncripcion };
