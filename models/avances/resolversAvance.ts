import { ProgressModel } from "./progress";

const resolversAvances = {
    Query: {
        Avance: async (parent, args) => {
            const Avances = await ProgressModel.find({ _id: args._id });



            return Avances;
        },
    },
}

