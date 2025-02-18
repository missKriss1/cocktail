import { Cocktail, CocktailDetails, ValidationError } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { fetchCocktailById, fetchCocktails } from './cocktailsThunk.ts';
import { RootState } from '../../app/store.ts';

interface CocktailsSlice {
  cocktails: Cocktail[];
  cocktail: CocktailDetails | null,
  fetchingLoading : boolean;
  fetchError : boolean;
  isCreating : boolean;
  creatingError: ValidationError | null;
  unPublishedCocktails: Cocktail[]
}

const initialState: CocktailsSlice = {
  cocktails: [],
  cocktail: null ,
  fetchingLoading: false,
  fetchError: false,
  isCreating : false,
  creatingError: null,
  unPublishedCocktails: [],
}

export const cocktailsSelect = (state: RootState) => state.cocktails.cocktails;
export const cocktailDetSelect = (state: RootState) => state.cocktails.cocktail

export const cocktailsSlice = createSlice({
  name: 'cocktails',
  initialState,
  reducers: {},
  extraReducers: (builder) =>{
    builder
      .addCase(fetchCocktails.pending, (state) => {
        state.fetchingLoading = true;
      })
      .addCase(fetchCocktails.fulfilled, (state, { payload: artists }) => {
        state.fetchingLoading = false;
        state.cocktails = artists;
      })
      .addCase(fetchCocktails.rejected, (state) => {
        state.fetchError = true;
      })
      .addCase(fetchCocktailById.pending, (state) => {
        state.fetchingLoading = true;
      })
      .addCase(fetchCocktailById.fulfilled, (state, { payload: cocktail }) => {
        state.fetchingLoading = false;
        state.cocktail = cocktail ;
      })
      .addCase(fetchCocktailById.rejected, (state) => {
        state.fetchError = true;
      })
}
})

export const cocktailsReducer = cocktailsSlice.reducer;