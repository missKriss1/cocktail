import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import {
  cocktailDetSelect,
  selectLoadingCocktails,
} from "../../features/cocktails/cocktailsSlice.ts";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { fetchCocktailById } from "../../features/cocktails/cocktailsThunk.ts";
import { apiUrl } from "../../globalConstants.ts";
import zaglushka from "/src/assets/zaglushka.jpg";
import Spinner from "../../components/UI/Spinner/Spinner.tsx";

const OneCocktail = () => {
  const cocktail = useAppSelector(cocktailDetSelect);
  const loading = useAppSelector(selectLoadingCocktails);
  console.log(cocktail);
  const dispatch = useAppDispatch();
  const { cocktailId } = useParams();

  let imageZaglushka = zaglushka;

  if (cocktail?.image) {
    imageZaglushka = `${apiUrl}/${cocktail.image}`;
  }

  useEffect(() => {
    if (cocktailId) {
      dispatch(fetchCocktailById(cocktailId));
    }
  }, [dispatch, cocktailId]);

  return (
    <div>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <div className="container mt-5">
            <div className="my-5 shadow-lg rounded-lg bg-light">
              <div className="p-4 rounded-lg border-0">
                <div className="d-flex flex-column">
                  <div className="row d-flex mt-3">
                    <div className="col-lg-6 col-md-12 d-flex justify-content-center align-items-center">
                      {cocktail?.image ? (
                        <img
                          src={`${apiUrl}/${cocktail?.image}`}
                          alt={cocktail?.name}
                          className="w-75 h-auto mb-4 rounded shadow-lg"
                        />
                      ) : (
                        <div className="d-flex justify-content-center align-items-center w-75">
                          <img
                            src={imageZaglushka}
                            alt={cocktail?.name}
                            className="w-75 h-auto mb-4 rounded shadow-lg"
                          />
                        </div>
                      )}
                    </div>

                    <div className="col-lg-6 col-md-12 d-flex flex-column">
                      <h4 className="fw-bold fs-3 mb-3">{cocktail?.name}</h4>

                      <div className="mb-4">
                        <h5 className="fs-5 text-black">Ingredients:</h5>
                        <ul>
                          {cocktail?.ingredients &&
                            cocktail.ingredients.map((ingredient, index) => (
                              <li key={index} className="fs-6">
                                <strong>{ingredient.name}</strong>:{" "}
                                {ingredient.amount}
                              </li>
                            ))}
                        </ul>
                      </div>

                      <div>
                        <h5 className="fs-5 text-black">Recipe:</h5>
                        <p className="text-secondary fw-semibold fs-6">
                          {cocktail?.recipe}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default OneCocktail;
