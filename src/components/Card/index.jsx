import React, {memo} from 'react';

import {plus, success, wishlistFilled, wishlistTrans} from "../../static";
import s from './Card.module.scss';
import {Loader} from "../index";
import {AppContext} from "../../context";

const Card = ({
                _id,
                name,
                price,
                imageUrl,
                onAddToCart,
                onToggleWishlist,
                removeFromWishlist,
                inWishlist = false,
                isLoading = false
              }) => {
  const {isItemAddedToCart, isItemAddedToWishlist} = React.useContext(AppContext);

  const onPlusHandler = () => {
    onAddToCart(_id);
  }

  const onWishlistHandler = () => {
     onToggleWishlist && onToggleWishlist(_id);
     removeFromWishlist && removeFromWishlist(_id);
    // setIsAddedToWishlist(!isAddedToWishlist);
  }

  return (
    <div className={s.card}>
      {isLoading ? <Loader/> :
        <>
          {(onToggleWishlist || removeFromWishlist) && <div className={s.card__wishlist} onClick={onWishlistHandler}>
            <img width={32} height={32} src={isItemAddedToWishlist(_id) ? wishlistFilled : wishlistTrans} alt="add to wishlist"/>
          </div>}
          <img width={133} height={112} src={imageUrl} alt="Sneakers"/>
          <h5>{name}</h5>
          <div className={s.card__bottom}>
            <div>
              <span>Price:</span>
              <b>{price}$</b>
            </div>
            {onAddToCart && <button onClick={onPlusHandler} className={s.card__btn_add}>
              <img width={32} height={32} src={isItemAddedToCart(_id) ? success : plus} alt="plus"/>
            </button>}
          </div>
        </>
      }
    </div>
  );
};

export default memo(Card);