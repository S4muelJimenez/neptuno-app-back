<<<<<<< HEAD
import { InscripcionesModel } from "./inscriptions";


const resolversIncripcion = {
=======
import { ProjectModel } from "../proyectos/projects";
import { InscripcionesModel } from "./inscriptions";


const resolversInscripcion = {
>>>>>>> graphql-JV
    Query: {
        leerInscripciones: async (parent, args) => {
            const Inscripciones = await InscripcionesModel.find();
            return Inscripciones;
        },
        leerInscripcion: async (parent, args) => {
            const Inscripcion = await InscripcionesModel.findOne({ _id: args._id });
            return Inscripcion;
        }
    },

    Mutation: {
        crearInscripcion: async (parent, args) => {
            const inscripcionCreada = await InscripcionesModel.create({
                proyecto: args.proyecto,
                estudiante: args.estudiante,
                //estado: args.estado, //El estado solo es modificado por el Lider del proyecto
<<<<<<< HEAD
                fechaIngreso: args.fechaIngreso,//Aqui deberia ser date.now()
                fechaEgreso: args.fechaEgreso,
            });
            return inscripcionCreada;
=======
                fechaIngreso: Date.now(),//Aqui deberia ser date.now()
                fechaEgreso: args.fechaEgreso,
            });
            const proyecto = await ProjectModel.findById({
                _id:args.proyecto
            }).populate('lider')
            .populate('objetivos')
            .populate('avances')
            .populate('inscripciones')
            return proyecto;
>>>>>>> graphql-JV

        },

        editarInscripcion: async (parent, args) => {
            const inscripcionEditada = await InscripcionesModel.findByIdAndUpdate(args._id, {
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
                const inscripcionEliminada = InscripcionesModel.findOneAndDelete({ _id: args._id });
                return inscripcionEliminada;
            } else if (Object.keys(args).includes(`proyecto`)) {
                const inscripcionEliminada = InscripcionesModel.findOneAndDelete({proyecto: args.proyecto});
                return inscripcionEliminada;
            }
        },
    },
}

<<<<<<< HEAD
export { resolversIncripcion };
=======
export { resolversInscripcion };
>>>>>>> graphql-JV
