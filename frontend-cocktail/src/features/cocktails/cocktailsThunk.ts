import { createAsyncThunk } from '@reduxjs/toolkit';
import { Cocktail, CocktailDetails } from '../../types';
import axiosApi from '../../axiosApi.ts';

export const fetchCocktails = createAsyncThunk<Cocktail[], void>(
  'cocktails/fetchCocktails',
  async () =>{
    const cocktailsRes = await axiosApi<Cocktail[]>('/cocktails');
    return cocktailsRes.data || [];
  }
)

export const fetchCocktailById = createAsyncThunk<CocktailDetails, string>(
  'cocktails/fetchCocktailById',
  async (cocktailId) =>{
    const response = await  axiosApi.get<CocktailDetails>(`/cocktails/${cocktailId}`);
    return response.data;
  }
)