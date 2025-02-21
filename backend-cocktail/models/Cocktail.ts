import mongoose from "mongoose";

const Schema = mongoose.Schema;

const CocktailSchema = new Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name:{
        type: String,
        validate: {
            validator: async function (value: string): Promise<boolean> {
                return value.trim().length > 0;
            },
            message: "Fill in the name cocktail",
        },
    },
    image:{
        type: String,
        default: null,
    },
    recipe:{
        type: String,
        validate: {
            validator: async function (value: string): Promise<boolean> {
                return value.trim().length > 0;
            },
            message: "Fill in the recipe",
        },
    },
    published:{
        type: Boolean,
        default: false,
        required: true,
    },
    ingredients:[{
        name:{
            type: String,
            validate: {
                validator: async function (value: string): Promise<boolean> {
                    return value.trim().length > 0;
                },
                message: "Fill in the name ingredient",
            },
        },
        amount:{
            type: String,
            validate: {
                validator: async function (value: string): Promise<boolean> {
                    return value.trim().length > 0;
                },
                message: "Fill in the amount ingredient",
            },
        }
    }]
})

const Cocktail = mongoose.model('Cocktail', CocktailSchema);

export default Cocktail;