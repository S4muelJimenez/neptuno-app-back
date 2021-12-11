//Uso de variables de entorno
import dotenv = require("dotenv");
dotenv.config();

//Token
import jwt from "jsonwebtoken";
import { UserModel } from "../models/usuarios/users";

const validateToken = (token) => {
    if (token){
        const verificacion = jwt.verify(token, process.env.JWT_SECRET, (err,data)=>{
            if(data){                               
                return {data:data,}
            }
            else if (err){
                return {error:err,}
            }
        });
        console.log('Verificacion', verificacion)
        return verificacion
    }
}

const generateToken = (payload) =>
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "24h" });

// const getUserFromToken = async (token) => {
//     if (!token) { //Esta linea se uso debido a que no habia ningun token generado. No es necesaria si el registro se hace correctamente para el primer usuario con hashedPassword (En caso contrario, puede usarse para eliminar la restriccion del token)
//         return ["token",null];
//     }
//     const tokenData = jwt.verify(token, process.env.JWT_SECRET);
//     if (!tokenData?.id) {
//         return ["tokenData",null];
//     }
//     return await UserModel.findOne({ _id: tokenData.id });
// };
export { generateToken };
export {validateToken};
