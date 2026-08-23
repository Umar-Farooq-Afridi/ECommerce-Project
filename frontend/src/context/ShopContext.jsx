import { useContext } from "react";
import { products } from "../assets/assets";

export const ShopContext = useContext();
function ShopContextProvider(props) {
  const currency = "$";
  const deliveryFee = 10;

  const value = {
    products,
    currency,
    deliveryFee,
  };

  return (
    <ShopContext.Provider value={value}>{props.childern}</ShopContext.Provider>
  );
}

export default ShopContextProvider;
