import { Container, CssBaseline } from "@mui/material";
import AppToolBar from "./components/UI/AppToolBar/AppToolBar.tsx";
import { Route, Routes } from "react-router-dom";
import Home from "./container/Home/Home.tsx";
import RegisterUser from "./features/users/RegisterUser.tsx";
import LoginUser from "./features/users/LoginUser.tsx";
import OneCocktail from "./container/Coctails/OneCocktail.tsx";
import CocktailForm from "./container/Coctails/CocktailForm.tsx";
import MyCocktails from "./container/Coctails/MyCocktails.tsx";

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
            <Route path="/register" element={<RegisterUser />} />
            <Route path="/login" element={<LoginUser />} />
            <Route path="/cocktails/:cocktailId" element={<OneCocktail />} />
            <Route path="/add_new_cocktail" element={<CocktailForm />} />
            <Route path="/cocktails" element={<MyCocktails />} />
            <Route path="*" element={<h1>Not found</h1>} />
          </Routes>
        </Container>
      </main>
    </>
  );
};

export default App;
