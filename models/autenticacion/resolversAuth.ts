import bcrypt from "bcryptjs";
import { UserModel } from "../usuarios/users";
import {getToken} from '../../utils/tokenUtils';
// import {getToken} from '../../index';

const resolversAuth = {
    Mutation: {
        Registro: async (parent, args, context) => {
            const hashedPassword = bcrypt.hashSync(args.password);
            const usuario = await UserModel.create({
                identificacion: args.identificacion,
                apellidos:args.apellidos,
                correo:args.correo,
                nombres:args.nombres,
                rol:args.rol,
                password: hashedPassword
            });
            return {
                user: usuario,
                token: getToken(usuario),
            };
        },

        Ingreso: async (parent, args, context) => {
            const usuario = await UserModel.findOne({ correo: args.correo });
            const isPasswordCorrect = bcrypt.compareSync(
                args.password,
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