import { Button } from "@mui/material";
import { Link as NavLink } from "react-router-dom";

const AnonimysMenu = () => {
  return (
    <div>
      <Button
        component={NavLink}
        to="/register"
        sx={{
          mr: 2,
          color: 'white',
          border: '1px solid white',
          backgroundColor: 'black',
          '&:hover': {
            backgroundColor: 'black',
            borderColor: 'white',
          }
        }}
      >
        Sign up
      </Button>
      <Button
        component={NavLink}
        to="/login"
        sx={{
          color: 'white',
          border: '1px solid white',
          backgroundColor: 'black',
          '&:hover': {
            backgroundColor: 'black',
            borderColor: 'white',
          }
        }}
      >
        Sign in
      </Button>
    </div>
  );
};

export default AnonimysMenu;
