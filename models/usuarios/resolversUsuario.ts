import bcrypt from "bcryptjs";
import { UserModel } from "./users";

const resolversUsuario = {
    Query: {
        leerUsuarios: async (parent, args) => {
            const usuarios = await UserModel.find();
            return usuarios;
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
    },

    Mutation: {
        crearUsuario: async (paren, args, context) => {
            if (context.userData.rol === "ADMINISTRADOR") {
                const usuarioCreado = await UserModel.create({
                    nombres: args.nombres,
                    apellidos: args.apellidos,
                    identificacion: args.identificacion,
                    correo: args.correo,
                    rol: args.rol,
                });

                if (Object.keys(args).includes("estado")) {
                    //Esta validacion es necesaria pues de lo contrario solo tomaria el dato por defecto
                    usuarioCreado.estado = args.estado;
                }
                return usuarioCreado;
            }

            return null;
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
        editarUsuario: async (parent, args, context) => {
            if (context.userData.rol === "ADMINISTRADOR") {
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
                        password: hashedPassword
                    }
                );
                return usuarioEditado;
            }
            return null;
        },
    },
};

export { resolversUsuario };
