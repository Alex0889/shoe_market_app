import React, {useMemo} from "react";
import {AppContext} from "../context";

export const useCart = () => {
  const {cartItems} = React.useContext(AppContext);
  return useMemo(() => cartItems.reduce((sum, item) => {return sum += item.price}, 0), [cartItems]);
}