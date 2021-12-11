import bcrypt from "bcryptjs";
import { UserModel } from "../usuarios/users";
import { generateToken } from "../../utils/tokenUtils";
// import {getToken} from '../../index';

const resolversAuth = {
    Mutation: {
        Registro: async (parent, args, context) => {
            const salt = await bcrypt.genSalt(10); //Rondas de encriptacion
            const hashedPassword = await bcrypt.hash(args.password, salt);
            const usuario = await UserModel.create({
                identificacion: args.identificacion,
                nombres: args.nombres,
                apellidos: args.apellidos,
                correo: args.correo,
                rol: args.rol,
                password: hashedPassword,
            });
            return {
                token: generateToken({
                    _id: usuario._id,
                    identificacion: usuario.identificacion,
                    nombres: usuario.nombres,
                    apellidos: usuario.apellidos,
                    estado: usuario.estado,
                    correo: usuario.correo,
                    rol: usuario.rol,
                }),
            };
        },

        Ingreso: async (parent, args, context) => {
            console.log(context.userData.estado)
            const usuario = await UserModel.findOne({ correo: args.correo });
            if (true) {
                const isPasswordCorrect = await bcrypt.compare(
                    args.password,
                    usuario.password
                );
                if (usuario && isPasswordCorrect) {
                    return {
                        token: generateToken({
                            _id: usuario._id,
                            identificacion: usuario.identificacion,
                            nombres: usuario.nombres,
                            apellidos: usuario.apellidos,
                            correo: usuario.correo,
                            estado: usuario.estado,
                            rol: usuario.rol,
                        }),
                    };
                }else{
                    throw new Error("Credenciales inválidas.")
                }
            } else{
                throw new Error("Usuario no autorizado");
            }
        },

        refrescarToken: async (parent, args, context) => {
            //Este resolver se ejecuta en cada request al servidor
            console.log("Contexto", context);
            if (!context.userData) {
                return {
                    error: "Token no valido",
                };
            } else {
                //Si el context tiene userData, genera (refresca) un nuevo token para la sesion
                return {
                    token: generateToken({
                        _id: context.userData._id,
                        identificacion: context.userData.identificacion,
                        nombres: context.userData.nombres,
                        apellidos: context.userData.apellidos,
                        estado: context.userData.estado,
                        correo: context.userData.correo,
                        rol: context.userData.rol,
                    }),
                };
            }
        },
    },
};

export { resolversAuth };
