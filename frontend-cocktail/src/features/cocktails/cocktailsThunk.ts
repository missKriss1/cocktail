import { createAsyncThunk } from '@reduxjs/toolkit';
import { Cocktail } from '../../types';
import axiosApi from '../../axiosApi.ts';

export const fetchCocktails = createAsyncThunk<Cocktail[], void>(
  'cocktails/fetchCocktails',
  async () =>{
    const cocktailsRes = await axiosApi<Cocktail[]>('/cocktails');
    return cocktailsRes.data || [];
  }
)