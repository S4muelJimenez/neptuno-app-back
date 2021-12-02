<<<<<<< HEAD
import { UserModel } from "../usuarios/users";
import { ProgressModel } from "./progress";

=======
import { ProjectModel } from "../proyectos/projects";
import { UserModel } from "../usuarios/users";
import { ProgressModel } from "./progress";


>>>>>>> graphql-JV
const resolversAvances = {
    Query: {
        arrayAvance: async (parent, args) => {
            const Avance = await ProgressModel.find();
            return Avance;
        },
        avanceSimple: async (parent, args) => {
            const avanceSolo = await ProgressModel.findOne({ _id: args._id });
            return avanceSolo;
        }
    },

    Mutation: {
        crearAvance: async (parent, args) => {
<<<<<<< HEAD
            const avanceCreado = await ProgressModel.create({
                descripcion: args.descripcion,
                estudiante: args.estudiante,
                fechaAvance: args.fechaAvance,
                proyecto: args.proyecto,
            });
            return avanceCreado;
=======
            
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
>>>>>>> graphql-JV

        },

        editarAvance: async (parent, args) => {
            const avanceEditado = await ProgressModel.findByIdAndUpdate(args._id, {
                descripcion: args.descripcion!,
                estudiante: args.estudiante,
                fechaAvance: args.fechaAvance,
                proyecto: args.proyecto,
            });
            return avanceEditado;
        },

        eliminarAvance: async (parent, args) => {

            if (Object.keys(args).includes(`_id`)) {
                const avanceEliminado = ProgressModel.findOneAndDelete({ _id: args._id });
                return avanceEliminado;
            } else if (Object.keys(args).includes(`correo`)) {
                const avanceEliminado = ProgressModel.findOneAndDelete({ correo: args.correo });
                return avanceEliminado;
            }


        },
    },
}

export { resolversAvances };
