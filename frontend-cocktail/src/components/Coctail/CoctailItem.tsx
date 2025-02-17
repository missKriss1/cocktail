import { Cocktail } from '../../types';
import React from 'react';
import { Card, CardContent, CardMedia } from '@mui/material';
import Typography from '@mui/material/Typography';
import zaglushka from "/src/assets/zaglushka.jpg";
import { apiUrl } from '../../globalConstants.ts';

interface Props{
  cocktails: Cocktail
}

const CoctailItem: React.FC <Props> = ({cocktails}) => {

  let imageZaglushka = zaglushka;

  if (cocktails.image) {
    imageZaglushka = `${apiUrl}/${cocktails.image}`;
  }

  return (
    <div>

      <Card sx={{ maxWidth: 345, boxShadow: 3, position: "relative" }}>
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
      </Card>
    </div>
  );
};

export default CoctailItem;