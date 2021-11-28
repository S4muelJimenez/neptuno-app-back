import bcrypt from "bcryptjs";
import { UserModel } from "../usuarios/users";

const resolversAuth = {
    Mutation: {
        SignUp: async (parent, args) => {
            const hashedPassword = bcrypt.hashSync(args.password);

            const usuario = await UserModel.create({
                identificacion: args.identificacion,
                nombres: args.nombres,
                apellidos: args.apellidos,
                correo: args.correo,
                rol: args.rol,
                password: hashedPassword,
            });
            return {
                user: usuario,
                token: "",
            };
        },

        SignIn: async (parent, args) => {
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
                token: "",
            };
        },
    },
};
