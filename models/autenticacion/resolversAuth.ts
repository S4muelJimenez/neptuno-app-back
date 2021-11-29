import bcrypt from "bcryptjs";
import { UserModel } from "../usuarios/users";
import {getToken} from '../../utils/tokenUtils';
// import {getToken} from '../../index';

const resolversAuth = {
    Mutation: {
        Registro: async (parent, args, context) => {
            
            const salt = await bcrypt.genSalt(10) //Rondas de encriptacion            
            const hashedPassword = bcrypt.hash(args.input.password, salt);
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