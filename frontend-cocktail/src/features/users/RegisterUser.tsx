import React, { useState } from "react";
import { Avatar, Box, Button, Container } from "@mui/material";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid2";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import { selectUserError } from "./userSlice.ts";
import { NavLink, useNavigate } from "react-router-dom";
import { register } from "./userThunk.ts";
import FileInput from "../../components/FileInput.tsx";
import { RegisterMutation } from "../../types";

const RegisterUser = () => {
  const dispatch = useAppDispatch();
  const registerError = useAppSelector(selectUserError);
  const navigate = useNavigate();

  const [form, setForm] = useState<RegisterMutation>({
    email: "",
    password: "",
    displayName: "",
    avatar: null,
  });

  const inpytChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prevState) => ({ ...prevState, [name]: value }));
  };

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(register(form)).unwrap();
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };

  const onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, files } = e.target;
    if (files) {
      setForm((prevState) => ({
        ...prevState,
        [name]: files[0] || null,
      }));
    }
  };

  const getFielderror = (fieldName: string) => {
    return registerError?.errors[fieldName]?.message;
  };

  return (
    <div>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "black",
            padding: 4,
            borderRadius: 2,
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "white" }}>
            <LockOutlinedIcon sx={{ color: "black" }} />
          </Avatar>
          <Typography component="h1" variant="h5" sx={{ color: "white" }}>
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={submitHandler}
            sx={{ mt: 3 }}
          >
            <Grid direction={"column"} spacing={2}>
              <Grid>
                <TextField
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  value={form.email}
                  onChange={inpytChangeHandler}
                  helperText={getFielderror("username")}
                  sx={{
                    input: { color: "white" },
                    label: { color: "white" },
                    mt: 2,
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "white",
                      },
                      "&:hover fieldset": {
                        borderColor: "white",
                      },
                    },
                  }}
                />
              </Grid>
              <Grid>
                <TextField
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  value={form.password}
                  onChange={inpytChangeHandler}
                  helperText={getFielderror("password")}
                  sx={{
                    input: { color: "white" },
                    label: { color: "white" },
                    mt: 2,
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "white",
                      },
                      "&:hover fieldset": {
                        borderColor: "white",
                      },
                    },
                  }}
                />
              </Grid>
              <Grid>
                <TextField
                  fullWidth
                  name="displayName"
                  label="Display Name"
                  type="displayName"
                  id="displayName"
                  value={form.displayName}
                  onChange={inpytChangeHandler}
                  helperText={getFielderror("displayName")}
                  sx={{
                    input: { color: "white" },
                    label: { color: "white" },
                    mt: 2,
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "white",
                      },
                      "&:hover fieldset": {
                        borderColor: "white",
                      },
                    },
                  }}
                />
              </Grid>

              <Grid sx={{ mt: 2 }}>
                <label htmlFor="avatar" style={{ color: "white" }}>
                  Avatar
                </label>
                <FileInput
                  id="image"
                  name="avatar"
                  label="Avatar"
                  onGetFile={onFileChange}
                  file={form.avatar}
                />
              </Grid>

              {form.avatar && (
                <Box
                  sx={{
                    mt: 2,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Avatar
                    alt="Avatar Preview"
                    src={URL.createObjectURL(form.avatar)}
                    sx={{
                      width: 100,
                      height: 100,
                      borderRadius: "50%",
                      border: "2px solid #fff",
                    }}
                  />
                </Box>
              )}
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                backgroundColor: "white",
                color: "black",
                "&:hover": {
                  backgroundColor: "gray",
                },
              }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="center" sx={{ mt: 2 }}>
              <Grid>
                <NavLink
                  to="/login"
                  style={{
                    color: "white",
                    textAlign: "center",
                  }}
                >
                  Already have an account? Sign in
                </NavLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </div>
  );
};

export default RegisterUser;
