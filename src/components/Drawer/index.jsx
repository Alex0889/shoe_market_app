import React, {useContext, useMemo, useState} from 'react';
import {arrowRight, remove} from "../../static";
import s from './Drawer.module.scss';
import {CartItem, Info} from "../index";
import {AppContext} from "../../context";
import {useCart} from "../../hooks";
import {checkout} from "../../http/cartApi";

const Drawer = ({onRemoveFromCart, items, isCartOpened}) => {
  const {setIsCartOpened, setIsOpenAuthModal, setCartItems} = useContext(AppContext);

  const [isOrderCompleted, setIsOrderCompleted] = useState(false);
  const [isLoadingOrder, setIsLoadingOrder] = useState(false);

  const totalPrice = useCart();

  const countTax = useMemo(() => (+totalPrice / 100 * 5).toFixed(2), [totalPrice]);
  const priceWithTax = useMemo(() => (+totalPrice + +countTax).toFixed(2), [totalPrice, countTax]);

  const onConfirmOrder = async () => {
    try {
      setIsLoadingOrder(true);
      const user = await checkout();
      console.log()
      if (user) {
        setCartItems([]);
        setIsOrderCompleted(true);
      } else {
        setIsCartOpened(false);
        setIsOpenAuthModal(true);
      }
    } catch (e) {
      alert('Please try again later!')
      setIsCartOpened(false);
      console.log('Error ', e)
    } finally {
      setIsLoadingOrder(false);
    }
  }
  const onCloseDrawer = () => {
    setIsCartOpened(false);
    setIsOrderCompleted(false);
  }

  const cartItemsList = items.map(item => (
    <CartItem key={item._id} onRemoveFromCart={onRemoveFromCart} {...item} />
  ))

  const cartNotEmpty = (
    <>
      <div className={s.cart__items}>
        {cartItemsList}
      </div>
      <div className={s.cart__total}>
        <ul>
          <li>
            <span>Total:</span>
            <div/>
            <b>{totalPrice}$</b>
          </li>
          <li>
            <span>Tax 5%:</span>
            <div/>
            <b>{countTax}$</b>
          </li>
          <li>
            <span>Total with tax:</span>
            <div/>
            <b>{priceWithTax}$</b>
          </li>
        </ul>
        <button
          onClick={onConfirmOrder}
          disabled={isLoadingOrder}
          className={s.btn}>
          Confirm order <img src={arrowRight} alt="arrow"/>
        </button>
      </div>
    </>
  )

  return (
    <div className={`${s.overlay} ${isCartOpened ? s.overlay__visible : ''}`}>
      <div className={`${s.drawer} ${isCartOpened ? s.drawer__visible : ''}`}>
        <div className={s.cart}>
          <h3>Shopping cart <img onClick={() => setIsCartOpened(false)} className={s.cart__items_remove} src={remove}
                                 alt="close cart"/>
          </h3>
          {!items.length ?
            <Info
              title={isOrderCompleted ? "The order was confirmed!" : "The cart is empty!"}
              description={isOrderCompleted ? `Your order was confirmed and will be sent by the courier soon!` : "Add at least one pair of shoes to make order!"}
              image={isOrderCompleted ? '/static/img/order-completed.jpg' : '/static/img/cart-empty.jpg'}
              callback={onCloseDrawer}/>
            : cartNotEmpty}
        </div>
      </div>
    </div>
  );
}

export default Drawer;