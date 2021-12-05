import { ProjectModel } from "../proyectos/projects";
import { UserModel } from "../usuarios/users";
import { LeaderObservationModel } from "./leaderObservation";
import { ProgressModel } from "./progress";


const resolversAvances = {
    Query: {
        arrayAvance: async (parent, args) => {
            const Avance = await ProgressModel.find().populate("estudiante").populate("proyecto");
            return Avance;
        },
        avanceSimple: async (parent, args) => {
            const avanceSolo = await ProgressModel.findOne({ _id: args._id }).populate("estudiante").populate("proyecto");
            return avanceSolo;
        }
    },

    Mutation: {
        crearAvance: async (parent, args) => {
            
            const avanceCreado = await ProgressModel.create({
                descripcion: args.descripcion,
                estudiante: args.estudiante,
                fechaAvance: Date.now(),
                proyecto: args.proyecto,
            });

            const proyectoTraido = await ProjectModel.findById({
                _id: args.proyecto
            }).populate("avances")
            .populate("lider")
            .populate("objetivos");
            
            return proyectoTraido;

        },

        editarAvance: async (parent, args) => {
            const proyectoTraido = await ProjectModel.findById(args.proyecto).populate("lider").populate("objetivos").populate("avances").populate("inscripciones")
            await ProgressModel.findByIdAndUpdate(args._id, {
                descripcion: args.descripcion,
                estudiante: args.estudiante,
                fechaAvance: args.fechaAvance,
                proyecto: args.proyecto,
            });
            return proyectoTraido;
        },

        eliminarAvance: async (parent, args) => {

            if (Object.keys(args).includes(`_id`)) {
                const avanceEliminado = await ProgressModel.findOneAndDelete({ _id: args._id });
                return avanceEliminado;
            } else if (Object.keys(args).includes(`correo`)) {
                const avanceEliminado = await ProgressModel.findOneAndDelete({ correo: args.correo });
                return avanceEliminado;
            }


        },

        crearObservacion: async (parent, args) => {
            const avanceBuscado = await ProgressModel.findOne({avance: args.avance}).populate("observacionesLider").populate("estudiante").populate("proyecto");
            await LeaderObservationModel.create({
                avance: args.avance,
                lider: args.lider,
                observacion: args.observacion,
            })
            return avanceBuscado
        }
    },
}

export { resolversAvances };
