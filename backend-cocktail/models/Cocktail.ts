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
        required: true,
    },
    image:{
        type: String,
        default: null,
    },
    recipe:{
        type: String,
        required: true,
    },
    published:{
        type: Boolean,
        default: false,
        required: true,
    },
    ingredients:[{
        name:{
            type: String,
            required: true,
        },
        amount:{
            type: String,
            required: true,
        }
    }]
})

const Cocktail = mongoose.model('Cocktail', CocktailSchema);

export default Cocktail;