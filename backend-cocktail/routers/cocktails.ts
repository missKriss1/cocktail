import express from "express";
import Cocktail from "../models/Cocktail";
import {imagesUpload} from "../multer";
import auth, {RequestWithUser} from "../middleware/auth";
import mongoose from "mongoose";
import permit from "../middleware/permit";

const cocktailsRouter = express.Router();

cocktailsRouter.post("/", auth, imagesUpload.single('image'), async (req, res, next) => {

    let reqWithAuth = req as RequestWithUser;
    const user = reqWithAuth.user

    if (!user) {
        res.status(400).send({error: 'User not found'});
        return;
    }

    try{

        let ingredients = []

        if(req.body.ingredients){
            try{
                ingredients = JSON.parse(req.body.ingredients);
            }catch (e) {
                res.status(400).send({error: "Invalid ingredients format"});
            }
        }

        const newCocktail = new Cocktail ({
            user: user._id,
            name: req.body.name,
            image: req.file ? req.file.filename : null,
            recipe: req.body.recipe,
            ingredients: ingredients,
            published: req.body.published
        })

        await newCocktail.save();
        res.send(newCocktail);
    }catch(e){
        if (e instanceof mongoose.Error.ValidationError) {
            res.status(400).send(e);
            return;
        }
        next(e);
    }
})

cocktailsRouter.get("/", auth, async (req, res, next) => {
    let reqWithAuth = req as RequestWithUser;
    const user = reqWithAuth.user

    if (!user) {
        res.status(400).send({error: 'User not found'});
        return;
    }
    try{
        const userCocktails = req.query.user;
        let cocktail

        if(userCocktails){
            cocktail = await Cocktail.find({user: userCocktails}).populate("user");
        }else{
            cocktail = await Cocktail.find().populate("user");
        }

        res.send(cocktail)
    }catch (e){
        next(e);
    }
})

cocktailsRouter.get("/:id", async (req, res, next) => {
    try{
        if(!req.params.id){
            res.status(400).send({error: "Id is required"});
        }

        const cocktail = await Cocktail.findById(req.params.id);
        res.send(cocktail)
    }catch(e){
        next(e);
    }
})

cocktailsRouter.patch("/:id/togglePublished", auth, permit('admin'), async (req, res, next) => {
    let reqWithAuth = req as RequestWithUser;

    try{
        if(!reqWithAuth.params.id){
            res.status(400).send({error: 'The ID should be in the URl'});
        }

        const cocktail = await Cocktail.findById(reqWithAuth.params.id);

        if(!cocktail){
            res.status(400).send({error: 'Cocktail not found'})
        }

        if(cocktail){
            const updateCocktail = await Cocktail.findByIdAndUpdate(reqWithAuth.params.id,
                {published: !cocktail.published},
                {new: true},
            )
            res.send(updateCocktail);
        }
    }catch (e){
        next(e);
    }
})

cocktailsRouter.delete("/:id", auth, async (req, res, next) => {
    try{
        if(!req.params.id){
            res.status(400).send({error: 'Id is required'});
        }

        const cocktail = await Cocktail.findById(req.params.id);

        if (cocktail){
            await Cocktail.findByIdAndDelete(req.params.id);
            res.send({message: 'Cocktail was deleted successfully'});
        }

    }catch(e){
        next(e);
    }
})


export default cocktailsRouter
