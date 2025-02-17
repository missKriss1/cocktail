import { Button, Menu, MenuItem, Avatar } from "@mui/material";
import * as React from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAppDispatch } from "../../../app/hooks.ts";
import { logout } from "../../../features/users/userThunk.ts";
import { unsetUser } from "../../../features/users/userSlice.ts";
import { apiUrl } from "../../../globalConstants.ts";
import zaglushkaAvatar from "/src/assets/zaglushkaAvatar.jpg";
import { User } from "../../../../types";

interface Props {
  user: User;
}

const UserMenu: React.FC<Props> = ({ user }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const avatarImage = user.avatar
    ? `${apiUrl}/${user.avatar}`
    : zaglushkaAvatar;
  const dispatch = useAppDispatch();

  const HandleLogout = () => {
    dispatch(logout());
    dispatch(unsetUser());
  };

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const hendelClose = () => {
    setAnchorEl(null);
  };

  return(
    <div>
      <Button
        color="inherit"
        onClick={handleClick}
        startIcon={<Avatar src={avatarImage} alt={user?.displayName}/>}
      >
        Hello, {user?.displayName}
      </Button>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={hendelClose}
      >
        <div style={{display: "flex", flexDirection: "column"}}>
          <MenuItem onClick={hendelClose}>
            <NavLink
              to={"/add_new_cocktail"}
              style={{textDecoration: "none", color: "inherit"}}
            >
              Add new cocktail
            </NavLink>
          </MenuItem>
        </div>
      </Menu>
      <button
        type="button"
        onClick={HandleLogout}
        style={{
          color: 'white',
          border: '1px solid white',
          backgroundColor: 'black',
          padding: '8px 16px',
          cursor: 'pointer',
        }}
        onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'black'}
        onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'black'}
      >
        Log Out
      </button>
    </div>
  )
};

export default UserMenu;
