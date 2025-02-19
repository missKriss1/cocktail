import mongoose from "mongoose";
import config from "./config";
import User from "./models/User";
import {randomUUID} from "node:crypto";
import Cocktail from "./models/Cocktail";

const run = async () => {
    await mongoose.connect(config.db);

    const db = mongoose.connection;

    try{
        await db.dropCollection('users');
        await db.dropCollection('cocktails');
    }catch(err){
        console.log(err);
    }

    const  [user1, user2] = await User.create(
        {
            email: 'user1@gmail.com',
            password: '123',
            token: randomUUID(),
            role: 'admin',
            displayName: 'Jane',
            avatar: 'fixtures/avatar/avatar1.jpg'
        },
        {
            email: 'user2@gmail.com',
            password: '12345',
            token: randomUUID(),
            role: 'user',
            displayName: 'John',
            avatar: 'fixtures/avatar/avatar2.jpg'
        }
    )

    await Cocktail.create([
        {
            user: user1._id,
            name: 'Margarita',
            recipe: 'Mix tequila, lime juice, and Cointreau.',
            published: true,
            image: "fixtures/cocktails/margarita.jpg",
            ingredients: [
                { name: 'Tequila', amount: '50ml' },
                { name: 'Lime juice', amount: '25ml' },
                { name: 'Cointreau', amount: '15ml' },
                { name: 'Salt', amount: 'for rim' }
            ],
        },
        {
            user: user1._id,
            name: 'Mojito',
            recipe: 'Mix rum, mint, lime, sugar, and soda water.',
            published: false,
            image: "fixtures/cocktails/mojito.jpg",
            ingredients: [
                { name: 'Rum', amount: '50ml' },
                { name: 'Mint', amount: '10 leaves' },
                { name: 'Lime', amount: '2 wedges' },
                { name: 'Sugar', amount: '2 tsp' },
                { name: 'Soda water', amount: '100ml' }
            ],
        },
        {
            user: user1._id,
            name: 'Cosmopolitan',
            recipe: 'Mix vodka, cranberry juice, Cointreau, and lime juice.',
            published: true,
            image: "fixtures/cocktails/cosmopolitan.jpg",
            ingredients: [
                { name: 'Vodka', amount: '40ml' },
                { name: 'Cranberry juice', amount: '20ml' },
                { name: 'Cointreau', amount: '10ml' },
                { name: 'Lime juice', amount: '10ml' }
            ],
        },
        {
            user: user1._id,
            name: 'Piña Colada',
            recipe: 'Blend rum, coconut cream, and pineapple juice.',
            published: false,
            image: "fixtures/cocktails/pina_colada.jpg",
            ingredients: [
                { name: 'Rum', amount: '50ml' },
                { name: 'Coconut cream', amount: '30ml' },
                { name: 'Pineapple juice', amount: '100ml' }
            ],
        },
        {
            user: user1._id,
            name: 'Old Fashioned',
            recipe: 'Mix bourbon, sugar, and bitters.',
            published: true,
            image: "fixtures/cocktails/old_fashioned.jpg",
            ingredients: [
                { name: 'Bourbon', amount: '50ml' },
                { name: 'Sugar', amount: '1 cube' },
                { name: 'Bitters', amount: '2 dashes' },
                { name: 'Orange peel', amount: 'for garnish' }
            ],
        },
        {
            user: user1._id,
            name: 'Bloody Mary',
            recipe: 'Mix vodka, tomato juice, and spices.',
            published: false,
            image: "fixtures/cocktails/bloody_mary.jpg",
            ingredients: [
                { name: 'Vodka', amount: '50ml' },
                { name: 'Tomato juice', amount: '100ml' },
                { name: 'Lemon juice', amount: '10ml' },
                { name: 'Worcestershire sauce', amount: '2 dashes' },
                { name: 'Tabasco', amount: '1 drop' }
            ],
        },
        {
            user: user1._id,
            name: 'Daiquiri',
            recipe: 'Mix rum, lime juice, and sugar.',
            published: true,
            image: "fixtures/cocktails/daiquiri.jpg",
            ingredients: [
                { name: 'Rum', amount: '50ml' },
                { name: 'Lime juice', amount: '25ml' },
                { name: 'Sugar syrup', amount: '15ml' }
            ],
        },
        {
            user: user2._id,
            name: 'Negroni',
            recipe: 'Mix gin, Campari, and vermouth.',
            published: false,
            image: "fixtures/cocktails/negroni.jpg",
            ingredients: [
                { name: 'Gin', amount: '30ml' },
                { name: 'Campari', amount: '30ml' },
                { name: 'Vermouth Rosso', amount: '30ml' }
            ],
        },
        {
            user: user2._id,
            name: 'Mai Tai',
            recipe: 'Mix rum, lime juice, orgeat syrup, and orange liqueur.',
            published: true,
            image: "fixtures/cocktails/mai_tai.jpg",
            ingredients: [
                { name: 'Rum', amount: '50ml' },
                { name: 'Lime juice', amount: '25ml' },
                { name: 'Orgeat syrup', amount: '15ml' },
                { name: 'Orange liqueur', amount: '15ml' }
            ],
        },
        {
            user: user2._id,
            name: 'Tequila Sunrise',
            recipe: 'Mix tequila, orange juice, and grenadine.',
            published: true,
            image: "fixtures/cocktails/tequila_sunrise.jpg",
            ingredients: [
                { name: 'Tequila', amount: '50ml' },
                { name: 'Orange juice', amount: '100ml' },
                { name: 'Grenadine', amount: '10ml' }
            ],
        },
        {
            user: user2._id,
            name: 'Gin Tonic',
            recipe: 'Mix gin and tonic water.',
            published: false,
            image: "fixtures/cocktails/gin_tonic.jpg",
            ingredients: [
                { name: 'Gin', amount: '50ml' },
                { name: 'Tonic water', amount: '150ml' },
                { name: 'Lime', amount: '1 wedge' }
            ],
        },
        {
            user: user2._id,
            name: 'Whiskey Sour',
            recipe: 'Mix whiskey, lemon juice, and sugar.',
            published: true,
            image: "fixtures/cocktails/whiskey_sour.jpg",
            ingredients: [
                { name: 'Whiskey', amount: '50ml' },
                { name: 'Lemon juice', amount: '25ml' },
                { name: 'Sugar syrup', amount: '15ml' }
            ],
        },
        {
            user: user2._id,
            name: 'Mint Julep',
            recipe: 'Mix bourbon, mint, and sugar.',
            published: false,
            image: "fixtures/cocktails/mint_julep.jpg",
            ingredients: [
                { name: 'Bourbon', amount: '50ml' },
                { name: 'Mint leaves', amount: '10' },
                { name: 'Sugar', amount: '1 tsp' }
            ],
        },
        {
            user: user2._id,
            name: 'Caipirinha',
            recipe: 'Mix cachaça, lime, and sugar.',
            published: true,
            image: "fixtures/cocktails/caipirinha.jpg",
            ingredients: [
                { name: 'Cachaça', amount: '50ml' },
                { name: 'Lime', amount: '1' },
                { name: 'Sugar', amount: '2 tsp' }
            ],
        }
    ]);

    await db.close()

}

run().catch(console.error)