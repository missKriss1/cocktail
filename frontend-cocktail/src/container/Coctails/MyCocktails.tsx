import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import {
  cocktailsSelect,
  selectLoadingCocktails,
} from "../../features/cocktails/cocktailsSlice.ts";
import { useEffect } from "react";
import {
  deletedCocktail,
  fetchMyCocktail,
} from "../../features/cocktails/cocktailsThunk.ts";
import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import CoctailItem from "../../components/Coctail/CoctailItem.tsx";
import { useLocation } from "react-router-dom";
import Spinner from "../../components/UI/Spinner/Spinner.tsx";

const MyCocktails = () => {
  const dispatch = useAppDispatch();
  const cocktails = useAppSelector(cocktailsSelect);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const userId = queryParams.get("user");
  const loading = useAppSelector(selectLoadingCocktails);

  useEffect(() => {
    if (userId) {
      dispatch(fetchMyCocktail(userId));
    }
  }, [dispatch, userId]);

  const publishCocktailClick = async () => {
    try {
      if (userId) {
        await dispatch(fetchMyCocktail(userId));
      }
    } catch (error) {
      console.error(error);
    }
  };
  const deleteCocktailById = async (id: string) => {
    try {
      await dispatch(deletedCocktail(id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <h2 className="text-center mt-4 mb-4">My cocktails:</h2>
          <Box sx={{ padding: 2 }}>
            {cocktails.length === 0 ? (
              <Typography variant="h6" color="text.secondary">
                No cocktails found.
              </Typography>
            ) : (
              <Grid container spacing={2}>
                {cocktails.map((cocktail) => (
                  <Grid size={{ xs: 6, md: 4 }} key={cocktail._id}>
                    <CoctailItem
                      cocktails={cocktail}
                      cocktailPublished={publishCocktailClick}
                      deleteCocktail={deleteCocktailById}
                    />
                  </Grid>
                ))}
              </Grid>
            )}
          </Box>
        </>
      )}
    </div>
  );
};

export default MyCocktails;
