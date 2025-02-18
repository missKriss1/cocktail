export interface RegisterMutation {
  email: string;
  password: string;
  displayName: string;
  avatar: File | null;
}

export interface LogInMutation {
  email: string;
  password: string;
}

export interface User {
  _id: string;
  email: string;
  role: string;
  token: string;
  displayName: string;
  avatar: File | null;
}

export interface RegisterResponse {
  user: User;
  message: string;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      message: string;
      name: string;
    };
  };
  name: string;
  message: string;
}

export interface GlobalError {
  error: string;
}

export interface Ingredients {
  name: string;
  amount: string;
}

export interface Cocktail{
  _id: string;
  user: string;
  name: string;
  image: string;
  recipe: string;
  ingredients: Ingredients[];
  published: boolean;
}

export interface CocktailDetails {
  _id: string;
  name: string;
  user: User;
  image: File | null;
  recipe: string;
  ingredients: Ingredients[];
  published: boolean;
}
