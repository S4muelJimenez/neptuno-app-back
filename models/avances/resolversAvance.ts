import { ProjectModel } from "../proyectos/projects";
import { UserModel } from "../usuarios/users";
import { LeaderObservationModel } from "./leaderObservation";
import { ProgressModel } from "./progress";


const resolversAvances = {
    Query: {
        arrayAvance: async (parent, args) => {
            const Avance = await ProgressModel.find().populate("estudiante").populate("proyecto").populate('observacionesLider');
            return Avance;
        },
        avanceSimple: async (parent, args) => {
            const avanceSolo = await ProgressModel.findOne({ _id: args._id }).populate("estudiante").populate("proyecto").populate('observacionesLider');
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
            
            return avanceCreado.populate('observacionesLider');

        },

        editarAvance: async (parent, args) => {
            
            const avanceEditado= await ProgressModel.findByIdAndUpdate(args._id, {
                descripcion: args.descripcion,
                estudiante: args.estudiante,
                // fechaAvance: Date.now(),
                proyecto: args.proyecto,
            },
            { new: true });
            return avanceEditado.populate('observacionesLider');
        },

        eliminarAvance: async (parent, args) => {
                await LeaderObservationModel.deleteMany({
                    avance: args._id,
                });
                const avanceEliminado = await ProgressModel.findOneAndDelete({ _id: args._id });
                return avanceEliminado;
            
        },

        crearObservacion: async (parent, args) => {
            const avanceBuscado = await ProgressModel.findOne({avance: args.avance}).populate("observacionesLider").populate("estudiante").populate("proyecto");
            await LeaderObservationModel.create({
                avance: args.avance,
                lider: args.lider,
                observacion: args.observacion,
                fechaObservacion: Date.now(),
                
            })
            return avanceBuscado
        },

        editarObservacion: async (parent, args) => {
            const avanceBuscado = await ProgressModel.findOne({avance: args.avance}).populate("observacionesLider")
            await LeaderObservationModel.findByIdAndUpdate(args._id,
                {
                    observacion: args.observacion,
                    fechaObservacion: Date.now(),
                },
                { new: true })
            return avanceBuscado
        }
    },
}

export { resolversAvances };
