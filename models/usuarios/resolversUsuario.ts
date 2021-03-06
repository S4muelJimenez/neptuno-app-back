import bcrypt from "bcryptjs";
import { Enum_RolUsario } from "../enums/enums";
import { UserModel } from "./users";

const resolversUsuario = {
    Query: {
        leerUsuarios: async (parent, args, context) => {
            if (context.userData.rol === "ADMINISTRADOR") {
                const usuarios = await UserModel.find();
                return usuarios;
            } else if (context.userData.rol === "LIDER") {
                const usuarios = await UserModel.find({ rol: Enum_RolUsario.estudiante })
                return usuarios;
            }

        },
        leerUsuario: async (parent, args) => {
            if (Object.keys(args).includes("_id")) {
                const usuario = await UserModel.findOne({ _id: args._id });
                return usuario;
            } else if (Object.keys(args).includes("correo")) {
                const usuario = await UserModel.findOne({
                    correo: args.correo,
                });
                return usuario;
            } else if (Object.keys(args).includes("identificacion")) {
                const usuario = await UserModel.findOne({
                    identificacion: args.identificacion,
                });
                return usuario;
            }
        },
        leerEstudiantes: async (parent, args, context) => {
            // if (context.userData.rol === "LIDER") {
            const estudiantes = await UserModel.where({
                rol: "ESTUDIANTE",
            });
            return estudiantes;
            // }
            // return null;
        },
    },

    Mutation: {
        crearUsuario: async (paren, args, context) => {
            // if (context.userData.rol === "ADMINISTRADOR") {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(args.password, salt);
            const usuarioCreado = await UserModel.create({
                nombres: args.nombres,
                apellidos: args.apellidos,
                identificacion: args.identificacion,
                correo: args.correo,
                rol: args.rol,
                password: hashedPassword,
            });

            if (Object.keys(args).includes("estado")) {
                //Esta validacion es necesaria pues de lo contrario solo tomaria el dato por defecto
                usuarioCreado.estado = args.estado;
            }
            return usuarioCreado;
            // }

            // return null;
        },
        eliminarUsuario: async (parent, args) => {
            //Buscar alternativa al codigo. P. ej, implementar un foreach para que recorra cada opcion: _id,correo,identificacion
            if (Object.keys(args).includes("_id")) {
                const usuarioEliminado = await UserModel.findOneAndDelete({
                    _id: args._id,
                });
                return usuarioEliminado;
            } else if (Object.keys(args).includes("correo")) {
                const usuarioEliminado = await UserModel.findOneAndDelete({
                    correo: args.correo,
                });
                return usuarioEliminado;
            } else if (Object.keys(args).includes("identificacion")) {
                const usuarioEliminado = await UserModel.findOneAndDelete({
                    identificacion: args.identificacion,
                });
                return usuarioEliminado;
            }
        },
        editarPerfil: async (parent, args, context) => {

            if (args.password) {
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(args.password, salt);
                const usuarioEditado = await UserModel.findByIdAndUpdate(
                    context.userData._id,
                    {
                        nombres: args.nombres,
                        apellidos: args.apellidos,
                        identificacion: args.identificacion,
                        correo: args.correo,
                        password: hashedPassword,
                    },
                    { new: true }
                );
                return usuarioEditado;
            } else {
                const usuarioEditado = await UserModel.findByIdAndUpdate(
                    context.userData._id,
                    {
                        nombres: args.nombres,
                        apellidos: args.apellidos,
                        identificacion: args.identificacion,
                        correo: args.correo,
                    },
                    { new: true }
                );
                return usuarioEditado;
            }
        },
        editarUsuario: async (parent, args, context) => {
            // if (context.userData.rol === "ADMINISTRADOR") {

            if (args.password) {
                const salt = await bcrypt.genSalt(10); //Rondas de encriptacion
                const hashedPassword = await bcrypt.hash(args.password, salt);
                const usuarioEditado = await UserModel.findByIdAndUpdate(
                    args._id,
                    {
                        nombres: args.nombres,
                        apellidos: args.apellidos,
                        identificacion: args.identificacion,
                        correo: args.correo,
                        rol: args.rol,
                        estado: args.estado,
                        password: hashedPassword,
                    },
                    { new: true }
                );
                return usuarioEditado;
            } else {
                const usuarioEditado = await UserModel.findByIdAndUpdate(
                    args._id,
                    {
                        nombres: args.nombres,
                        apellidos: args.apellidos,
                        identificacion: args.identificacion,
                        correo: args.correo,
                        rol: args.rol,
                        estado: args.estado,
                    },
                    { new: true }
                );
                return usuarioEditado;

            }

            // }
            // return null;
        },
        editarEstadoUsuario: async (parent, args, context) => {
            // if (context.userData.rol === "ADMINISTRADOR") {
            const usuario = await UserModel.findByIdAndUpdate(
                args._id,
                { estado: args.estado },
                { new: true }
            );
            console.log(usuario);
            return usuario;
            // }
            // return null;
        },

        editarEstadoEstudiante: async (parent, args, context) => {
            // if (context.userData.rol === "LIDER") {
            const estudiante = await UserModel.findByIdAndUpdate(
                args._id,
                { estado: args.estado },
                { new: true }
            );
            return estudiante;
            // }
            // return null;
        },
    },
};

export { resolversUsuario };
