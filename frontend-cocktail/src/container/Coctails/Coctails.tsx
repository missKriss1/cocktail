import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { cocktailsSelect } from '../../features/cocktails/cocktailsSlice.ts';
import { useEffect } from 'react';
import { deletedCocktail, fetchCocktails, toggleCocktailPublish } from '../../features/cocktails/cocktailsThunk.ts';
import CoctailItem from '../../components/Coctail/CoctailItem.tsx';
import { Box, Typography } from '@mui/material';
import Grid from "@mui/material/Grid2";
import { selectUser } from '../../features/users/userSlice.ts';

const Coctails = () => {
  const dispatch = useAppDispatch();
  const cocktails = useAppSelector(cocktailsSelect);
  const user = useAppSelector(selectUser)


  useEffect(() => {
    dispatch(fetchCocktails());
  }, [dispatch]);

  const publishCocktailClick = async (id: string) => {
    try {
      await dispatch(toggleCocktailPublish(id));
      await dispatch(fetchCocktails());
    } catch (error) {
      console.error(error);
    }
  };

  const deleteCocktailById = async (id: string) => {
    try {
      await dispatch(deletedCocktail(id));
      await dispatch(fetchCocktails());
    } catch (error) {
      console.error(error);
    }
  };

  const filteredCocktails = cocktails.filter((cocktail) => {
    if (cocktail.published) {
      return true;
    }

    if (!user) return false;
    return user.role === 'admin' || user._id === cocktail.user._id;
  });

  return (
    <>
      <h2 className='text-center mt-4 mb-4'>All cocktails:</h2>
      <Box sx={{padding: 2}}>
        {cocktails.length === 0 ? (
          <Typography variant="h6" color="text.secondary">
            No cocktails found.
          </Typography>
        ) : (
          <Grid container spacing={2}>
            {filteredCocktails.map((cocktail) => (
              <Grid size={{xs: 6, md: 4}} key={cocktail._id}>
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
  );
};

export default Coctails;
