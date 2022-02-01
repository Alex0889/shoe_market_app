import React from 'react';
import s from "./CartItem.module.scss";
import {remove} from "../../static";

const CartItem = ({_id, onRemoveFromCart, name, price, imageUrl}) => {
  return (
    <div className={s.cart__item}>
      <div className={s.cart__item_img} style={{backgroundImage: `url(${imageUrl})`}}/>
      <div className={s.cart__item_desc}>
        <p>{name}</p>
        <b>{price}$</b>
      </div>
      <img className={s.cart__item_remove} src={remove} onClick={() => onRemoveFromCart(_id)} alt="remove item from cart"/>
    </div>
  );
};

export default CartItem;