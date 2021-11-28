import bcrypt from "bcryptjs";
import { UserModel } from "../usuarios/users";
import {getToken} from '../../index';

const resolversAuth = {
    Mutation: {
        Registro: async (parent, args, context) => {
            const hashedPassword = bcrypt.hashSync(args.input.password);
            // const usuarioNuevo = {
            //     ...args,
            //     password: hashedPassword
            // }
            const usuario = await UserModel.create({
                identificacion: args.input.identificacion,
                apellidos:args.input.apellidos,
                correo:args.input.correo,
                nombres:args.input.nombres,
                rol:args.input.rol,
                password: hashedPassword
            });
            return {
                user: usuario,
                token: getToken(usuario),
            };
        },

        Ingreso: async (parent, args, context) => {
            const usuario = await UserModel.findOne({ correo: args.input.correo });
            const isPasswordCorrect = bcrypt.compareSync(
                args.input.password,
                usuario.password
            );
            if (!usuario || !isPasswordCorrect) {
                throw new Error("Credenciales Incorrectas!");
            }
            return {
                user: usuario,
                token: getToken(usuario),
            };
        },
    },
};

export {resolversAuth}