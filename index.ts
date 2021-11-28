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
//     if (!token) {
//         return null;
//     }
//     const tokenData = jwt.verify(token, process.env.JWT_SECRET);
//     if (!tokenData?.id) {
//         return null;
//     }
//     return await UserModel.findOne({ _id: tokenData.id });
// };
// export { getToken };


import {getUserFromToken} from './utils/tokenUtils'

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolvers,
    context: async ({ req }) => {
        const usuario = await getUserFromToken(req.headers.authorization);
        console.log(usuario);
        return usuario;
    },
});

const app = express();
app.use(express.json()); //Midleware para usar request como tipo JSON
app.use(cors());

app.listen({ port: process.env.PORT || 4000 }, async () => {
    await conectarBD();
    await server
        .start()
        .then(() => {
            console.log(`🚀  Server ready`);
        })
        .catch((e) => {
            console.log("No se pudo iniciar el servidor", e);
        });

    server.applyMiddleware({ app }); //Se le pasan los mismo middleware de express al servidor de apollo
    // The `listen` method launches a web server.
});

