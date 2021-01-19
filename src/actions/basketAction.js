import { SHOPPING_BASKET, REMOVE_FROM_BAG } from "../types";

export const shoppingBasket = (product) => (dispatch, getState) => {
    const shoppingBag = getState().shopping.shoppingBag.slice();
    let alreadyExists = false;
    shoppingBag.forEach((x) => {
      if (x._id === product._id) {
        alreadyExists = true;
        x.count++;
      }
    });
    if (!alreadyExists) {
      shoppingBag.push({ ...product, count: 1 });
    }
    dispatch({
      type: SHOPPING_BASKET,
      payload: { shoppingBag },
    });
    localStorage.setItem("shoppingBag", JSON.stringify(shoppingBag));
  };
  
  export const removeFromBasket = (product) => (dispatch, getState) => {
    const shoppingBag = getState()
      .shopping.shoppingBag.slice()
      .filter((x) => x._id !== product._id);
    dispatch({ type: REMOVE_FROM_BAG, payload: { shoppingBag } });
    localStorage.setItem("shoppingBag", JSON.stringify(shoppingBag));
  };