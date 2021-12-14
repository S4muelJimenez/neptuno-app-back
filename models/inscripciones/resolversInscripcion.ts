import { ProjectModel } from "../proyectos/projects";
import { InscripcionesModel } from "./inscriptions";


const resolversInscripcion = {
    Query: {
        leerInscripciones: async (parent, args) => {
            if(Object.keys(args).includes('proyecto')){
                const Inscripciones = await InscripcionesModel.find({proyecto:args.proyecto}).populate('estudiante').populate('proyecto');
                return Inscripciones;
            }else{
                const Inscripciones = await InscripcionesModel.find().populate('estudiante').populate('proyecto');
                return Inscripciones;
            }

        },
        leerInscripcion: async (parent, args) => {
            const Inscripcion = await InscripcionesModel.findOne({ _id: args._id }).populate('estudiante').populate('proyecto');
            return Inscripcion;
        },

        leerInscripcionesPendientes: async (parent, args) => {
            if(Object.keys(args).includes('estudiante')){
                const InscripcionesPendientes = await InscripcionesModel.find({estudiante:args.estudiante}).populate('estudiante').populate('proyecto')
                return InscripcionesPendientes
            } else if(Object.keys(args).include('proyecto')){
                const InscripcionesPendientes = await InscripcionesModel.find({proyecto:args.proyecto}).populate('estudiante').populate('proyecto')
                return InscripcionesPendientes
            }else{
                const InscripcionesPendientes = await InscripcionesModel.find({estado:"PENDIENTE"}).populate('estudiante').populate('proyecto')
                return InscripcionesPendientes
            }
        }
    },

    Mutation: {
        crearInscripcion: async (parent, args) => {
            const inscripcionCreada = await InscripcionesModel.create({
                proyecto: args.proyecto,
                estudiante: args.estudiante,
                //estado: args.estado, //El estado solo es modificado por el Lider del proyecto
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

        },

        editarInscripcion: async (parent, args) => {
            const inscripcionEditada = await InscripcionesModel.findByIdAndUpdate(args._id, {
                proyecto: args.proyecto,
                estudiante: args.estudiante,
                estado: args.estado,
                fechaIngreso: args.fechaIngreso,
                fechaEgreso: args.fechaEgreso,
            },{new:true});
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

export { resolversInscripcion };
