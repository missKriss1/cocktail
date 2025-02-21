import { Cocktail } from "../../types";
import React from "react";
import { Card, CardContent, CardMedia, Button, Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import zaglushka from "/src/assets/zaglushka.jpg";
import { apiUrl } from "../../globalConstants.ts";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../app/hooks.ts";
import { selectUser } from "../../features/users/userSlice.ts";

interface Props {
  cocktails: Cocktail;
  cocktailPublished: (id: string) => void;
  deleteCocktail: (id: string) => void;
}

const CoctailItem: React.FC<Props> = ({
  cocktails,
  cocktailPublished,
  deleteCocktail,
}) => {
  const user = useAppSelector(selectUser);
  let imageZaglushka = zaglushka;

  if (cocktails.image) {
    imageZaglushka = `${apiUrl}/${cocktails.image}`;
  }

  return (
    <div>
      <Card
        sx={{
          maxWidth: 345,
          boxShadow: 3,
          position: "relative",
          marginBottom: 4,
        }}
      >
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

        <Link
          to={`/cocktails/${cocktails._id}`}
          style={{ textDecoration: "none" }}
        >
          <Button
            variant="contained"
            sx={{
              width: "50%",
              ml: 2,
              mb: 4,
              backgroundColor: "black",
              color: "white",
              "&:hover": {
                backgroundColor: "darkgray",
              },
              padding: "10px",
            }}
          >
            View cocktail
          </Button>
        </Link>

        {!cocktails.published && user?.role === "admin" && (
          <Box
            sx={{
              position: "absolute",
              top: 10,
              left: "80%",
              transform: "translateX(-50%)",
              backgroundColor: "rgba(255, 0, 0, 0.8)",
              padding: "6px 12px",
              borderRadius: "8px",
              zIndex: 1,
            }}
          >
            <Typography
              variant="body2"
              sx={{
                color: "#fff",
                fontWeight: "bold",
                textTransform: "uppercase",
              }}
            >
              Unpublished
            </Typography>

            {user.role === "admin" && !cocktails.published && (
              <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  cocktailPublished(cocktails._id);
                }}
                sx={{
                  textTransform: "uppercase",
                  fontWeight: "bold",
                  borderRadius: "8px",
                  marginLeft: "16px",
                }}
              >
                Publish
              </Button>
            )}
          </Box>
        )}

        {user?.role === "admin" && (
          <Button
            onClick={(e) => {
              e.stopPropagation();
              deleteCocktail(cocktails._id);
            }}
            sx={{
              position: "absolute",
              bottom: 10,
              right: 10,
              backgroundColor: "red",
              color: "white",
              "&:hover": {
                backgroundColor: "darkred",
              },
            }}
          >
            Delete
          </Button>
        )}

        {user?.role === "user" && !cocktails.published && (
          <Typography
            variant="body2"
            color="red"
            sx={{ position: "absolute", bottom: 5, left: 25 }}
          >
            Your cocktail is under review by a moderator.
          </Typography>
        )}
      </Card>
    </div>
  );
};

export default CoctailItem;
