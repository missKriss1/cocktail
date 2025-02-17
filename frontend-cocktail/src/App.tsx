import { Container, CssBaseline } from "@mui/material";
import AppToolBar from "./components/UI/AppToolBar/AppToolBar.tsx";
import { Route, Routes } from "react-router-dom";
import Home from "./container/Home/Home.tsx";
import RegisterUser from "./features/users/RegisterUser.tsx";
import LoginUser from "./features/users/LoginUser.tsx";

const App = () => {
  return (
    <>
      <CssBaseline />
      <header>
        <AppToolBar />
      </header>
      <main>
        <Container maxWidth="lg">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<RegisterUser/>} />
            <Route path="/login" element={<LoginUser/>} />
          </Routes>
        </Container>
      </main>
    </>
  );
};

export default App;
