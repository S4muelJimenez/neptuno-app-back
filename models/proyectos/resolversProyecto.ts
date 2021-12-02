import { ProjectModel } from "./projects";
import { ObjectiveModel } from "./objectives";

const resolversProyecto = {
    Query: {
        leerProyectos: async (parent, args) => {
            const proyectos = await ProjectModel.find()
                .populate("objetivos")
<<<<<<< HEAD
=======
                .populate('lider')
>>>>>>> graphql-JV
                .populate("avances");
            return proyectos;
        },

        leerProyecto: async (parent, args) => {
            if (Object.keys(args).includes("nombre")) {
                const proyectoBuscado = await ProjectModel.findOne({
                    nombre: args.nombre,
                })
                    .populate("lider")
                    .populate("objetivos");
                return proyectoBuscado;
            } else if (Object.keys(args).includes("_id")) {
                const proyectoBuscado = await ProjectModel.findOne({
                    _id: args._id,
                })
                    .populate("lider")
                    .populate("objetivos");
                return proyectoBuscado;
            }
        },

        leerObjetivos: async (parent, args) => {
            if (Object.keys(args).includes("proyecto")) {
                const objetivos = await ObjectiveModel.find({
                    proyecto: args.proyecto,
                });
<<<<<<< HEAD
                objetivos.forEach((objetivo, indice)=>{
                    objetivo['index']=indice
                })                ;
                return objetivos;
            } else if (Object.keys(args).includes("_id")) {
                const objetivos = await ObjectiveModel.findOne({ _id: args._id });
=======
                /* objetivos.forEach((objetivo, indice) => {
                    objetivo["index"] = indice;
                }); */
                return objetivos;
            } else if (Object.keys(args).includes("_id")) {
                const objetivos = await ObjectiveModel.findOne({
                    _id: args._id,
                });
>>>>>>> graphql-JV
                return objetivos;
            }
        },
    },

    Mutation: {
        crearProyecto: async (parent, args) => {
            const proyecto = await ProjectModel.create({
                nombre: args.nombre,
                presupuesto: args.presupuesto,
                fechaInicio: args.fechaInicio,
                fechaTerminacion: args.fechaTerminacion,
<<<<<<< HEAD
                lider: args.usuario,
            });
            if (Object.keys(args).includes("estado")){
                proyecto.estado=args.estado
            }
            if (Object.keys(args).includes("fase")){
                proyecto.fase=args.fase
            }
            return proyecto;
        },
        crearObjetivo: async (parent, args) => {
            const objetivo = await ObjectiveModel.create({
=======
                lider: args.lider,
            });
            if (Object.keys(args).includes("estado")) {
                proyecto.estado = args.estado;
            }
            if (Object.keys(args).includes("fase")) {
                proyecto.fase = args.fase;
            }
            return proyecto.populate("lider");
        },
        crearObjetivo: async (parent, args) => {
            const objetivo =await ObjectiveModel.create({
>>>>>>> graphql-JV
                descripcion: args.descripcion,
                tipo: args.tipo,
                proyecto: args.proyecto,
            });
<<<<<<< HEAD
            return objetivo;
        },

        editarProyecto: async (parent, args) => {
            const proyecto = await ProjectModel.findByIdAndUpdate(
                { _id: args._id },
                {
                    nombre: args.nombre,
                    presupuesto: args.presupuesto,
                    fechaInicio: args.fechaInicio,
                    fechaTerminacion: args.fechaTerminacion,
                    estado: args.estado,
                    fase: args.fase,
                    lider: args.lider,
                },
                { new: true }
            );
=======
            const proyecto = await ProjectModel.findById({
                _id: args.proyecto,
            }).populate('lider').populate('objetivos')
            return  proyecto
        },

        editarProyecto: async (parent, args) => {
            if (Object.keys(args).includes(`_id`)) {
                const proyecto = await ProjectModel.findByIdAndUpdate(
                    { _id: args._id },
                    {
                        nombre: args.nombre,
                        presupuesto: args.presupuesto,
                        fechaInicio: args.fechaInicio,
                        fechaTerminacion: args.fechaTerminacion,
                        estado: args.estado,
                        fase: args.fase,
                        lider: args.lider,
                    },
                    { new: true }
                );
                return proyecto.populate("lider");
            } else if (Object.keys(args).includes("nombre")) {
                const proyecto = await ProjectModel.findByIdAndUpdate(
                    { _id: args._id },
                    {
                        nombre: args.nombre,
                        presupuesto: args.presupuesto,
                        fechaInicio: args.fechaInicio,
                        fechaTerminacion: args.fechaTerminacion,
                        estado: args.estado,
                        fase: args.fase,
                        lider: args.lider,
                    },
                    { new: true }
                );
                return proyecto.populate("lider");
            }
>>>>>>> graphql-JV
        },

        editarObjetivos: async (parent, args) => {
            const objetivos = await ObjectiveModel.find({
                proyecto: args.proyecto,
                tipo: args.tipo,
            });
            await objetivos[args.index].update(
                {
                    descripcion: args.descripcion,
                    tipo: args.tipo,
                },
                { new: true }
            );
            return objetivos;
        },

        eliminarProyecto: async (parent, args) => {
            const objetivos = await ObjectiveModel.deleteMany({
                proyecto: args._id,
            });
            const proyecto = await ProjectModel.findOneAndRemove({
                _id: args._id,
            });
            return proyecto;
        },
    },
};

export { resolversProyecto };
