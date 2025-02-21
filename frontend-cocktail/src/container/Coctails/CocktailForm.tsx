import { CocktailMutation } from "../../types";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import { selectUser } from "../../features/users/userSlice.ts";
import { useNavigate } from "react-router-dom";
import { addCocktail } from "../../features/cocktails/cocktailsThunk.ts";
import TextField from "@mui/material/TextField";
import { Box, Button } from "@mui/material";
import FileInput from "../../components/FileInput.tsx";
import ButtonLoading from "../../components/UI/ButtonLoading/ButtonLoading.tsx";
import { loadCreatCocktail } from "../../features/cocktails/cocktailsSlice.ts";

const initialState = {
  name: "",
  image: null,
  recipe: "",
  ingredients: [
    {
      name: "",
      amount: "",
    },
  ],
};

const CocktailForm = () => {
  const [form, setForm] = useState<CocktailMutation>({ ...initialState });
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const navigate = useNavigate();
  const creatLoadCocktail = useAppSelector(loadCreatCocktail);

  useEffect(() => {
    if (!user) navigate("/register");
  }, [navigate, user]);

  const onFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(addCocktail(form)).unwrap();
      setForm({ ...initialState });
      navigate(`/`);
    } catch (e) {
      console.error("Error during form submission:", e);
    }
  };

  const onInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((prevState: CocktailMutation) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onIngredientsChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    // исправлено
    const { name, value } = e.target;
    setForm((prevState: CocktailMutation) => {
      const ingredCopy = [...prevState.ingredients];
      ingredCopy[index] = { ...ingredCopy[index], [name]: value };

      return {
        ...prevState,
        ingredients: ingredCopy,
      };
    });
  };

  const onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, files } = e.target;

    if (files) {
      setForm((prevState: CocktailMutation) => ({
        ...prevState,
        [name]: files[0] || null,
      }));
    }
  };

  const addIngredientField = () => {
    setForm((prevState: CocktailMutation) => ({
      ...prevState,
      ingredients: [...prevState.ingredients, { name: "", amount: "" }],
    }));
  };

  const deleteIngred = (index: number) => {
    setForm((prevState: CocktailMutation) => ({
      ...prevState,
      ingredients: prevState.ingredients.filter((_, i) => i !== index),
    }));
  };

  return (
    <div>
      <h2 className="text-center mt-4">Add new cocktail</h2>
      <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
        <Box
          component="form"
          sx={{
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
          }}
          onSubmit={onFormSubmit}
        >
          <h5 className="fs-5">Cocktail Name:</h5>
          <TextField
            label="Cocktail Name"
            variant="outlined"
            fullWidth
            margin="normal"
            name="name"
            value={form.name}
            onChange={onInputChange}
            sx={{
              input: {
                backgroundColor: "#f0f0f0",
              },
            }}
          />
          <h5 className="fs-5">Recipe:</h5>
          <TextField
            label="Recipe"
            variant="outlined"
            fullWidth
            margin="normal"
            name="recipe"
            value={form.recipe}
            onChange={onInputChange}
            multiline
            rows={4}
            sx={{
              input: {
                backgroundColor: "#f0f0f0",
              },
            }}
          />

          <div>
            <h5 className="fs-5">Ingredients:</h5>
            {form.ingredients.map((ingredient, index) => (
              <div key={index}>
                <TextField
                  label={`Ingredient ${index + 1} Name`}
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  name="name"
                  value={ingredient.name}
                  onChange={(e) => onIngredientsChange(index, e)}
                  sx={{
                    input: {
                      backgroundColor: "#f0f0f0",
                    },
                  }}
                />
                <TextField
                  label={`Ingredient ${index + 1} Amount`}
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  name="amount"
                  value={ingredient.amount}
                  onChange={(e) => onIngredientsChange(index, e)}
                  sx={{
                    input: {
                      backgroundColor: "#f0f0f0",
                    },
                  }}
                />
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => deleteIngred(index)}
                  sx={{ marginLeft: "10px", marginBottom: "10px" }}
                >
                  Remove
                </Button>
              </div>
            ))}
            <Button variant="outlined" onClick={addIngredientField}>
              Add Ingredient
            </Button>
          </div>

          <div className="mb-3">
            <label htmlFor="date">Photo</label>
            <FileInput
              id="image"
              name="image"
              label="Photo"
              onGetFile={onFileChange}
              file={form.image}
            />
          </div>

          <ButtonLoading
            isLoading={creatLoadCocktail}
            isDisabled={creatLoadCocktail}
            text="Add new cocktail"
          />
        </Box>
      </div>
    </div>
  );
};

export default CocktailForm;
