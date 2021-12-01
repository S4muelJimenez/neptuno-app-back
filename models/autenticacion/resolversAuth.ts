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
                    correo: usuario.correo,
                    rol: usuario.rol,
                }),
            };
        },

        Ingreso: async (parent, args, context) => {
            const usuario = await UserModel.findOne({ correo: args.correo });
            const isPasswordCorrect = await bcrypt.compare(
                args.password,
                usuario.password
            );
            console.log('Usuario login: ', usuario);
            
            console.log('Contraseña correcta?: ', isPasswordCorrect);
            
            if (usuario && isPasswordCorrect) {
                return {
                    token: generateToken({
                        _id: usuario._id,
                        identificacion: usuario.identificacion,
                        nombres: usuario.nombres,
                        apellidos: usuario.apellidos,
                        correo: usuario.correo,
                        rol: usuario.rol,
                    }),
                };
                //throw new Error("Credenciales Incorrectas!");
            }
        },

        refrescarToken: async (parent, args, context) => {
            //Este resolver se ejecuta en cada request al servidor
            console.log("Contexto", context);
            if (!context.userData) {
                return {
                    error: "Token no valido",
                };
            } else {//Si el con
                console.log(
                    "userData es verdadero, lo que significa que el token es válido y no ha expirado"
                );
                return {
                    token: generateToken({
                        _id: context.userData._id,
                        identificacion: context.userData.identificacion,
                        nombres: context.userData.nombres,
                        apellidos: context.userData.apellidos,
                        correo: context.userData.correo,
                        rol: context.userData.rol,
                    }),
                };
            }
        },
    },
};

export { resolversAuth };
