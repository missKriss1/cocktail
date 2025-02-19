import { Cocktail } from '../../types';
import React from 'react';
import { Card, CardContent, CardMedia, Button, Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import zaglushka from "/src/assets/zaglushka.jpg";
import { apiUrl } from '../../globalConstants.ts';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks.ts';
import { selectUser } from '../../features/users/userSlice.ts';

interface Props {
  cocktails: Cocktail;
  cocktailPublished: (id: string) => void;
  deleteCocktail: (id: string) => void;
}

const CoctailItem: React.FC<Props> = ({ cocktails, cocktailPublished, deleteCocktail }) => {
  const user = useAppSelector(selectUser);
  let imageZaglushka = zaglushka;

  if (cocktails.image) {
    imageZaglushka = `${apiUrl}/${cocktails.image}`;
  }

  return (
    <div>
      <Card sx={{ maxWidth: 345, boxShadow: 3, position: "relative", marginBottom: 4 }}>
        <CardMedia
          component="img"
          sx={{
            width: 350,
            height: 350,
            objectFit: "cover",
            borderTopLeftRadius: 8,
            borderBottomLeftRadius: 8,
          }}
          image={imageZaglushka}
          alt={cocktails.name}
        />

        <CardContent sx={{ position: "relative", textAlign: "center" }}>
          <Typography gutterBottom variant="h6" component="div">
            {cocktails.name}
          </Typography>
        </CardContent>

        <Link to={`/cocktails/${cocktails._id}`} style={{ textDecoration: "none" }}>
          <Button
            variant="contained"
            sx={{
              width: '50%',
              ml: 2,
              mb: 4,
              backgroundColor: "black",
              color: "white",
              '&:hover': {
                backgroundColor: "darkgray",
              },
              padding: "10px",
            }}
          >
            View cocktail
          </Button>
        </Link>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: '0 16px' }}>
          {user?.role === 'admin' && (
            <Button
              onClick={(e) => {
                e.stopPropagation();
                cocktailPublished(cocktails._id);
              }}
              sx={{
                backgroundColor: cocktails.published ? 'green' : 'gray',
                color: 'white',
                mb: 2,
                '&:hover': {
                  backgroundColor: cocktails.published ? 'darkgreen' : 'darkgray',
                },
              }}
            >
              {cocktails.published ? 'Publish' : 'Unpublish'}
            </Button>
          )}

          {user?.role === 'admin' && (
            <Button
              onClick={(e) => {
                e.stopPropagation();
                deleteCocktail(cocktails._id)
              }}
              sx={{
                backgroundColor: 'red',
                color: 'white',
                mb: 2,
                '&:hover': {
                  backgroundColor: 'darkred',
                },
              }}
            >
              Delete
            </Button>
          )}
        </Box>
        {user?.role === 'user' && (
          <>
            {!cocktails.published && (
              <Typography variant="body2" color="red" sx={{ position: 'absolute', bottom: 5, left: 25 }}>
                Your cocktail is under review by a moderator.
              </Typography>
            )}
          </>
        )}
      </Card>
    </div>
  );
};

export default CoctailItem;
