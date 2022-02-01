import React, {memo} from 'react';
import {Link} from "react-router-dom";

import s from './Header.module.scss';
import {logo} from "../../static";
import {useCart} from "../../hooks";
import {Icon} from "../index";

const Header = ({onOpenCart, onOpenAuthModal, onOpenUserModal, isAuth}) => {
  const totalPrice = useCart();

  return (
    <header className={s.header}>
      <Link to={'/'}>
        <div className={s.header__left}>
          <img alt="logo" src={logo} width={40} height={40}/>
          <div className={s.header__info}>
            <h3>My Sneakers</h3>
            <p>The best sneakers!</p>
          </div>
        </div>
      </Link>

      <ul className={s.header__right}>
        <li onClick={onOpenCart}>
          <Icon icon={'shopping-cart'} size={20} color={'rgba(0,0,0,.5)'}/>
          <span>{totalPrice} $</span></li>
        <li>
          <Link to={'/wishlist'}>
            <Icon icon={'heart-o'} size={20} color={'rgba(0,0,0,.5)'}/>
          </Link>
        </li>
        <li onClick={isAuth ? onOpenAuthModal : onOpenUserModal}>
          <Icon icon={'user-circle'} size={20} color={'rgba(0,0,0,.5)'}/>
        </li>
      </ul>
    </header>
  );
};

export default memo(Header);