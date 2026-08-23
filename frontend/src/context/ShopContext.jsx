import { createContext } from "react";
import { products } from "../assets/assets";

export const ShopContext = createContext();

function ShopContextProvider(props) {
  const currency = "$";
  const deliveryFee = 10;

  const value = {
    products,
    currency,
    deliveryFee,
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
}

export default ShopContextProvider;
