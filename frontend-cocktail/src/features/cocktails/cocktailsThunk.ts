import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  Cocktail,
  CocktailDetails,
  CocktailMutation,
  ValidationError,
} from "../../types";
import axiosApi from "../../axiosApi.ts";
import { RootState } from "../../app/store.ts";
import { isAxiosError } from "axios";

export const fetchCocktails = createAsyncThunk<
  Cocktail[],
  void,
  { state: RootState; rejectValue: ValidationError }
>("cocktails/fetchCocktails", async (_, { getState }) => {
  const token = getState().users.user?.token;

  if (!token) {
    throw new Error("User not found");
  }

  const cocktailsRes = await axiosApi<Cocktail[]>("/cocktails", {
    headers: { Authorization: token },
  });
  return cocktailsRes.data || [];
});

export const fetchCocktailById = createAsyncThunk<CocktailDetails, string>(
  "cocktails/fetchCocktailById",
  async (cocktailId) => {
    const response = await axiosApi.get<CocktailDetails>(
      `/cocktails/${cocktailId}`,
    );
    return response.data;
  },
);

export const fetchMyCocktail = createAsyncThunk<
  Cocktail[],
  string,
  { state: RootState; rejectValue: ValidationError }
>("cocktails/fetchMyCocktail", async (userId, { getState }) => {
  const token = getState().users.user?.token;

  if (!token) {
    throw new Error("User not found");
  }

  const cocktailsRes = await axiosApi.get<Cocktail[]>(
    `/cocktails?user=${userId}`,
    {
      headers: { Authorization: token },
    },
  );

  return cocktailsRes.data || [];
});

export const addCocktail = createAsyncThunk<
  Cocktail,
  CocktailMutation,
  { state: RootState; rejectValue: ValidationError }
>(
  "cocktails/addCocktail",
  async (newCocktail: CocktailMutation, { getState, rejectWithValue }) => {
    const token = getState().users.user?.token;

    const data = new FormData();

    data.append("name", newCocktail.name);

    if (newCocktail.image !== null) {
      data.append("image", newCocktail.image);
    }

    data.append("recipe", newCocktail.recipe);

    data.append("ingredients", JSON.stringify(newCocktail.ingredients));
    try {
      const response = await axiosApi.post<Cocktail>("/cocktails", data, {
        headers: { Authorization: token },
      });

      return response.data;
    } catch (error) {
      if (
        isAxiosError(error) &&
        error.response &&
        error.response.status === 400
      ) {
        return rejectWithValue(error.response.data as ValidationError);
      }
      throw error;
    }
  },
);

export const deletedCocktail = createAsyncThunk<
  void,
  string,
  { state: RootState }
>("cocktails/deletedCocktail", async (id: string, { getState }) => {
  const token = getState().users.user?.token;
  await axiosApi.delete(`/cocktails/${id}`, {
    headers: { Authorization: token },
  });
});

export const toggleCocktailPublish = createAsyncThunk<
  void,
  string,
  { state: RootState }
>("cocktails/toggleArtists", async (cocktailId: string, { getState }) => {
  const token = getState().users.user?.token;
  await axiosApi.patch(
    `/cocktails/${cocktailId}/togglePublished`,
    {},
    {
      headers: { Authorization: token },
    },
  );
});
