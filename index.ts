//MongoDB, Moongoose
import conectarBD from "./db/db";

//GraphQL y apollo
import cors from "cors";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { typeDefs } from "./graphql/types";
import { resolvers } from "./graphql/resolvers";

// //Uso de variables de entorno
// import dotenv = require("dotenv");
// dotenv.config();

// //Token
// import jwt from "jsonwebtoken";
// import { UserModel } from "./models/usuarios/users";

// const getToken = (usuario) =>
//     jwt.sign({ id: usuario._id }, process.env.JWT_SECRET, { expiresIn: "30 days" });

// const getUserFromToken = async (token) => {
//     if (token) {

//         const tokenData = jwt.verify(token, process.env.JWT_SECRET,);
//           console.log(tokenData,token)
//         return await UserModel.findOne({ _id: tokenData.id });
//     }

// };
// export { getToken };

import { validateToken } from "./utils/tokenUtils";

const getUserData = (token) => {
    const verification = validateToken(token);
    if (verification.data) {
        return verification.data;
    } else {
        return null;
    }
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolvers,
    context: ({ req }) => {
        const token = req.headers?.authorization ?? null; //Operador Nullish coalescing (??): retorna el valor de la derecha si el valor de la izquierda es null/undefined; de lo contrario, retorna el valor de la izquierda
        //obtener el token desde la variable req
        if (token) {
            console.log("Token desde el frontend", req.headers.authorization);
            const userData = getUserData(req.headers.authorization);
            if (userData) {
                return { userData }; //Si el token es Verdadero, tome la informacion del token (la cual incluye la info del usuario, incluyendo su Rol) y pongala en el contexto del server para que pueda ser usada por cualquier resolver
            }
        }
        return null;
    },
});

const app = express();
app.use(express.json()); //Midleware para usar request como tipo JSON
app.use(cors());

app.listen({ port: process.env.PORT || 4000 }, async () => {
    await server
        .start()
        .then(() => {
            console.log(`🚀  Server ready`);
        })
        .catch((e) => {
            console.log("No se pudo iniciar el servidor", e);
        });
    await conectarBD();
    server.applyMiddleware({ app }); //Se le pasan los mismo middleware de express al servidor de apollo
    // The `listen` method launches a web server.
});
