import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { cocktailsSelect } from '../../features/cocktails/cocktailsSlice.ts';
import { useEffect } from 'react';
import { fetchMyCocktail } from '../../features/cocktails/cocktailsThunk.ts';
import { Box, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import CoctailItem from '../../components/Coctail/CoctailItem.tsx';
import { useLocation } from 'react-router-dom';

const MyCocktails = () => {
  const dispatch = useAppDispatch();
  const cocktails = useAppSelector(cocktailsSelect);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const userId = queryParams.get('user');

  useEffect(() => {
    if (userId) {
      dispatch(fetchMyCocktail(userId));
    }
  }, [dispatch, userId]);

  const publishCocktailClick = async () => {
    try {
      if(userId){
        await dispatch(fetchMyCocktail(userId));
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2 className='text-center mt-4 mb-4'>My cocktails:</h2>
      <Box sx={{ padding: 2 }}>
        {cocktails.length === 0 ? (
          <Typography variant="h6" color="text.secondary">
            No cocktails found.
          </Typography>
        ) : (
          <Grid container spacing={2}>
            {cocktails.map((cocktail) => (
              <Grid size={{ xs: 6, md: 4 }} key={cocktail._id}>
                <CoctailItem cocktails={cocktail} cocktailPublished={publishCocktailClick} />
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </div>
  );
};

export default MyCocktails;
