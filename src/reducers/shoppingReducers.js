import { SHOPPING_BASKET, REMOVE_FROM_BAG } from "../types";

export const shoppingReducer = (
  state = { shoppingBag: JSON.parse(localStorage.getItem("shoppingBag") || "[]") },
  action
) => {
  switch (action.type) {
    case SHOPPING_BASKET:
      return { shoppingBag: action.payload.shoppingBag };
    case REMOVE_FROM_BAG:
      return { shoppingBag: action.payload.shoppingBag };
    default:
      return state;
  }
};