import bcrypt from "bcryptjs";
import { UserModel } from "../usuarios/users";
import { generateToken } from "../../utils/tokenUtils";
// import {getToken} from '../../index';

const resolversAuth = {
    Mutation: {
        Registro: async (parent, args, context) => {
            const salt = await bcrypt.genSalt(10); //Rondas de encriptacion
            const hashedPassword = bcrypt.hash(args.password, salt);
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
            const isPasswordCorrect = bcrypt.compare(
                args.password,
                usuario.password
            );
            if (!usuario || !isPasswordCorrect) {
                throw new Error("Credenciales Incorrectas!");
            }
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
    },
};

export { resolversAuth };
